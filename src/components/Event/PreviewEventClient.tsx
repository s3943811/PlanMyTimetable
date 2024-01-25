"use client";
import { usePreview } from "~/contexts/PreviewContext";
import { type Time, type Course, type Days } from "~/lib/definitions";
import {
  getDayEnum,
  getRowIndex,
  groupTimesByStartAndDay,
} from "~/lib/functions";
import React, { useCallback, useMemo } from "react";
import Clash from "./Clash";
import { useDroppable } from "@dnd-kit/core";
import { Duration, DateTime } from "luxon";

export default function PreviewEventClient() {
  const { activeCourse, blockedEvents } = usePreview();

  const endTime = useCallback((start: string, duration: number) => {
    const endTime = DateTime.fromFormat(`${start}`, "HH:mm");
    const durationObj = Duration.fromObject({ minutes: duration });
    return [endTime.plus(durationObj), endTime];
  }, []);

  /**
   * This function compares active course options with blocked events
   * and returns all options which do not overlap with the blocked event
   * overlap: option starts same as blocked and starts before blocked ends
   * OR
   * option ends after blocked start and starts before blocked ends
   * uses Luxon and endTime function to create times/objects for easier comparison
   */
  const notBlocked = useMemo(() => {
    return activeCourse?.options.filter((option) => {
      return !blockedEvents.some((blockedEvent) => {
        if (blockedEvent.day !== option.day) {
          return false;
        }
        const [blockedEndTime, blockedStartTime] = endTime(
          blockedEvent.start,
          blockedEvent.duration,
        );
        const [optionEndTime, optionStartTime] = endTime(
          option.start,
          option.duration,
        );
        return (
          ((blockedStartTime ?? 0) <= (optionStartTime ?? 0) &&
            (optionStartTime ?? 0) <= (blockedEndTime ?? 0)) ||
          ((optionEndTime ?? 0) >= (blockedStartTime ?? 0) &&
            (optionStartTime ?? 0) <= (blockedEndTime ?? 0))
        );
      });
    });
  }, [activeCourse, blockedEvents, endTime]);

  const clashes: Time[][] = useMemo<Time[][]>(
    () =>
      groupTimesByStartAndDay(
        notBlocked?.filter((obj, index, self) => {
          return (
            self.filter((t) => t.start === obj.start && t.day === obj.day)
              .length > 1
          );
        }),
      ),
    [notBlocked],
  );

  const noClash = useMemo(
    () => notBlocked?.filter((option) => !clashes.flat().includes(option)),
    [clashes, notBlocked],
  );

  return (
    activeCourse && (
      <>
        {clashes.map((group, index) => {
          const rowSpan = group[0]!.duration / 30;

          return (
            <Clash
              key={index}
              col={getDayEnum(group[0]!.day)! + 2}
              row={getRowIndex(group[0]!.start)}
              span={rowSpan}
            >
              {group.map((time, index) => (
                <React.Fragment
                  key={
                    time.day +
                    time.start +
                    time.duration +
                    time.location +
                    index
                  }
                >
                  <PreviewEvent
                    time={time}
                    course={activeCourse}
                    clash
                    index={index}
                  />
                </React.Fragment>
              ))}
            </Clash>
          );
        })}
        {noClash?.map((time: Time, index) => (
          <React.Fragment
            key={time.day + time.start + time.duration + time.location + index}
          >
            <PreviewEvent
              time={time}
              course={activeCourse}
              clash={false}
              index={index}
            />
          </React.Fragment>
        ))}
      </>
    )
  );
}

function PreviewEvent({
  time,
  course,
  clash,
  index,
}: {
  time: Time;
  course: Course;
  clash: boolean;
  index: number;
}) {
  const col = useMemo<Days>(() => getDayEnum(time.day), [time]);
  const row = useMemo<number>(() => getRowIndex(time.start), [time]);
  const rowSpan = useMemo<number>(() => time.duration / 30, [time]);

  const { setNodeRef, isOver, over } = useDroppable({
    id: time.grouped
      ? time.grouped_code
      : time.day + time.start + time.duration + time.location + index,
    data: {
      accepts: course,
      time: time,
    },
  });
  const { events } = usePreview();

  const isAllocatedTime = useMemo(
    () =>
      !events.some(
        (item) => item.time.day === time.day && item.time.start === time.start,
      ),
    [events, time],
  );

  /**
   * This returns true if the time is grouped and matches the pattern
   * to highlight with over style for all group previews when over one
   */
  const overGroup = useMemo(() => {
    if (!time.grouped) {
      return;
    }
    const firstTwoDigits = time.grouped_code.slice(0, 2);
    const pattern = new RegExp(`^${firstTwoDigits}-P[1-9]$`);
    return over?.id.toString().match(pattern);
  }, [time, over]);

  return clash ? (
    <div
      ref={setNodeRef}
      className={` w-1/2 overflow-hidden
      ${
        isOver || overGroup
          ? "border-[0.187rem] border-dashed border-green-500 bg-green-500/40"
          : "border-[0.18rem] border-dashed bg-slate-300/30"
      }
        rounded px-2 py-2 hover:cursor-copy`}
    >
      <p className="break-words text-xs">
        {time.campus_description}&nbsp;({time.location})
      </p>
    </div>
  ) : (
    <div
      ref={setNodeRef}
      style={{
        gridRowEnd: `span ${rowSpan}`,
        gridColumnStart: `${col + 2}`,
        gridRowStart: `${row}`,
      }}
      className={` overflow-hidden
      ${
        isOver || overGroup
          ? "border-[0.187rem] border-dashed border-green-500 bg-green-500/40"
          : "border-[0.18rem] border-dashed bg-slate-300/30 "
      }
       m-0.5 rounded px-3 py-2 hover:cursor-copy`}
    >
      {isAllocatedTime && (
        <p className=" text-xs">
          {time.campus_description}&nbsp;({time.location})
        </p>
      )}
    </div>
  );
}

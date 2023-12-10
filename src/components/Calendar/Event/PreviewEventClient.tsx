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
   * overlap: the option doesn't start in the blocked time or option doesn't end in the blocked time
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
          (optionStartTime ?? 0) < (blockedStartTime ?? 0) ||
          (optionEndTime ?? 0) > (blockedEndTime ?? 0)
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
          const rowSpan: number = group[index]!.duration / 30;
          return (
            <Clash
              key={index}
              col={getDayEnum(group[index]!.day)! + 2}
              row={getRowIndex(group[index]!.start)}
              span={rowSpan}
            >
              {group.map((time) => (
                <React.Fragment
                  key={time.day + time.start + time.duration + time.location}
                >
                  <PreviewEvent time={time} course={activeCourse} clash />
                </React.Fragment>
              ))}
            </Clash>
          );
        })}
        {noClash?.map((time: Time) => (
          <React.Fragment
            key={time.day + time.start + time.duration + time.location}
          >
            <PreviewEvent time={time} course={activeCourse} clash={false} />
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
}: {
  time: Time;
  course: Course;
  clash: boolean;
}) {
  const col = useMemo<Days>(() => getDayEnum(time.day), [time]);
  const row = useMemo<number>(() => getRowIndex(time.start), [time]);
  const rowSpan = useMemo<number>(() => time.duration / 30, [time]);

  const { setNodeRef, isOver } = useDroppable({
    id: time.day + time.start + time.duration + time.location,
    data: {
      accepts: course,
      time: time,
    },
  });

  return clash ? (
    <div
      ref={setNodeRef}
      className={`w-full
      ${
        isOver
          ? "border-[0.19rem] border-dashed border-green-500 bg-green-500/40"
          : "border-[0.18rem] border-dashed bg-slate-300/30"
      }
       m-0.5 rounded px-3 py-2 hover:cursor-copy`}
    ></div>
  ) : (
    <div
      ref={setNodeRef}
      style={{
        gridRowEnd: `span ${rowSpan}`,
        gridColumnStart: `${col + 2}`,
        gridRowStart: `${row}`,
      }}
      className={`
      ${
        isOver
          ? "border-[0.19rem] border-dashed border-green-500 bg-green-500/40"
          : "border-[0.18rem] border-dashed bg-slate-300/30"
      }
       m-0.5 rounded px-3 py-2 hover:cursor-copy`}
    ></div>
  );
}

"use client";
import { usePreview } from "~/contexts/PreviewContext";
import { colStart, rowStart, rowSpans, Time, Course } from "~/lib/definitions";
import { getDayEnum, getRowIndex } from "~/lib/functions";
import React from "react";
import Clash from "./Clash";
import { useDroppable } from "@dnd-kit/core";

export default function PreviewEventClient() {
  const { activeCourse } = usePreview();
  const clash = activeCourse?.options.filter((obj, index, self) => {
    return (
      self.filter((t) => t.start === obj.start && t.day === obj.day).length > 1
    );
  });
  const clashes = groupByStartAndDay(clash);

  const noClash = activeCourse?.options.filter(
    (option) => !clashes.flat().includes(option),
  );

  return (
    activeCourse && (
      <>
        {clashes.map((group, index) => {
          const rowSpan: number = group[index]!.duration / 30;
          return (
            <Clash
              key={index}
              col={colStart[getDayEnum(group[index]!.day)! + 2]!}
              row={rowStart[getRowIndex(group[index]!.start)]!}
              span={rowSpans[rowSpan]!}
            >
              {group.map((time) => (
                <PreviewEvent time={time} course={activeCourse!} clash />
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
  const rowSpan: number = time.duration / 30;
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
      className={`${colStart[getDayEnum(time.day)! + 2]} ${
        rowStart[getRowIndex(time.start)]
      } ${rowSpans[rowSpan]}
      ${
        isOver
          ? "border-[0.19rem] border-dashed border-green-500 bg-green-500/40"
          : "border-[0.18rem] border-dashed bg-slate-300/30"
      }
       m-0.5 rounded px-3 py-2 hover:cursor-copy`}
    ></div>
  );
}

function groupByStartAndDay(items: Time[] | undefined): Array<Array<Time>> {
  const groups: any = {};
  items &&
    items.forEach((item) => {
      const key: string = `${item.start}-${item.day}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
  return Object.values(groups);
}

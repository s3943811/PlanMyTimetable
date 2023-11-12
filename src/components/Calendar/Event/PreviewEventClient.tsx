"use client";
import { usePreview } from "~/contexts/PreviewContext";
import { colStart, rowStart, rowSpans, Time, Course } from "~/lib/definitions";
import { getDayEnum, getRowIndex } from "~/lib/functions";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function PreviewEventClient() {
  const { activeCourse } = usePreview();
  return activeCourse?.options.map((time: Time) => (
    <React.Fragment key={time.day + time.start + time.duration + time.location}>
      <PreviewEvent time={time} course={activeCourse} />
    </React.Fragment>
  ));
}

function PreviewEvent({ time, course }: { time: Time; course: Course }) {
  const rowSpan: number = time.duration / 30;
  const { setNodeRef, isOver } = useDroppable({
    id: time.day + time.start + time.duration + time.location,
    data: {
      accepts: course,
      time: time,
    },
  });
  return (
    <div
      ref={setNodeRef}
      className={`${colStart[getDayEnum(time.day)! + 2]} ${
        rowStart[getRowIndex(time.start)]
      } ${rowSpans[rowSpan]}
      ${
        isOver
          ? "border-[0.19rem] border-dashed border-green-500 bg-green-500/40"
          : "border-[0.18rem] border-dashed bg-slate-300/20"
      }
       m-0.5 rounded px-3 py-2 hover:cursor-copy`}
    ></div>
  );
}

"use client";
import { DragOverlay } from "@dnd-kit/core";
import { usePreview } from "~/contexts/PreviewContext";
import Event from "../Calendar/Event/Event";
import { colStart, rowStart, rowSpans } from "~/lib/definitions";
import type { Preference } from "~/lib/definitions";
import { getDayEnum, getRowIndex } from "~/lib/functions";

export default function EventDragOverlay() {
  const { events, activeCourse, over } = usePreview();
  const event: Preference = events.find(
    (course) =>
      course.title === activeCourse?.title &&
      course.courseCode === activeCourse?.courseCode &&
      course.type === activeCourse?.type &&
      course.colour === activeCourse?.colour,
  )!;
  if (!event) {
    return;
  }
  const rowSpan: number = event.time.duration / 30;
  const colourVariants = {
    0: "bg-purple-400/40 text-purple-800 shadow-purple-100 border-l-[7px] border-l-purple-500",
    1: "bg-yellow-400/40 text-yellow-800 shadow-yellow-100 border-l-[7px] border-l-yellow-500",
    2: "bg-orange-400/40 text-orange-800 shadow-orange-100 border-l-[7px] border-l-orange-500",
    3: "bg-red-400/40 text-red-800 shadow-red-100 border-l-[7px] border-l-red-500",
    4: "bg-green-400/40 text-green-800 shadow-green-100 border-l-[7px] border-l-green-500",
    5: "bg-teal-400/40 text-teal-800 shadow-teal-100 border-l-[7px] border-l-teal-500",
    6: "bg-blue-400/40 text-blue-800 shadow-blue-100 border-l-[7px] border-l-blue-500",
    7: "bg-fuchsia-400/40 text-fuchsia-800 shadow-fuchsia-100 border-l-[7px] border-l-fuchsia-500",
    8: "bg-pink-400/40 text-pink-800 shadow-pink-100 border-l-[7px] border-l-pink-500",
  };
  return (
    <DragOverlay
      className={`${colStart[getDayEnum(event.time.day)! + 2]} ${
        rowStart[getRowIndex(event.time.start)]
      } ${rowSpans[rowSpan]} m-0.5 flex flex-col overflow-hidden ${
        colourVariants[event.colour]
      } rounded px-3 py-2 ${
        over ? "hover:cursor-copy" : "hover:cursor-grabbing"
      }`}
    >
      {activeCourse && (
        <Event title={event.title} type={event.type} time={event.time} />
      )}
    </DragOverlay>
  );
}

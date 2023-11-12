"use client";
import { DragOverlay } from "@dnd-kit/core";
import { usePreview } from "~/contexts/PreviewContext";
import Event from "../Calendar/Event/Event";
import { colStart, rowStart, rowSpans, Preference } from "~/lib/definitions";
import { getDayEnum, getRowIndex } from "~/lib/functions";

export default function EventDragOverlay() {
  const { events, activeCourse } = usePreview();
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
  };
  return (
    <DragOverlay
      className={`${colStart[getDayEnum(event.time.day)! + 2]} ${
        rowStart[getRowIndex(event.time.start)]
      } ${rowSpans[rowSpan]} m-0.5 flex flex-col overflow-hidden ${
        colourVariants[event.colour]
      } rounded px-3 py-2`}
    >
      {activeCourse && (
        <Event
          title={event.title}
          type={event.type}
          colour={event.colour}
          time={event.time}
        />
      )}
    </DragOverlay>
  );
}

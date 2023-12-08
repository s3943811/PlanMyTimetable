"use client";
import { DragOverlay } from "@dnd-kit/core";
import { usePreview } from "~/contexts/PreviewContext";
import Event from "../Calendar/Event/Event";
import type { Preference } from "~/lib/definitions";
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
    0: "bg-purple-400/40 text-purple-800 shadow-purple-100 border-l-[7px] border-l-purple-500 dark:text-purple-400 dark:bg-purple-700/40 dark:border-l-purple-800",
    1: "bg-yellow-400/40 text-yellow-800 shadow-yellow-100 border-l-[7px] border-l-yellow-500 dark:text-yellow-400 dark:bg-yellow-700/40 dark:border-l-yellow-800",
    2: "bg-orange-400/40 text-orange-800 shadow-orange-100 border-l-[7px] border-l-orange-500 dark:text-orange-400 dark:bg-orange-700/40 dark:border-l-orange-800",
    3: "bg-red-400/40 text-red-800 shadow-red-100 border-l-[7px] border-l-red-500 dark:text-red-400 dark:bg-red-700/40 dark:border-l-red-800",
    4: "bg-green-400/40 text-green-800 shadow-green-100 border-l-[7px] border-l-green-500 dark:text-green-400 dark:bg-green-700/40 dark:border-l-green-800",
    5: "bg-teal-400/40 text-teal-800 shadow-teal-100 border-l-[7px] border-l-teal-500 dark:text-teal-400 dark:bg-teal-700/40 dark:border-l-teal-800",
    6: "bg-blue-400/40 text-blue-800 shadow-blue-100 border-l-[7px] border-l-blue-500 dark:text-blue-400 dark:bg-blue-700/40 dark:border-l-blue-800",
    7: "bg-fuchsia-400/40 text-fuchsia-800 shadow-fuchsia-100 border-l-[7px] border-l-fuchsia-500 dark:text-fuchsia-400 dark:bg-fuchsia-800/40 dark:border-l-fuchsia-800",
    8: "bg-pink-400/40 text-pink-800 shadow-pink-100 border-l-[7px] border-l-pink-500 dark:text-pink-400 dark:bg-pink-700/40 dark:border-l-pink-800",
  };
  return (
    <DragOverlay
      style={{
        gridRowEnd: `span ${rowSpan}`,
        gridColumnStart: `${getDayEnum(event.time.day)! + 2}`,
        gridRowStart: `${getRowIndex(event.time.start)}`,
      }}
      className={`m-0.5 flex flex-col overflow-hidden ${
        colourVariants[event.colour]
      } rounded px-3 py-2 `}
    >
      {activeCourse && (
        <Event title={event.title} type={event.type} time={event.time} />
      )}
    </DragOverlay>
  );
}

"use client";
import { colourVariants } from "~/lib/definitions";
import type { Course } from "~/lib/definitions";
import { useDraggable } from "@dnd-kit/core";
import { usePreview } from "~/contexts/PreviewContext";
import { useMemo } from "react";
import { cn } from "~/lib/utils";
export default function ClassCardClient({
  children,
  course,
  id,
}: {
  children: React.ReactNode;
  course: Course;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
    data: {
      course: course,
    },
    attributes: {
      role: "div",
      tabIndex: 0,
    },
  });
  const { events } = usePreview();
  const isAllocated = useMemo(
    () =>
      events.find(
        (item) =>
          item.title === course.title &&
          item.courseCode === course.courseCode &&
          item.type === course.type &&
          item.colour === course.colour,
      ),
    [events, course],
  );
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        `z-50 flex grow items-center justify-between gap-1 rounded-md border-l-[6.5px] px-2.5 
        py-2.5 hover:cursor-grab hover:bg-neutral-100 focus:ring-1 focus:ring-neutral-200 active:cursor-grab 
        active:bg-neutral-100 dark:hover:bg-neutral-700 dark:focus:ring-neutral-700 
        dark:active:bg-neutral-600
         xl:w-72`,
        isDragging && "opacity-50",
        isAllocated
          ? "bg-neutral-50 dark:bg-neutral-800"
          : "bg-white dark:bg-neutral-900",
        colourVariants[course.colour],
      )}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

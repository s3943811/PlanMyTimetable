"use client";
import { Course, colourVariants } from "~/lib/definitions";
import { useDraggable } from "@dnd-kit/core";
import { usePreview } from "~/contexts/PreviewContext";
import { useMemo } from "react";
export default function ClassCardClient({
  children,
  course,
}: {
  children: React.ReactNode;
  course: Course;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: "course" + course.courseCode + course.type,
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
      className={`z-50 ${
        isDragging && "opacity-50"
      } flex w-72 flex-row gap-1 rounded-md border-r-[6.5px] px-2.5 py-2.5 hover:bg-neutral-100 ${
        isAllocated ? "bg-neutral-50" : "bg-white"
      } ${
        colourVariants[course.colour]
      } items-center hover:cursor-grab focus:ring-1 focus:ring-neutral-200 active:cursor-grab active:bg-neutral-100`}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

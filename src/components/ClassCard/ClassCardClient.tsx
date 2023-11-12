"use client";
import { Course, colourVariants } from "~/lib/definitions";
import { useDraggable } from "@dnd-kit/core";

export default function ClassCardClient({
  children,
  course,
}: {
  children: React.ReactNode;
  course: Course;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: course.courseCode + course.type,
      data: {
        course: course,
      },
      attributes: {
        role: "div",
        tabIndex: 0,
      },
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${
        isDragging && "opacity-50"
      } flex w-72 flex-row gap-1 rounded-md border-r-[6.5px] px-2.5 py-2.5 shadow-sm hover:cursor-grab hover:bg-stone-100 ${
        colourVariants[course.colour]
      } items-center focus:ring-1 focus:ring-stone-200 active:cursor-grab active:bg-stone-100`}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

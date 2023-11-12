"use client";
import { DragOverlay } from "@dnd-kit/core";
import { usePreview } from "~/contexts/PreviewContext";
import ClassCard from "../ClassCard/ClassCard";
import { colourVariants, CourseType } from "~/lib/definitions";

export default function ClassCardDragOverlay() {
  const { activeCourse } = usePreview();
  return (
    <DragOverlay
      className={`z-50 flex w-72 flex-row items-center gap-1 rounded-md border-r-[6.5px] bg-stone-100 px-2.5 py-2.5 shadow-sm ${
        colourVariants[activeCourse?.colour ?? 0]
      } hover:cursor-grabbing focus:ring-1 focus:ring-stone-200 active:bg-stone-100`}
    >
      {activeCourse && (
        <ClassCard
          key={activeCourse.courseCode + CourseType[activeCourse.type]}
          course={activeCourse}
        />
      )}
    </DragOverlay>
  );
}

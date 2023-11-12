"use client";
import { DragOverlay } from "@dnd-kit/core";
import { usePreview } from "~/contexts/PreviewContext";
import ClassCard from "./ClassCard";
import { colourVariants, CourseType } from "~/lib/definitions";
function DragOverlayClassCard() {
  const { activeCourse } = usePreview();
  return (
    <DragOverlay>
      <div
        className={`z-50 flex w-72 flex-col gap-1 rounded-md border-r-[6.5px] bg-stone-100 p-5 py-2.5 shadow-sm ${
          colourVariants[activeCourse?.colour ?? 0]
        } focus:ring-1 focus:ring-stone-200 active:bg-stone-100`}
      >
        {activeCourse && (
          <ClassCard
            key={activeCourse.courseCode + CourseType[activeCourse.type]}
            course={activeCourse}
          />
        )}
      </div>
    </DragOverlay>
  );
}

export default DragOverlayClassCard;

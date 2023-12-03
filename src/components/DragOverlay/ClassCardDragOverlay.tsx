"use client";
import { DragOverlay } from "@dnd-kit/core";
import { usePreview } from "~/contexts/PreviewContext";
import ClassCard from "../ClassCard/ClassCard";
import { colourVariants } from "~/lib/definitions";
import { RxDragHandleDots2 } from "react-icons/rx";

export default function ClassCardDragOverlay() {
  const { activeCourse, over } = usePreview();
  return (
    <DragOverlay
      className={`z-50 flex w-72 flex-row items-center justify-between gap-1 rounded-md border-l-[6.5px] bg-neutral-100 px-2.5 py-2.5 shadow-sm dark:bg-neutral-700 ${
        colourVariants[activeCourse?.colour ?? 0]
      } `}
    >
      {activeCourse && (
        <>
          <div className="space-y-1 px-1.5">
            <ClassCard key={activeCourse.id} course={activeCourse} />
          </div>
          <RxDragHandleDots2 color="#737373" />
        </>
      )}
    </DragOverlay>
  );
}

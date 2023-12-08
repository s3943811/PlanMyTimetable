"use client";
import { ClassCard, ClassCardClient, DragOverlay } from "~/components";
import { CourseType } from "~/lib/definitions";
import { usePreview } from "~/contexts/PreviewContext";
import { RxDragHandleDots2 } from "react-icons/rx";

export default function ClassList() {
  const { courseData } = usePreview();

  return (
    <div className="hidden flex-col gap-3 overflow-y-auto overflow-x-hidden pb-4 pt-1 scrollbar-hide md:flex">
      {courseData.map((item) => (
        <div
          key={item.id}
          className="border-b border-b-neutral-100 px-3 pb-2 last:border-none dark:border-b-neutral-700"
        >
          <ClassCardClient course={item}>
            <div className="space-y-1 px-1.5">
              <ClassCard
                key={item.courseCode + CourseType[item.type]}
                course={item}
              />
            </div>
            <RxDragHandleDots2 className=" fill-[#737373] dark:fill-neutral-800" />
          </ClassCardClient>
        </div>
      ))}
      <DragOverlay />
    </div>
  );
}

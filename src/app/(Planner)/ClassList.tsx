"use client";
import { ClassCard, ClassCardClient } from "~/components";
import { CourseType } from "~/lib/definitions";
import { usePreview } from "~/contexts/PreviewContext";
import { RxDragHandleDots2 } from "react-icons/rx";

export default function ClassList({ isMobile }: { isMobile: boolean }) {
  const { courseData } = usePreview();

  return (
    <div className="flex grow flex-col gap-3 overflow-y-auto overflow-x-hidden pb-4 pt-1 scrollbar-hide">
      {courseData.map((item) => (
        <div
          key={item.id}
          className="border-b border-b-neutral-100 px-3 pb-2 last:border-none dark:border-b-neutral-700"
        >
          <ClassCardClient
            course={item}
            id={(isMobile ? "mobileCourse" : "course") + item.id}
          >
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
    </div>
  );
}

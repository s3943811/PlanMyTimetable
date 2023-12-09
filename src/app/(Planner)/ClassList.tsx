"use client";
import { ClassCard, ClassCardClient, DragOverlay } from "~/components";
import { CourseType } from "~/lib/definitions";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RetainLink } from "~/components";
import { usePreview } from "~/contexts/PreviewContext";
import { RxDragHandleDots2 } from "react-icons/rx";

export default function ClassList() {
  const { courseData } = usePreview();

  if (!courseData || courseData.length === 0) {
    return (
      <div className=" flex h-full flex-col items-center justify-center gap-3 px-4 pb-4 pt-1">
        <HiOutlineAcademicCap size={96} />
        <p>{`You haven't added any classes yet.`}</p>
        <RetainLink
          className="under font-medium underline decoration-[1.5px] underline-offset-[7px] transition-all hover:font-semibold"
          href={"/classes/add"}
        >
          Add a class now.
        </RetainLink>
      </div>
    );
  }
  return (
    <div className="flex grow flex-col gap-3 overflow-y-auto overflow-x-hidden pb-4 pt-1 scrollbar-hide">
      {courseData.map((item) => (
        <div
          key={item.id}
          className="border-b border-b-neutral-100 px-3 pb-2 last:border-none"
        >
          <ClassCardClient course={item}>
            <div className="space-y-1 px-1.5">
              <ClassCard
                key={item.courseCode + CourseType[item.type]}
                course={item}
              />
            </div>
            <RxDragHandleDots2 color="#737373" />
          </ClassCardClient>
        </div>
      ))}
      <DragOverlay />
    </div>
  );
}

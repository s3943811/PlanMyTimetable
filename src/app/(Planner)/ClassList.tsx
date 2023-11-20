"use client";
import { ClassCard, ClassCardClient, DragOverlay } from "~/components";
import { CourseType } from "~/lib/definitions";
import { HiOutlineAcademicCap } from "react-icons/hi";
import Link from "next/link";
import { usePreview } from "~/contexts/PreviewContext";

export default function ClassList() {
  const { courseData } = usePreview();

  if (!courseData) {
    return (
      <div className=" flex h-full flex-col items-center justify-center gap-3 pb-4 pt-1">
        <HiOutlineAcademicCap size={96} />
        <p className="white">You haven't added any classes yet. </p>
        <Link
          className="under font-medium underline decoration-[1.5px] underline-offset-[7px]"
          href={"/classes/add"}
        >
          Add a class now.
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden pb-4 pt-1 scrollbar-hide">
      {courseData.map((item) => (
        <ClassCardClient
          key={item.courseCode + CourseType[item.type]}
          course={item}
        >
          <ClassCard
            key={item.courseCode + CourseType[item.type]}
            course={item}
          />
        </ClassCardClient>
      ))}
      <DragOverlay />
    </div>
  );
}

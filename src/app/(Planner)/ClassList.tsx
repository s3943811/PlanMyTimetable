"use client";
import { ClassCard, ClassCardClient, DragOverlay } from "~/components";
import { Course, CourseType } from "~/lib/definitions";
import { useUrlState } from "~/hooks/useUrlState";
import { HiOutlineAcademicCap } from "react-icons/hi";
import Link from "next/link";
export default function ClassList() {
  const { decode } = useUrlState();
  const ClassListData: [Course] = decode("state");
  if (!ClassListData) {
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
      {ClassListData.map((item) => (
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

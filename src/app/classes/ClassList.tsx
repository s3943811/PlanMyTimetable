"use client";
import { ClassCard } from "~/components";
import { Course, CourseType, colourVariants } from "~/lib/definitions";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { RetainLink } from "~/components";
import { usePreview } from "~/contexts/PreviewContext";
import { getCourseTypeString, getColourString } from "~/lib/functions";
import { formSchema } from "./ClassForm";
import * as z from "zod";
import { useClassForm } from "~/contexts/ClassFormContext";
import { useEffect } from "react";

export default function ClassList() {
  const { courseData } = usePreview();
  const { active, setActive } = useClassForm();
  useEffect(() => {
    courseData && courseData[0] && handleClick(courseData[0]);
  }, [courseData]);

  const handleClick = (item: Course) => {
    const x: z.infer<typeof formSchema> = {
      title: item.title,
      code: item.courseCode,
      type: getCourseTypeString(item.type),
      duration: item.options[0]!.duration,
      colour: getColourString(item.colour),
      options: item.options.map((item) => {
        return {
          day: item.day,
          start_time: item.start,
          room: item.location,
          campus: item.campus_description,
        };
      }),
    };
    setActive(x);
  };
  if (!courseData || courseData.length === 0) {
    return (
      <aside className="flex grow flex-col border-r p-3 py-1">
        <div className=" flex h-full w-full flex-col items-center justify-center gap-3 pb-4 pt-1">
          <HiOutlineAcademicCap size={96} />
          <p className="white">You haven't added any classes yet. </p>
          <RetainLink
            className="under font-medium underline decoration-[1.5px] underline-offset-[7px]"
            href={"/classes/add"}
          >
            Add a class now.
          </RetainLink>
        </div>
      </aside>
    );
  }
  return (
    <aside className="flex w-fit flex-col border-r p-3 py-1">
      <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden pb-4 pt-1 scrollbar-hide">
        {courseData.map((item) => (
          <button
            key={item.courseCode + item.title + item.type}
            onClick={() => handleClick(item)}
            className={`flex w-72 flex-col gap-1 rounded-md border border-r-[6.5px] px-5 py-2.5 ${
              active?.title === item.title &&
              active.type === getCourseTypeString(item.type)
                ? "bg-neutral-50"
                : ""
            } ${
              colourVariants[item.colour]
            } items-start justify-start hover:bg-neutral-100 active:bg-neutral-100`}
          >
            <ClassCard
              key={item.courseCode + CourseType[item.type]}
              course={item}
            />
          </button>
        ))}
      </div>
    </aside>
  );
}

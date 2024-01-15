import { getColourString, getCourseTypeString } from "~/lib/functions";
import { notFound } from "next/navigation";
import { CourseType } from "~/lib/definitions";
import type { Course } from "~/lib/definitions";
import ClassForm from "../(ClassesComponents)/ClassForm";
import type { formSchema } from "../(ClassesComponents)/ClassForm";
import type { z } from "zod";
import { useCallback } from "react";
import JSONCrush from "jsoncrush";
import DeleteButton from "./DeleteButton";

interface classPageProps {
  params: { class: string };
  searchParams: { state: string };
}

export default function Page({ params, searchParams }: classPageProps) {
  const decode = useCallback((): Course[] => {
    try {
      return JSON.parse(JSONCrush.uncrush(searchParams.state));
    } catch (e) {
      notFound();
    }
  }, [searchParams]);

  const courseData = decode();

  const course = courseData.find((course) => course.id === params.class);

  // if (courseData.length === 0) {
  //   redirect(`/classes/add?${params.toString()}`);
  // }

  if (!course) {
    notFound();
  }

  const formValues: z.infer<typeof formSchema> = {
    id: course.id,
    title: course.title,
    code: course.courseCode,
    type: getCourseTypeString(course.type),
    duration: course.options[0]!.duration,
    colour: getColourString(course.colour),
    options: course.options.map((item) => {
      return {
        day: item.day,
        start_time: item.start,
        room: item.location,
        campus: item.campus_description,
      };
    }),
  };

  return (
    <div className="flex grow flex-col px-8 py-2 dark:bg-neutral-900 dark:text-white">
      <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div>
          <h3 className="text-base font-medium">
            {course.title} - {CourseType[course.type]}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Update class details. Remove unneeded classes.
          </p>
        </div>
        <DeleteButton id={course.id} />
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className=" my-3 h-[1px] w-full shrink-0 bg-neutral-200 dark:bg-neutral-600"
      ></div>
      <ClassForm defaultValues={formValues} />
    </div>
  );
}

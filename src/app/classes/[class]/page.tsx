"use client";
import { Button } from "~/components";
import { HiTrash } from "react-icons/hi2";
import { usePreview } from "~/contexts/PreviewContext";
import { getColourString, getCourseTypeString } from "~/lib/functions";
import { notFound } from "next/navigation";
import { CourseType } from "~/lib/definitions";
import type { Preference } from "~/lib/definitions";
import ClassForm from "../ClassForm";
import type { formSchema } from "../ClassForm";
import type { z } from "zod";
import { useUrlState } from "~/hooks/useUrlState";
import toast from "react-hot-toast";

export default function Page({ params }: { params: { class: string } }) {
  const { courseData } = usePreview();
  const { replaceMultiple, decode, redirect } = useUrlState();

  const course = courseData.find((course) => course.id === params.class);

  if (courseData.length === 0) {
    redirect("/classes");
  }

  if (!course) {
    notFound();
  }

  const handleDelete = () => {
    const index = courseData.findIndex(
      (item) =>
        item.title === course?.title &&
        item.courseCode === course.courseCode &&
        item.type === course.type,
    );
    let events: Preference[] = [];
    const parsedPrefs: Preference[] = decode("pref") as Preference[];
    if (parsedPrefs) {
      events = parsedPrefs;
    }
    const eventIndex = events.findIndex(
      (item) =>
        item.title === course?.title &&
        item.courseCode === course.courseCode &&
        item.type === course.type,
    );
    // console.log(eventIndex);
    const classes = index !== -1 ? courseData.toSpliced(index, 1) : courseData;
    const newEvents =
      eventIndex !== -1 ? events.toSpliced(eventIndex, 1) : events;
    const newIndex = index >= courseData.length - 1 ? 0 : index + 1;
    replaceMultiple(
      [
        { element: classes, prefName: "state" },
        { element: newEvents, prefName: "pref" },
      ],
      `/classes/${courseData[newIndex]?.id}`,
    );
    toast.success("Class deleted successfully");
  };

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

        <Button onClick={handleDelete}>
          <HiTrash />
          Delete
        </Button>
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

"use client";
import { Button } from "~/components";
import { HiTrash } from "react-icons/hi";
import { usePreview } from "~/contexts/PreviewContext";
import { getColourString, getCourseTypeString } from "~/lib/functions";
import { notFound } from "next/navigation";
import { CourseType, Preference } from "~/lib/definitions";
import ClassForm, { formSchema } from "../ClassForm";
import { z } from "zod";
import { useUrlState } from "~/hooks/useUrlState";
import toast from "react-hot-toast";

export default function Page({ params }: { params: { class: string } }) {
  const { courseData } = usePreview();
  const [code, type] = params.class.split("-");
  const { replaceMultiple, decode } = useUrlState();

  const course = courseData.find(
    (course) =>
      course.courseCode === code && getCourseTypeString(course.type) === type,
  );

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
    const parsedPrefs = decode("pref");
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
    const newEvents = eventIndex !== -1 ? events.toSpliced(index, 1) : events;
    replaceMultiple(
      [
        { element: classes, prefName: "state" },
        { element: newEvents, prefName: "pref" },
      ],
      `/classes/${courseData[index + 1]?.courseCode}-${
        courseData[index + 1]?.type &&
        getCourseTypeString(courseData[index + 1]!.type)
      }`,
    );
    toast.success("Class deleted successfully");
  };

  const formValues: z.infer<typeof formSchema> = {
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
    <div className="flex grow flex-col px-8 py-2">
      <div className="absolute right-9 top-[4.25rem]">
        <Button onClick={handleDelete}>
          <HiTrash />
          Delete
        </Button>
      </div>
      <h3 className="text-base font-medium">
        {course.title} - {CourseType[course.type]}
      </h3>
      <p className="text-sm font-light text-neutral-500/90">
        Update class details. Remove unneeded classes.
      </p>
      <div
        data-orientation="horizontal"
        role="none"
        className=" my-3 h-[1px] w-full shrink-0 bg-neutral-200"
      ></div>
      <ClassForm defaultValues={formValues} />
    </div>
  );
}

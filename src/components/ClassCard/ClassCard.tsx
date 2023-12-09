import { Badge } from "~/components";
import { CourseType } from "~/lib/definitions";
import type { Course } from "~/lib/definitions";

// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
export default function ClassCard({ course }: { course: Course }) {
  let cardColour;
  switch (course.type) {
    case CourseType.Lecture:
      cardColour =
        "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200";
      break;
    case CourseType.Tutorial:
      cardColour =
        "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200";
      break;
    case CourseType.Practical:
      cardColour =
        "bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200";
      break;
    case CourseType.Workshop:
      cardColour =
        "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200";
      break;
    default:
      cardColour =
        "bg-neutral-200 text-neutral-800 dark:bg-neutral-600 dark:text-neutral-200";
      break;
  }
  return (
    <>
      <h1 className="line-clamp-1 text-base font-medium">{course.title}</h1>
      <div className="flex gap-2 divide-x md:block md:divide-x-0 lg:flex lg:flex-row lg:gap-2 lg:divide-x">
        <p className="text-xs text-neutral-400 dark:text-neutral-300">
          {course.courseCode}
        </p>
        <p className=" pl-2 text-xs text-neutral-400 dark:text-neutral-300 md:pl-0 lg:pl-2">
          {course.options.length} -&nbsp;
          {course.options.length === 1 ? "Option" : "Options"}
        </p>
      </div>
      <Badge className={cardColour}>{CourseType[course.type]}</Badge>
    </>
  );
}

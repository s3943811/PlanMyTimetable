import { Badge } from "~/components";
import { Course, CourseType } from "~/lib/definitions";

// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
export default function ClassCard({ course }: { course: Course }) {
  var cardColour;
  switch (course.type) {
    case CourseType.Lecture:
      cardColour = "bg-green-200 text-green-800";
      break;
    case CourseType.Tutorial:
      cardColour = "bg-blue-200 text-blue-800";
      break;
    case CourseType.Practical:
      cardColour = "bg-rose-200 text-rose-800";
      break;
    case CourseType.Workshop:
      cardColour = "bg-amber-200 text-amber-800";
      break;
    default:
      cardColour = "bg-neutral-200 text-neutral-800";
      break;
  }
  return (
    <>
      <h1 className="line-clamp-1 font-medium">{course.title}</h1>
      <div className="flex flex-row gap-2 divide-x">
        <p className="text-xs font-light text-neutral-400">
          {course.courseCode}
        </p>
        <p className=" pl-2 text-xs font-light text-neutral-400">
          {course.options.length} -{" "}
          {course.options.length === 1 ? "Option" : "Options"}
        </p>
      </div>
      <Badge className={cardColour}>{CourseType[course.type]}</Badge>
    </>
  );
}

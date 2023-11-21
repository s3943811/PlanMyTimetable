import { Badge } from "~/components";
import { Course, CourseType } from "~/lib/definitions";

// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
export default function ClassCard({ course }: { course: Course }) {
  var cardColour;
  switch (course.type) {
    case CourseType.Lecture:
      cardColour = "bg-green-500/90 text-green-50";
      break;
    case CourseType.Tutorial:
      cardColour = "bg-blue-500/90 text-blue-50";
      break;
    case CourseType.Practical:
      cardColour = "bg-rose-500/90 text-rose-50";
      break;
    case CourseType.Workshop:
      cardColour = "bg-amber-500/90 text-amber-50";
      break;
    default:
      cardColour = "bg-neutral-500/90 text-neutral-50";
      break;
  }
  return (
    <>
      <h1 className="line-clamp-1 text-base font-medium">{course.title}</h1>
      <p className="text-xs font-light text-neutral-400">{course.courseCode}</p>
      <Badge className={cardColour + " px-3.5 text-xs"}>
        {CourseType[course.type]}
      </Badge>
    </>
  );
}

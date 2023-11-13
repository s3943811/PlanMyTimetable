import { Badge } from "~/components";
import { Course, CourseType } from "~/lib/definitions";
import { RxDragHandleDots2 } from "react-icons/rx";

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
    default:
      cardColour = "";
      break;
  }
  return (
    <>
      <RxDragHandleDots2 color="#737373" />
      <div className="px-1.5">
        <h1 className="line-clamp-1 pb-0.5 text-base font-medium">
          {course.title}
        </h1>
        <p className="text-xs font-light text-neutral-400">
          {course.courseCode}
        </p>
        <Badge className={cardColour + " px-3.5 text-xs"}>
          {CourseType[course.type]}
        </Badge>
      </div>
    </>
  );
}

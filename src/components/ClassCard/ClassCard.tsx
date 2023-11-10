import { Badge } from "~/components";
import { Course, CourseType } from "~/lib/definitions";

// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
export default function ClassCard({ course }: { course: Course }) {
  var cardColour;
  switch (course.type) {
    case CourseType.Lecture:
      cardColour = "bg-green-400";
      break;
    case CourseType.Tutorial:
      cardColour = "bg-blue-400";
      break;
    default:
      cardColour = "";
      break;
  }

  return (
    <>
      <h1 className="line-clamp-1 text-lg font-medium">{course.title}</h1>
      <p className=" text-xs font-light text-gray-400">{course.courseCode}</p>
      <Badge className={cardColour + " px-4 text-sm"}>
        {CourseType[course.type]}
      </Badge>
    </>
  );
}

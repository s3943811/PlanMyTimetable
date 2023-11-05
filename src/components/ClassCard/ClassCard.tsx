import { Badge } from "~/components";
import { CourseType } from "~/lib/definitions";

export interface ClassCardProps {
  title: string;
  courseCode: string;
  type: CourseType;
  colour: string;
}

function ClassCard({ title, courseCode, type, colour }: ClassCardProps) {
  var cardColour;
  switch (type) {
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
    <div
      className={`flex w-72 flex-col gap-1 border-r-8 p-5 py-2.5 ${colour} rounded-md shadow-sm hover:bg-stone-100`}
    >
      <h1 className="line-clamp-1 text-lg font-medium">{title}</h1>
      <p className=" text-xs font-light text-gray-400">{courseCode}</p>
      <Badge className={cardColour + " px-4 text-sm"}>{CourseType[type]}</Badge>
    </div>
  );
}

export default ClassCard;

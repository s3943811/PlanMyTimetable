import { Badge, Button } from "~/components";
import { Course, CourseType } from "~/lib/definitions";

// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
function ClassCard({ title, courseCode, type, colour, options }: Course) {
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
  const setCorrespondingEvents = () => {
    
  }
  return (
    <div className={`flex w-72 flex-col gap-1 border-r-8 p-5 py-2.5 rounded-md shadow-sm hover:bg-stone-100 ${colour}`}>
      <h1 className="line-clamp-1 text-lg font-medium">{title}</h1>
      <p className=" text-xs font-light text-gray-400">{courseCode}</p>
      <Badge className={cardColour + " px-4 text-sm"}>{CourseType[type]}</Badge>
    </div>
  );
}

export default ClassCard;

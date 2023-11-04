import { Badge } from "~/components";
import { CourseType } from "~/lib/definitions";

export interface ClassCardProps {
    title: string,
    courseCode: string,
    type: CourseType,
    colour: string
}

function ClassCard({title, courseCode, type, colour}: ClassCardProps) {
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
        <div className={`flex flex-col p-5 py-2.5 w-72 gap-1 border-r-8 ${colour} shadow-sm rounded-md hover:bg-stone-100`}>
            <h1 className="text-lg font-medium line-clamp-1">{title}</h1>
            <p className=" text-xs text-gray-400 font-light">{courseCode}</p>
            <Badge className={cardColour + " text-sm px-4"}>{CourseType[type]}</Badge>
        </div>
    )
}

export default ClassCard;
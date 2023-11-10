import { CourseType, Time, ColourPalette } from "~/lib/definitions";
import { addMinutesToTimeString } from "~/lib/functions";
interface EventProps {
  title: string;
  type: CourseType;
  colour: ColourPalette;
  time: Time;
}
export default function Event({ title, type, colour, time }: EventProps) {
  const endTime = addMinutesToTimeString(time.start, time.duration);
  const colourVariants = {
    0: "bg-purple-400 text-purple-800 shadow-purple-100 border-l-[7px] border-l-purple-500",
    1: "bg-yellow-400 text-yellow-800 shadow-yellow-100 border-l-[7px] border-l-yellow-500",
    2: "bg-orange-400 text-orange-800 shadow-orange-100 border-l-[7px] border-l-orange-500",
    3: "bg-red-400 text-red-800 shadow-red-100 border-l-[7px] border-l-red-500",
  };
  return (
    <div
      className={`flex flex-col ${colourVariants[colour]} rounded bg-opacity-60 px-3 py-2`}
    >
      <h1 className="line-clamp-1 font-medium">{title}</h1>
      <p className="text-sm font-normal">
        {time.start} - {endTime}
      </p>
      <p className=" text-xs font-light">{`${CourseType[type]}, ${time.campus_description} (${time.location})`}</p>
    </div>
  );
}

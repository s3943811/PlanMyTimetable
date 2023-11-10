import { CourseType, Time, ColourPalette } from "~/lib/definitions";
import {
  addMinutesToTimeString,
  getDayEnum,
  getRowIndex,
} from "~/lib/functions";
interface EventProps {
  title: string;
  type: CourseType;
  colour: ColourPalette;
  time: Time;
}
export default function Event({ title, type, colour, time }: EventProps) {
  const endTime = addMinutesToTimeString(time.start, time.duration);
  const colourVariants = {
    0: "bg-purple-400/40 text-purple-800 shadow-purple-100 border-l-[7px] border-l-purple-500",
    1: "bg-yellow-400/40 text-yellow-800 shadow-yellow-100 border-l-[7px] border-l-yellow-500",
    2: "bg-orange-400/40 text-orange-800 shadow-orange-100 border-l-[7px] border-l-orange-500",
    3: "bg-red-400/40 text-red-800 shadow-red-100 border-l-[7px] border-l-red-500",
  };
  const colStart = `col-start-[${getDayEnum(time.day)! + 2}]`;
  const rowStart = `row-start-[${getRowIndex(time.start)}]`;
  const rowSpan: number = time.duration / 30;
  const rowSpans: { [key: number]: string } = {
    1: "row-span-1",
    2: "row-span-2",
    3: "row-span-3",
    4: "row-span-4",
    5: "row-span-5",
    6: "row-span-6",
  };
  return (
    <div
      className={`${colStart} ${rowStart} ${rowSpans[rowSpan]} m-0.5 flex flex-col overflow-hidden ${colourVariants[colour]} rounded px-3 py-2`}
    >
      <h1 className="font-medium">{title}</h1>
      <p className="text-sm font-normal">
        {time.start} - {endTime}
      </p>
      <p className=" text-xs font-light">{`${CourseType[type]}, ${time.campus_description} (${time.location})`}</p>
    </div>
  );
}

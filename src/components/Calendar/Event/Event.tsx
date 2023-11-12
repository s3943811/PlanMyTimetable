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

  return (
    <>
      <h1 className="font-medium">{title}</h1>
      <p className="text-sm font-normal">
        {time.start} - {endTime}
      </p>
      <p className=" text-xs font-light">{`${CourseType[type]}, ${time.campus_description} (${time.location})`}</p>
    </>
  );
}

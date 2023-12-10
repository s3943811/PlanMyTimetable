import { CourseType } from "~/lib/definitions";
import type { Time } from "~/lib/definitions";
import { Duration, DateTime } from "luxon";
import { useMemo } from "react";

interface EventProps {
  title: string;
  type: CourseType;
  time: Time;
}
export default function Event({ title, type, time }: EventProps) {
  const endTime = useMemo(() => {
    const endTime = DateTime.fromFormat(time.start, "HH:mm");
    const duration = Duration.fromObject({ minutes: time.duration });
    return endTime.plus(duration);
  }, [time]);

  return (
    <>
      <h1 className="truncate text-sm font-medium tracking-tight xl:text-base">
        {title}
      </h1>
      <p className=" whitespace-pre-wrap text-xs font-normal tracking-tighter sm:whitespace-nowrap md:text-sm lg:whitespace-normal">
        {time.start} - {endTime.toFormat("HH:mm")}
      </p>
      <p className=" text-xs ">
        {CourseType[type]}
        <span className="hidden md:contents md:before:content-[',_']">
          {time.campus_description}&nbsp;({time.location})
        </span>
      </p>
    </>
  );
}

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
    let endTime = DateTime.fromFormat(time.start, "HH:mm");
    const duration = Duration.fromObject({ minutes: time.duration });
    return endTime.plus(duration);
  }, [time]);

  return (
    <>
      <h1 className="line-clamp-1 text-sm font-medium lg:line-clamp-none lg:text-base">
        {title}
      </h1>
      <p className="text-xs font-normal lg:text-sm">
        {time.start} - {endTime.toFormat("HH:mm")}
      </p>
      <p className=" text-xs">{`${CourseType[type]}, ${time.campus_description} (${time.location})`}</p>
    </>
  );
}

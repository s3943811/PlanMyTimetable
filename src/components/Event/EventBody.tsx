import { CourseType } from "~/lib/definitions";
import type { Time } from "~/lib/definitions";
import { Duration, DateTime } from "luxon";
import { useMemo } from "react";
import { cn } from "~/lib/utils";

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

  /**
   * There are 3 return scenarios here depending on how large (the duration) the div will be,
   * so either return just the Title of the class - 30 minutes
   * the title, type and times - 60 minutes
   * the title, type, times and location - anything above 60 minutes
   */
  return (
    <>
      <h1 className="line-clamp-3 text-sm font-medium lg:line-clamp-none xl:text-base">
        {title}
      </h1>
      {time.duration > 30 && (
        <>
          <p
            className={cn(
              `text-xs 2xl:text-sm`,
              time.duration > 60 ? "" : "hidden sm:block",
            )}
          >
            {CourseType[type]}
          </p>
          <p
            className={cn(
              "whitespace-pre-line text-xs 2xl:text-sm",
              time.duration > 60 ? "" : "hidden sm:block",
            )}
          >
            {time.start} <span className="hidden md:contents">-</span>{" "}
            {endTime.toFormat("HH:mm")}
          </p>
        </>
      )}

      {time.duration > 60 && (
        <>
          <p className="line-clamp-2 hidden text-xs lg:block">
            {time.campus_description}&nbsp;({time.location})
          </p>
        </>
      )}
    </>
  );
}

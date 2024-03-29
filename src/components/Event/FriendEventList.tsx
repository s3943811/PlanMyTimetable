import Event from "./EventBody";
import type { Friend } from "~/contexts/FriendContext";
import { CourseType } from "~/lib/definitions";
import type { Course, Preference } from "~/lib/definitions";
import {
  addMinutesToTimeString,
  getDayEnum,
  getRowIndex,
} from "~/lib/functions";
import { useMemo } from "react";
import { useFriend } from "~/contexts/FriendContext";
import { usePreview } from "~/contexts/PreviewContext";
import { cn } from "~/lib/utils";

export function ActiveCourseFriendPreview({
  friendData,
  activeCourse,
}: {
  friendData: Friend[];
  activeCourse: Course;
}) {
  return friendData
    .filter((friend) => friend.active)
    .map((item) =>
      item.state.map((item) => {
        const rowSpan: number = item.time.duration / 30;
        if (
          item.courseCode === activeCourse.courseCode &&
          item.type === activeCourse.type
        ) {
          return (
            <div
              key={item.courseCode + item.type}
              style={{
                gridRowEnd: `span ${rowSpan}`,
                gridColumnStart: `${getDayEnum(item.time.day)! + 2}`,
                gridRowStart: `${getRowIndex(item.time.start)}`,
              }}
              className={`m-0.5 flex flex-col overflow-hidden rounded border-l-[7px] px-3 py-2 text-neutral-800 opacity-50 `}
            >
              <Event title={item.title} type={item.type} time={item.time} />
            </div>
          );
        }
      }),
    );
}

export function FriendEvent({
  item,
}: {
  item: Omit<Preference, "colour"> & { friends: string[] };
}) {
  const endTime = addMinutesToTimeString(
    item.time.start,
    Number(item.time.duration),
  );
  const rowSpan: number = Number(item.time.duration) / 30;
  const { activeCourse } = usePreview();

  return (
    <div
      key={item.id}
      style={{
        gridRowEnd: `span ${rowSpan}`,
        gridColumnStart: `${getDayEnum(item.time.day)! + 2}`,
        gridRowStart: `${getRowIndex(item.time.start)}`,
      }}
      className={cn(
        `m-1 flex flex-col overflow-hidden rounded-md border bg-neutral-50 py-2 
      pl-[1.19rem] pr-3 text-neutral-800 transition-all  dark:border-neutral-400 
      dark:bg-neutral-800 dark:text-white `,
        activeCourse ? "opacity-15" : "opacity-70 dark:opacity-50",
      )}
    >
      <h1 className="line-clamp-1 text-sm font-medium lg:line-clamp-none lg:text-base">
        {item.title}
      </h1>
      <p className="text-xs font-normal lg:text-sm">
        {item.time.start} - {endTime}
      </p>
      <div className="">
        {item.friends.length !== 0 && (
          <p className=" inline-flex text-xs">
            <span className="hidden md:block">Friends in this class:</span>
            &nbsp;{item.friends.join(", ")}
          </p>
        )}
        {/* <p className=" text-xs">{`${CourseType[item.type]}, ${
          item.time.campus_description
        } (${item.time.location})`}</p> */}
      </div>
    </div>
  );
}

export function FriendClashEvent({
  item,
}: {
  item: Preference & { originalType: string };
}) {
  const { friendData } = useFriend();
  const friendsTaking = useMemo(
    () =>
      friendData
        ?.filter((friend) => {
          return (
            friend.active &&
            friend.state.some((preference) => {
              return (
                item.title === preference.title &&
                item.courseCode === preference.courseCode &&
                item.type === preference.type &&
                item.time.start === preference.time.start &&
                item.time.day === preference.time.day &&
                item.time.campus_description ===
                  preference.time.campus_description
              );
            })
          );
        })
        .map((friend) => friend.name),
    [friendData, item],
  );

  const rowSpan: number = item.time.duration / 30;
  const endTime = addMinutesToTimeString(item.time.start, item.time.duration);
  const { activeCourse } = usePreview();

  return (
    <div
      key={item.id}
      style={{
        gridRowEnd: `span ${rowSpan}`,
        gridColumnStart: `${getDayEnum(item.time.day)! + 2}`,
        gridRowStart: `${getRowIndex(item.time.start)}`,
      }}
      className={cn(
        `flex w-1/2 flex-col overflow-hidden rounded-md border bg-neutral-50 py-2 
      pl-[1.19rem] pr-3 text-neutral-800 transition-all  dark:border-neutral-400 
      dark:bg-neutral-800 dark:text-white `,
        activeCourse ? "opacity-15" : "opacity-70 dark:opacity-50",
      )}
    >
      <h1 className="line-clamp-1 text-sm font-medium lg:line-clamp-none lg:text-base">
        {item.title}
      </h1>
      <p className="text-xs font-normal lg:text-sm">
        {item.time.start} - {endTime}
      </p>
      <div className="space-y-1">
        {friendsTaking && friendsTaking.length !== 0 && (
          <p className=" text-xs">
            {`Friend's taking: ${friendsTaking.join(", ")}`}
          </p>
        )}
        <p className=" text-xs">{`${CourseType[item.type]}, ${
          item.time.campus_description
        } (${item.time.location})`}</p>
      </div>
    </div>
  );
}

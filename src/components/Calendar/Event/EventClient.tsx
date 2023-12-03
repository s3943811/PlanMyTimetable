import { useDraggable } from "@dnd-kit/core";
import type { Preference, Days } from "~/lib/definitions";
import { getDayEnum, getRowIndex } from "~/lib/functions";
import { usePreview } from "~/contexts/PreviewContext";
import { useFriend } from "~/contexts/FriendContext";
import { useMemo } from "react";

interface EventClientProps {
  children: React.ReactNode;
  preference: Preference;
  clash?: number;
}

export default function EventClient({
  children,
  preference,
  clash,
}: EventClientProps) {
  const { courseData } = usePreview();
  const { friendData } = useFriend();
  const friendsTaking = useMemo(
    () =>
      friendData
        ?.filter((friend) => {
          return (
            friend.active &&
            friend.state.some((item) => {
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
    [friendData, preference],
  );

  const colourVariants = {
    0: "bg-purple-400/40 text-purple-800 shadow-purple-100 border-l-[7px] border-l-purple-500 dark:text-purple-400 dark:bg-purple-700/40 dark:border-l-purple-800",
    1: "bg-yellow-400/40 text-yellow-800 shadow-yellow-100 border-l-[7px] border-l-yellow-500 dark:text-yellow-400 dark:bg-yellow-700/40 dark:border-l-yellow-800",
    2: "bg-orange-400/40 text-orange-800 shadow-orange-100 border-l-[7px] border-l-orange-500 dark:text-orange-400 dark:bg-orange-700/40 dark:border-l-orange-800",
    3: "bg-red-400/40 text-red-800 shadow-red-100 border-l-[7px] border-l-red-500 dark:text-red-400 dark:bg-red-700/40 dark:border-l-red-800",
    4: "bg-green-400/40 text-green-800 shadow-green-100 border-l-[7px] border-l-green-500 dark:text-green-400 dark:bg-green-700/40 dark:border-l-green-800",
    5: "bg-teal-400/40 text-teal-800 shadow-teal-100 border-l-[7px] border-l-teal-500 dark:text-teal-400 dark:bg-teal-700/40 dark:border-l-teal-800",
    6: "bg-blue-400/40 text-blue-800 shadow-blue-100 border-l-[7px] border-l-blue-500 dark:text-blue-400 dark:bg-blue-700/40 dark:border-l-blue-800",
    7: "bg-fuchsia-400/40 text-fuchsia-800 shadow-fuchsia-100 border-l-[7px] border-l-fuchsia-500 dark:text-fuchsia-400 dark:bg-fuchsia-800/40 dark:border-l-fuchsia-800",
    8: "bg-pink-400/40 text-pink-800 shadow-pink-100 border-l-[7px] border-l-pink-500 dark:text-pink-400 dark:bg-pink-700/40 dark:border-l-pink-800",
  };

  const course = useMemo(
    () =>
      courseData.find(
        (course) =>
          course.title === preference.title &&
          course.courseCode === preference.courseCode &&
          course.type === preference.type &&
          course.colour === preference.colour,
      ),
    [courseData, preference],
  );

  const { attributes, listeners, setNodeRef, isDragging, over } = useDraggable({
    id: "event" + preference.courseCode + preference.type,
    data: {
      course: course,
    },
    attributes: {
      role: "div",
      tabIndex: 0,
    },
  });
  // const rowSpan: number = preference.time.duration / 30;

  const col = useMemo<Days>(
    () => getDayEnum(preference.time.day) + 2,
    [preference],
  );
  const row = useMemo<number>(
    () => getRowIndex(preference.time.start),
    [preference],
  );
  const rowSpan = useMemo<number>(
    () => preference.time.duration / 30,
    [preference],
  );

  // console.log(rowSpan);

  if (clash) {
    const height = (preference.time.duration / clash) * 100;
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        tabIndex={0}
        style={{ height: `${height}%` }}
        className={`z-10 ${
          isDragging && "opacity-50"
        } flex flex-col overflow-hidden ${
          colourVariants[preference.colour]
        } rounded px-3 py-2 ${
          over ? "hover:cursor-copy" : "hover:cursor-grab"
        }`}
      >
        {children}
        {friendsTaking && friendsTaking.length !== 0 && (
          <p className=" mt-2 text-xs font-light">
            This is also being taken at this time by: {friendsTaking.join(", ")}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      tabIndex={0}
      style={{
        gridRowEnd: `span ${rowSpan}`,
        gridColumnStart: `${col}`,
        gridRowStart: `${row}`,
      }}
      className={`z-10 ${
        isDragging && "opacity-50"
      } m-0.5 flex flex-col overflow-hidden ${
        colourVariants[preference.colour]
      } rounded px-3 py-2 ${over ? "hover:cursor-copy" : "hover:cursor-grab"}`}
    >
      {children}
      {friendsTaking && friendsTaking.length !== 0 && (
        <p className=" mt-2 text-xs font-light">
          This is also being taken at this time by: {friendsTaking.join(", ")}
        </p>
      )}
    </div>
  );
}

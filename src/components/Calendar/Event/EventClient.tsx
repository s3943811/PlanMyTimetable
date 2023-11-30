import { useDraggable } from "@dnd-kit/core";
import { Preference } from "~/lib/definitions";
import { colStart, rowStart, rowSpans } from "~/lib/definitions";
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
      friendData &&
      friendData
        .filter((friend) => {
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
    0: "bg-purple-400/40 text-purple-800 shadow-purple-100 border-l-[7px] border-l-purple-500",
    1: "bg-yellow-400/40 text-yellow-800 shadow-yellow-100 border-l-[7px] border-l-yellow-500",
    2: "bg-orange-400/40 text-orange-800 shadow-orange-100 border-l-[7px] border-l-orange-500",
    3: "bg-red-400/40 text-red-800 shadow-red-100 border-l-[7px] border-l-red-500",
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
  const rowSpan: number = preference.time.duration / 30;
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
      className={`z-10 ${colStart[getDayEnum(preference.time.day)! + 2]} ${
        rowStart[getRowIndex(preference.time.start)]
      } ${rowSpans[rowSpan]} ${
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

import { useDraggable } from "@dnd-kit/core";
import { Preference } from "~/lib/definitions";
import { colStart, rowStart, rowSpans } from "~/lib/definitions";
import { getDayEnum, getRowIndex } from "~/lib/functions";
import { ClassListData } from "~/data/data";
interface EventClientProps {
  children: React.ReactNode;
  preference: Preference;
}
export default function EventClient({
  children,
  preference,
}: EventClientProps) {
  const colourVariants = {
    0: "bg-purple-400/40 text-purple-800 shadow-purple-100 border-l-[7px] border-l-purple-500",
    1: "bg-yellow-400/40 text-yellow-800 shadow-yellow-100 border-l-[7px] border-l-yellow-500",
    2: "bg-orange-400/40 text-orange-800 shadow-orange-100 border-l-[7px] border-l-orange-500",
    3: "bg-red-400/40 text-red-800 shadow-red-100 border-l-[7px] border-l-red-500",
  };
  const course = ClassListData.find(
    (course) =>
      course.title === preference.title &&
      course.courseCode === preference.courseCode &&
      course.type === preference.type &&
      course.colour === preference.colour,
  );
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
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
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      tabIndex={0}
      className={`${colStart[getDayEnum(preference.time.day)! + 2]} ${
        rowStart[getRowIndex(preference.time.start)]
      } ${rowSpans[rowSpan]} ${
        isDragging && "opacity-50"
      } m-0.5 flex flex-col overflow-hidden ${
        colourVariants[preference.colour]
      } rounded px-3 py-2 hover:cursor-grab`}
    >
      {children}
    </div>
  );
}

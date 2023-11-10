"use client";
import { usePreview } from "~/contexts/PreviewContext";
import { Course, ColourPalette } from "~/lib/definitions";
function ClassCardClient({
  children,
  course,
}: {
  children: React.ReactNode;
  course: Course;
}) {
  const { activeCourse, setActiveCourse } = usePreview();
  const colourVariants = {
    0: "border-r-purple-400",
    1: "border-r-yellow-400",
    2: "border-r-orange-400",
    3: "border-r-red-400",
  };
  return (
    <div
      className={`flex w-72 flex-col gap-1 rounded-md border-r-[6.5px] p-5 py-2.5 shadow-sm hover:bg-stone-100 ${
        colourVariants[course.colour]
      } focus:ring-1 focus:ring-stone-200 active:bg-stone-100`}
      tabIndex={0}
      onClick={() => setActiveCourse(course)}
    >
      {children}
    </div>
  );
}

export default ClassCardClient;

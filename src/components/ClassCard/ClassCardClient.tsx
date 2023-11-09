'use client'
import { usePreview } from "~/contexts/PreviewContext";
import { Course } from "~/lib/definitions";
function ClassCardClient({
  children,
  course,
}: {
  children: React.ReactNode;
  course: Course;
}) {
    const {activeCourse, setActiveCourse} = usePreview();
  return (
    <div
      className={`flex w-72 flex-col gap-1 rounded-md border-r-8 p-5 py-2.5 shadow-sm hover:bg-stone-100 ${course.colour} focus:ring-1 focus:ring-stone-200 active:bg-stone-100`}
      tabIndex={0}
      onClick={() => setActiveCourse(course)}
    >
      {children}
    </div>
  );
}

export default ClassCardClient;

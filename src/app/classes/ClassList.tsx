"use client";
import { ClassCard } from "~/components";
import { CourseType } from "~/lib/definitions";
import { RetainLink } from "~/components";
import { usePreview } from "~/contexts/PreviewContext";
import { HiChevronRight } from "react-icons/hi2";
import { getCourseTypeString } from "~/lib/functions";
import { usePathname } from "next/navigation";

export default function ClassList() {
  const { courseData } = usePreview();
  const colourVariants = {
    0: "border-l-purple-400",
    1: "border-l-yellow-400",
    2: "border-l-orange-400",
    3: "border-l-red-400",
  };
  const segement = usePathname();

  return (
    <aside className="flex w-fit flex-col border-r py-1">
      {courseData.map((item) => {
        const active = segement.includes(
          `${item.courseCode}-${getCourseTypeString(item.type)}`,
        );
        return (
          <div
            key={item.courseCode + CourseType[item.type]}
            className="last:border-b-none border-b border-b-neutral-100 p-2.5 py-1"
          >
            <RetainLink
              href={`/classes/${item.courseCode}-${getCourseTypeString(
                item.type,
              )}`}
              className={`flex w-72 items-center justify-between rounded-md border-l-[6.5px] ${
                colourVariants[item.colour]
              } px-3 py-3 ${active ? "bg-neutral-50" : ""}
            hover:bg-neutral-100 active:bg-neutral-100`}
            >
              <div className="flex flex-col items-start justify-start gap-1">
                <ClassCard
                  key={item.courseCode + CourseType[item.type]}
                  course={item}
                />
              </div>
              <HiChevronRight />
            </RetainLink>
          </div>
        );
      })}
    </aside>
  );
}

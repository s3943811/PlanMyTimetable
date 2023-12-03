"use client";
import { ClassCard } from "~/components";
import { colourVariants } from "~/lib/definitions";
import { RetainLink } from "~/components";
import { usePreview } from "~/contexts/PreviewContext";
import { HiChevronRight } from "react-icons/hi2";
import { usePathname } from "next/navigation";

export default function ClassList() {
  const { courseData } = usePreview();
  const segement = usePathname();

  return (
    <aside className="flex w-fit flex-col border-r py-1 dark:border-r-neutral-700 dark:bg-neutral-900 dark:text-white">
      {courseData.map((item) => {
        const active = segement.includes(item.id);
        return (
          <div
            key={item.id}
            className="last:border-b-none border-b border-b-neutral-100 p-2.5 py-1 dark:border-b-neutral-700"
          >
            <RetainLink
              href={`/classes/${item.id}`}
              className={`flex w-72 items-center justify-between rounded-md border-l-[6.5px] ${
                colourVariants[item.colour]
              } px-3 py-3 ${active ? "bg-neutral-50 dark:bg-neutral-800" : ""}
            hover:bg-neutral-100 active:bg-neutral-100 dark:hover:bg-neutral-700 dark:focus:ring-neutral-700 dark:active:bg-neutral-600`}
            >
              <div className="flex flex-col items-start justify-start gap-1">
                <ClassCard key={item.id} course={item} />
              </div>
              <HiChevronRight />
            </RetainLink>
          </div>
        );
      })}
    </aside>
  );
}

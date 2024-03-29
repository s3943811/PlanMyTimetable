"use client";
import { usePreview } from "~/contexts/PreviewContext";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RetainLink } from "~/components";
import { buttonVariants } from "~/components";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { courseData } = usePreview();

  if (!courseData || courseData.length === 0) {
    return (
      <div className="flex h-[100dvh] grow flex-col items-center justify-center gap-3 ">
        <HiOutlineAcademicCap size={96} />
        <p>{`You haven't added any classes yet.`}</p>
        <RetainLink
          className={buttonVariants.normalLarge}
          href={"/classes/add"}
        >
          Add a class now
        </RetainLink>
      </div>
    );
  }

  return (
    <aside className="flex grow flex-col border-r dark:border-neutral-700 dark:bg-neutral-900 dark:text-white md:sticky md:top-0 md:h-screen md:min-h-screen">
      {children}
    </aside>
  );
}

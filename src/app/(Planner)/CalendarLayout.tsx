"use client";

import { usePreview } from "~/contexts/PreviewContext";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { courseData } = usePreview();

  return (
    <section
      className={`${
        courseData.length !== 0 ? "flex" : "hidden"
      } w-full grow flex-col`}
    >
      {children}
    </section>
  );
}

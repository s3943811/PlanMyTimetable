"use client";

import { usePreview } from "~/contexts/PreviewContext";
import { FriendProvider } from "~/contexts/FriendContext";

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
      <FriendProvider>{children}</FriendProvider>
    </section>
  );
}

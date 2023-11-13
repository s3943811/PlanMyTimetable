"use client";
import { usePreview } from "~/contexts/PreviewContext";
import Badge from "../Badge/Badge";
import { CourseType } from "~/lib/definitions";
import { HiOutlineX } from "react-icons/hi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Toolbar() {
  const { events } = usePreview();
  return (
    <div
      className={`flex h-fit flex-row gap-2 border-b  border-b-neutral-200/60 p-2`}
    >
      {events.map((event, index) => (
        <Badge
          key={event.courseCode + event.type}
          className="items-center gap-1 bg-blue-200 text-xs text-blue-900"
        >
          {`${event.title} - ${CourseType[event.type]}`}
          <Remove index={index} />
        </Badge>
      ))}
    </div>
  );
}

function Remove({ index }: { index: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setEvents, events } = usePreview();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleRemove = () => {
    const newEvents = events.toSpliced(index, 1);

    const newPrefs = newEvents.map((element) => {
      return createQueryString(
        "pref",
        encodeURIComponent(JSON.stringify(element)),
      );
    });
    router.replace(`${pathname}?${newPrefs.join("&")}`, { scroll: false });
    setEvents(newEvents);
  };
  return (
    <button
      className="flex items-center rounded-3xl p-[0.175rem] hover:bg-blue-50/60"
      onClick={handleRemove}
    >
      <HiOutlineX size={13} />
    </button>
  );
}

"use client";
import { usePreview } from "~/contexts/PreviewContext";
import Badge from "../Badge/Badge";
import { ColourPalette, CourseType } from "~/lib/definitions";
import { HiOutlineX, HiChevronUp, HiChevronDown } from "react-icons/hi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Popover } from "react-tiny-popover";
import { useState } from "react";
import { ClassListData } from "~/data/data";
import { ClearPreferences } from "..";

export default function AllocatedPopover() {
  const colourVariants = {
    0: "bg-purple-200 text-purple-900 text-xs ",
    1: "bg-yellow-200 text-yellow-900 text-xs",
    2: "bg-orange-200 text-orange-900 text-xs",
    3: "bg-red-200 text-red-900 text-xs",
  };
  const { events } = usePreview();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`flex max-w-full flex-col items-center gap-2 border-t border-t-neutral-200/60 p-2`}
    >
      <Popover
        isOpen={isOpen}
        positions={["top"]}
        padding={10}
        onClickOutside={() => setIsOpen(false)}
        content={
          <div className="flex w-[17rem] flex-col items-center gap-1 rounded-lg border bg-white p-3 shadow-lg">
            {events.length === 0 ? (
              <p className="text-sm">
                Nothing allocated. To allocate a course drag it onto a event in
                the calendar.
              </p>
            ) : (
              <>
                {events.map((event, index) => (
                  <Badge
                    key={event.courseCode + event.type}
                    className={`${
                      colourVariants[event.colour]
                    } items-center gap-1`}
                  >
                    {`${event.title} - ${CourseType[event.type]}`}
                    <Remove index={index} colour={event.colour} />
                  </Badge>
                ))}
                <ClearPreferences setIsOpen={setIsOpen} />
              </>
            )}
          </div>
        }
      >
        <button
          className="ring-offset-background mt-1 inline-flex h-8 w-fit items-center justify-center  whitespace-nowrap rounded-md border border-neutral-200 px-4 py-2 font-medium hover:bg-neutral-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {events.length}/{ClassListData.length} Allocated{" "}
          {isOpen ? <HiChevronDown /> : <HiChevronUp />}
        </button>
      </Popover>
    </div>
  );
}

function Remove({ index, colour }: { index: number; colour: ColourPalette }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const colourVariants = {
    0: "hover:bg-purple-50/60 ",
    1: "hover:bg-yellow-50/60",
    2: "hover:bg-orange-50/60",
    3: "hover:bg-red-50/60",
  };

  const { events } = usePreview();

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
  };
  return (
    <button
      className={`p-[0.2rem flex items-center rounded-3xl ${colourVariants[colour]}`}
      onClick={handleRemove}
    >
      <HiOutlineX size={14} />
    </button>
  );
}

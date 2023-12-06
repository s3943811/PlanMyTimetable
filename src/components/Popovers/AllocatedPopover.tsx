"use client";
import { usePreview } from "~/contexts/PreviewContext";
import Badge from "../Badge/Badge";
import { CourseType } from "~/lib/definitions";
import type { ColourPalette } from "~/lib/definitions";
import { HiOutlineX, HiChevronUp, HiChevronDown } from "react-icons/hi";
import type { SetStateAction } from "react";
import { Popover } from "react-tiny-popover";
import { useState } from "react";
import { Button, ClearPreferences } from "..";
import { useUrlState } from "~/hooks/useUrlState";

export default function AllocatedPopover() {
  const colourVariants = {
    0: "bg-purple-200 text-purple-900 text-xs dark:text-purple-200 dark:bg-purple-900",
    1: "bg-yellow-200 text-yellow-900 text-xs dark:text-yellow-200 dark:bg-yellow-900 ",
    2: "bg-orange-200 text-orange-900 text-xs dark:text-orange-200 dark:bg-orange-900",
    3: "bg-red-200 text-red-900 text-xs dark:text-red-200 dark:bg-red-900",
    4: "bg-green-200 text-green-900 text-xs dark:text-green-200 dark:bg-green-900",
    5: "bg-teal-200 text-teal-900 text-xs dark:text-teal-200 dark:bg-teal-900",
    6: "bg-blue-200 text-blue-900 text-xs dark:text-blue-200 dark:bg-blue-900",
    7: "bg-fuchsia-200 text-fuchsia-900 text-xs dark:text-fuchsia-200 dark:bg-fuchsia-900",
    8: "bg-pink-200 text-pink-900 text-xs dark:text-pink-200 dark:bg-pink-900",
  };
  const { events, courseData } = usePreview();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`sticky bottom-0 flex h-16 max-w-full flex-col items-center gap-2 border-t bg-white p-2 py-4 dark:border-t-neutral-700 dark:bg-neutral-900`}
    >
      <Popover
        isOpen={isOpen}
        positions={["top"]}
        padding={10}
        onClickOutside={() => setIsOpen(false)}
        content={
          <div className="flex w-[17rem] flex-col items-center gap-1 rounded-lg border bg-white p-3 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
            {events.length === 0 ? (
              <p className="text-sm dark:text-white">
                To allocate a course drag it onto a event in the calendar.
              </p>
            ) : (
              <>
                {events.map((event, index) => (
                  <Badge
                    key={event.courseCode + event.type}
                    className={`${
                      colourVariants[event.colour]
                    } w-full items-center justify-between gap-1`}
                  >
                    {`${event.title} - ${CourseType[event.type]}`}
                    <Remove
                      index={index}
                      colour={event.colour}
                      setIsOpen={setIsOpen}
                    />
                  </Badge>
                ))}
                <ClearPreferences setIsOpen={setIsOpen} />
              </>
            )}
          </div>
        }
      >
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {events.length}/{courseData?.length ?? 0} Allocated{" "}
          {isOpen ? <HiChevronDown /> : <HiChevronUp />}
        </Button>
      </Popover>
    </div>
  );
}

function Remove({
  index,
  colour,
  setIsOpen,
}: {
  index: number;
  colour: ColourPalette;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}) {
  const colourVariants = {
    0: "hover:bg-purple-50/60 dark:hover:bg-purple-600",
    1: "hover:bg-yellow-50/60 dark:hover:bg-yellow-600",
    2: "hover:bg-orange-50/60 dark:hover:bg-orange-600",
    3: "hover:bg-red-50/60 dark:hover:bg-red-600",
    4: "hover:bg-green-50/60 dark:hover:bg-green-600",
    5: "hover:bg-teal-50/60 dark:hover:bg-teal-600",
    6: "hover:bg-blue-50/60 dark:hover:bg-blue-600",
    7: "hover:bg-fuchsia-50/60 dark:hover:bg-fuchsia-600",
    8: "hover:bg-pink-50/60 dark:hover:bg-pink-600",
  };

  const { events } = usePreview();
  const { replaceState } = useUrlState();

  const handleRemove = () => {
    const newEvents = events.toSpliced(index, 1);
    replaceState(newEvents, "pref");
    setIsOpen(newEvents.length !== 0);
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

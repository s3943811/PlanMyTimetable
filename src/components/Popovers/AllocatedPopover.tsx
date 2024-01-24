"use client";
import { usePreview } from "~/contexts/PreviewContext";
import Badge from "../Badge/Badge";
import { CourseType } from "~/lib/definitions";
import type { ColourPalette, Preference } from "~/lib/definitions";
import { HiOutlineX, HiChevronUp, HiChevronDown } from "react-icons/hi";
import type { SetStateAction } from "react";
import { Popover } from "react-tiny-popover";
import { useMemo, useState } from "react";
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

  const nonGroupedEvents = useMemo(() => {
    // Find the first preference that matches the pattern
    const firstPreference = events.find((event) => {
      if (event.grouped) {
        const firstTwoDigits = event.grouped_code.slice(0, 2);
        const pattern = new RegExp(`^${firstTwoDigits}-P[1-9]$`);
        return pattern.test(event.grouped_code);
      }
      return false;
    });

    // Filter out the first preference and all other preferences that match the pattern or have a different id
    const otherPreferences = events.filter((event) => {
      if (event.grouped) {
        const firstTwoDigits = event.grouped_code.slice(0, 2);
        const pattern = new RegExp(`^${firstTwoDigits}-P[1-9]$`);
        return (
          !pattern.test(event.grouped_code) || event.id !== firstPreference?.id
        );
      }
      return true;
    });

    return firstPreference
      ? [firstPreference, ...otherPreferences.flat()]
      : [...otherPreferences.flat()];
  }, [events]);
  return (
    <Popover
      isOpen={isOpen}
      positions={["top", "bottom"]}
      padding={10}
      containerClassName="z-[999]"
      onClickOutside={() => setIsOpen(false)}
      content={
        <div className="flex w-[17rem] flex-col items-center gap-1 rounded-lg border bg-white p-3 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
          {nonGroupedEvents.length === 0 ? (
            <p className="text-sm dark:text-white">
              To allocate a course drag it onto a event in the calendar.
            </p>
          ) : (
            <>
              {nonGroupedEvents.map((event, index) => (
                <Badge
                  key={event.id + (event.grouped ? event.grouped_code : "")}
                  className={`${
                    colourVariants[event.colour]
                  } w-full items-center justify-between gap-1`}
                >
                  {`${event.title} - ${CourseType[event.type]}`}
                  {event.grouped ? (
                    <Remove
                      grouped
                      group_code={event.grouped_code}
                      colour={event.colour}
                      setIsOpen={setIsOpen}
                    />
                  ) : (
                    <Remove
                      grouped={false}
                      index={index}
                      colour={event.colour}
                      setIsOpen={setIsOpen}
                    />
                  )}
                </Badge>
              ))}
              <ClearPreferences setIsOpen={setIsOpen} />
            </>
          )}
        </div>
      }
    >
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        data-umami-event="open allocated popover"
      >
        {nonGroupedEvents.length}/{courseData?.length ?? 0} Allocated&nbsp;
        {isOpen ? <HiChevronDown /> : <HiChevronUp />}
      </Button>
    </Popover>
  );
}

type RemoveProps =
  | {
      grouped: false;
      index: number;
      colour: ColourPalette;
      setIsOpen: (value: SetStateAction<boolean>) => void;
    }
  | {
      grouped: true;
      colour: ColourPalette;
      setIsOpen: (value: SetStateAction<boolean>) => void;
      group_code: string;
    };

function Remove(props: RemoveProps) {
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

  /**
   * If a grouped event find all the ones that match that regex and filter for the ones that don't
   */
  const handleRemove = () => {
    let newEvents: Preference[];
    if (!props.grouped) {
      newEvents = events.toSpliced(props.index, 1);
    } else {
      newEvents = events.filter(
        (item) =>
          !(
            item.grouped &&
            item.grouped_code.match(
              new RegExp(`^${props.group_code.slice(0, 2)}-P[1-9]$`),
            )
          ),
      );
    }
    replaceState(newEvents, "pref");
    props.setIsOpen(newEvents.length !== 0);
  };
  return (
    <button
      className={`p-[0.2rem flex items-center rounded-3xl ${
        colourVariants[props.colour]
      }`}
      onClick={handleRemove}
      data-umami-event="remove class"
    >
      <HiOutlineX size={14} />
    </button>
  );
}

"use client";
import { usePreview } from "~/contexts/PreviewContext";
import { getDayEnum, getRowIndex } from "~/lib/functions";
import { Duration, DateTime } from "luxon";

export default function BlockedEventList() {
  const { blockedEvents } = usePreview();
  return blockedEvents.map((blocked) => {
    let endTime = DateTime.fromFormat(blocked.start, "HH:mm");
    const duration = Duration.fromObject({ minutes: blocked.duration });
    endTime = endTime.plus(duration);
    const col = getDayEnum(blocked.day) + 2;
    const row = getRowIndex(blocked.start);
    const rowSpan = blocked.duration / 30;

    return (
      <div
        key={blocked.id}
        style={{
          gridRowEnd: `span ${rowSpan}`,
          gridColumnStart: `${col}`,
          gridRowStart: `${row}`,
        }}
        className="m-1 flex-wrap items-center justify-center gap-2 overflow-clip hyphens-auto rounded border border-l-[7px] bg-neutral-100 px-3 py-2 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
      >
        <p className="line-clamp-6 text-sm font-medium tracking-tight xl:text-base">
          {blocked.name}
        </p>
        <p className="whitespace-pre-wrap text-xs font-normal tracking-tighter sm:whitespace-nowrap md:text-sm lg:whitespace-normal">
          {blocked.start} - {endTime.toFormat("HH:mm")}
        </p>
      </div>
    );
  });
}

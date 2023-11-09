"use client";
import { usePreview } from "~/contexts/PreviewContext";
import { Days } from "~/lib/definitions";
import { compareDays, convertTimeToIndex } from "~/lib/functions";
import { useEffect, useState } from "react";
function TimeSlot({
  index,
  previewSlots,
}: {
  index: number;
  previewSlots: Array<number>;
}) {
  return (
    <div
      className={`h-7 hover:bg-stone-50 ${
        !previewSlots.includes(index) ? "" : "bg-stone-100"
      }`}
    ></div>
  );
}

export default function DayGrid({ day }: { day: Days }) {
  const timeSlots = [];
  const { activeCourse } = usePreview();
  const [avaliableSlots, setAvaliableSlots] = useState<Array<number>>([]);

  useEffect(() => {
    function findGridElements() {
      const optionsToday = activeCourse?.options.filter((option) =>
        compareDays(option.day, day),
      );
      setAvaliableSlots(
        optionsToday
          ?.map((slot) => convertTimeToIndex(slot.start, slot.duration))
          .flat() || [],
      );
    }
    findGridElements();
  }, [activeCourse, day]);

  for (let i = 0; i < 48; i++) {
    timeSlots.push(
      <TimeSlot key={i} index={i} previewSlots={avaliableSlots} />,
    );
  }
  return (
    <div className="grid w-full grid-rows-48 divide-y border-b border-r">
      {timeSlots}
    </div>
  );
}

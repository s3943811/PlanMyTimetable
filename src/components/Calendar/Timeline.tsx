import React from "react";
import { getTimes } from "~/lib/functions";

export default function Timeline() {
  const times: Array<string> = getTimes();
  return (
    <div className="flex h-full w-16 flex-col border-r">
      <div className="sticky top-0 w-full border-b bg-stone-50 pb-2">
        <h3 className="invisible text-lg font-semibold">Times</h3>
      </div>
      <div className="h-full divide-y border-b">
        {times.map((time: string) => (
          <p className={`h-14 text-center text-xs `} key={time}>
            {time}
          </p>
        ))}
      </div>
    </div>
  );
}

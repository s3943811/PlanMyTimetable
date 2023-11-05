import React from "react";
import { getTimes } from "~/lib/functions";

export default function Timeline() {
    const times: Array<string> = getTimes();
    return (
        <div className="flex flex-col h-full w-16 border-r">
            <div className="pb-2 sticky top-0 w-full bg-stone-50 border-b">
                <h3 className="text-lg font-semibold invisible">Times</h3>
            </div>
            <div className="divide-y border-b h-full">
                {times.map((time: string) => (
                    <p className={`text-xs h-14 text-center `} key={time}>{time}</p>
                ))}
            </div>
        </div>
    );
}

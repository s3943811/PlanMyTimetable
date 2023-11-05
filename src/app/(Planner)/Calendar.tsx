import React from "react";
import { getTimes } from "~/lib/functions";

function Calendar() {
    return (
        <section className="grow flex flex-row w-full">
            <Timeline/>
            <div id="calendar" className="grid grid-cols-5 w-full">
                <Day day="Monday"><DayGrid/></Day>
                <Day day="Tuesday"><DayGrid/></Day>
                <Day day="Wednesday"><DayGrid/></Day>
                <Day day="Thursday"><DayGrid/></Day>
                <Day day="Friday"><DayGrid/></Day>
            </div>

        </section>
    )
}

function Day({day, children}: {day: string, children: React.ReactNode}) {
    return (
        <div className="flex flex-col items-center">
            <div className="pb-2 sticky top-0 w-full bg-stone-50 border-b">
                <h3 className="text-lg font-semibold text-center">{day}</h3>
            </div>
            {children}
        </div>
    )

}

function Timeline() {
    const times: Array<string> = getTimes();
    return (
        <div className="flex flex-col h-full w-16 border-r"> 
            <div className="pb-2 sticky top-0 w-full bg-stone-50 border-b">
                <h3 className="text-lg font-semibold invisible">Times</h3>
            </div>
            <div className="divide-y border-b h-full">
                {times.map((time: string) => (
                    <p className={`text-xs h-7 ${time.includes(':30') ? 'invisible' : ''}`} key={time}>{time}</p>
                ))}
            </div>
        </div>
    )
}

function DayGrid() {
    const timeSlots = [];
    for (let i = 0; i < 48; i++) {
        timeSlots.push(<TimeSlot key={i} />);
    }
    return (
        <div className="grid grid-rows-48 divide-y w-full border-r border-b">{timeSlots}</div>
    )
}

function TimeSlot() {
    return <div className="h-7 hover:bg-stone-100"></div>
}

export default Calendar;
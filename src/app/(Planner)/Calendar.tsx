import React from "react";
import { Timeline, Day, DayGrid } from "~/components";

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

export default Calendar;
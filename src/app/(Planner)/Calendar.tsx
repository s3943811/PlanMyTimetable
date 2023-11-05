import React from "react";
import { Timeline, Day, DayGrid } from "~/components";

function Calendar() {
  return (
    <section className="flex w-full grow flex-row">
      <Timeline />
      <div id="calendar" className="grid w-full grid-cols-5">
        <Day day="Monday">
          <DayGrid />
        </Day>
        <Day day="Tuesday">
          <DayGrid />
        </Day>
        <Day day="Wednesday">
          <DayGrid />
        </Day>
        <Day day="Thursday">
          <DayGrid />
        </Day>
        <Day day="Friday">
          <DayGrid />
        </Day>
      </div>
    </section>
  );
}

export default Calendar;

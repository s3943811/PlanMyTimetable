import React from "react";
import { Timeline, Planner } from "~/components";

function Calendar() {
  return (
    <section className="flex w-full grow flex-row">
      {/* <Timeline /> */}
      <Planner />
    </section>
  );
}

export default Calendar;

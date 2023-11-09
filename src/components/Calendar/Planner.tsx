import Day from "./Day";
import DayGrid from "./DayGrid";
import { Days } from "~/lib/definitions";
function Planner() {
  return (
    <div id="calendar" className="grid w-full grid-cols-5">
      <Day day={Days[0]!}>
        <DayGrid day={Days.Monday} />
      </Day>
      <Day day={Days[1]!}>
        <DayGrid day={Days.Tuesday} />
      </Day>
      <Day day={Days[2]!}>
        <DayGrid day={Days.Wednesday} />
      </Day>
      <Day day={Days[3]!}>
        <DayGrid day={Days.Thursday} />
      </Day>
      <Day day={Days[4]!}>
        <DayGrid day={Days.Friday} />
      </Day>
    </div>
  );
}

export default Planner;

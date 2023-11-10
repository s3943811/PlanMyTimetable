import Day from "./Day";
import DayGrid from "./DayGrid";
import { Days } from "~/lib/definitions";
import React from "react";
// function Planner() {
//   return (
//     <div id="calendar" classNameName="grid w-full grid-cols-5">
//       <Day day={Days[0]!}>
//         <DayGrid day={Days.Monday} />
//       </Day>
//       <Day day={Days[1]!}>
//         <DayGrid day={Days.Tuesday} />
//       </Day>
//       <Day day={Days[2]!}>
//         <DayGrid day={Days.Wednesday} />
//       </Day>
//       <Day day={Days[3]!}>
//         <DayGrid day={Days.Thursday} />
//       </Day>
//       <Day day={Days[4]!}>
//         <DayGrid day={Days.Friday} />
//       </Day>
//     </div>
//   );
// }
function TimeSlot({ col, row }: { col: number; row: number }) {
  const colStart = `col-start-[${col}]`;
  const rowStart = `row-start-[${row}]`;
  return (
    <div
      className={`${colStart} ${rowStart} border-b border-r border-slate-100 `}
    ></div>
  );
}
function Header() {
  return (
    <>
      <div className="h-18 sticky top-0 z-10 col-start-[1] row-start-[1] border-b border-r border-slate-100 bg-white bg-clip-padding py-2 text-sm font-medium text-slate-900"></div>
      <div className="text-md sticky top-0 z-10 col-start-[2] row-start-[1] border-b border-slate-100 bg-white bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Monday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[3] row-start-[1] border-b border-slate-100 bg-white bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Tuesday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[4] row-start-[1] border-b border-slate-100 bg-white bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Wednesday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[5] row-start-[1] border-b border-slate-100 bg-white bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Thursday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[6] row-start-[1] border-b border-slate-100 bg-white bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Friday
      </div>
    </>
  );
}
export default function Planner() {
  return (
    <div className="grid w-full grid-cols-[auto,repeat(5,1fr)] grid-rows-[2.5rem,repeat(38,50px)]">
      <Header />
      {/* <div className="sticky left-0 col-start-[1] row-start-[2] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400 ">
        5 AM
      </div>
      <TimeSlot col={2} row={2} />
      <TimeSlot col={3} row={2} />
      <TimeSlot col={4} row={2} />
      <TimeSlot col={5} row={2} />
      <TimeSlot col={6} row={2} />
      <div className="sticky left-0 col-start-[1] row-start-[3] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <TimeSlot col={2} row={3} />
      <TimeSlot col={3} row={3} />
      <TimeSlot col={4} row={3} />
      <TimeSlot col={5} row={3} />
      <TimeSlot col={6} row={3} />
      <div className="sticky left-0 col-start-[1] row-start-[4] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400 ">
        6 AM
      </div>
      <TimeSlot col={2} row={4} />
      <TimeSlot col={3} row={4} />
      <TimeSlot col={4} row={4} />
      <TimeSlot col={5} row={4} />
      <TimeSlot col={6} row={4} /> */}
      {Array.from({ length: 38 }, (_, index) => (
        <React.Fragment key={index}>
          <div
            className={`sticky left-0 col-start-[1] ${
              "row-start-[" + [2 + index] + "]"
            } border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400`}
          >
            {index % 2 !== 1 && `${index / 2 + 5}:00`}
          </div>
          <TimeSlot col={2} row={2 + index} />
          <TimeSlot col={3} row={2 + index} />
          <TimeSlot col={4} row={2 + index} />
          <TimeSlot col={5} row={2 + index} />
          <TimeSlot col={6} row={2 + index} />
        </React.Fragment>
      ))}
    </div>
  );
}

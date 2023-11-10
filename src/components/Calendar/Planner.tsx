import Day from "./Day";
import DayGrid from "./DayGrid";
import { Days } from "~/lib/definitions";
import { Event } from "~/components";
import { ClassListData } from "~/data/data";
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
//   );\
// }
{
  /* <div className="sticky left-0 col-start-[1] row-start-[2] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400 ">
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
      <TimeSlot col={6} row={4} /> */
}
function TimeSlot({ col, row }: { col: number; row: number }) {
  const colStart = `col-start-[${col}]`;
  const rowStart = `row-start-[${row}]`;
  return (
    <div
      className={`${colStart} ${rowStart} border-b border-r border-slate-100`}
    ></div>
  );
}
function Header() {
  return (
    <>
      <div className="sticky top-0 z-10 col-start-[1] row-start-[1] border-b border-r border-slate-100 bg-stone-50 bg-clip-padding py-2 text-sm font-medium text-slate-900"></div>
      <div className="text-md sticky top-0 z-10 col-start-[2] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Monday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[3] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Tuesday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[4] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Wednesday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[5] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Thursday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[6] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900 ">
        Friday
      </div>
    </>
  );
}
// export default function Planner() {
//   return (
//     <div className="grid w-full grid-cols-[auto,repeat(5,1fr)] grid-rows-[2.5rem,repeat(38,50px)]">
//       <Header />
//       {Array.from({ length: 38 }, (_, index) => (
//         <React.Fragment key={index}>
//           <div
//             className={`sticky left-0 col-start-[1] ${
//               "row-start-[" + [2 + index] + "]"
//             } border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400`}
//           >
//             {index % 2 !== 1 && `${index / 2 + 5}:00`}
//           </div>
//           <TimeSlot col={2} row={2 + index} />
//           <TimeSlot col={3} row={2 + index} />
//           <TimeSlot col={4} row={2 + index} />
//           <TimeSlot col={5} row={2 + index} />
//           <TimeSlot col={6} row={2 + index} />
//         </React.Fragment>
//       ))}
//       {/* <Event
//         title={ClassListData[2]?.title!}
//         type={ClassListData[2]?.type!}
//         colour={ClassListData[2]?.colour!}
//         time={ClassListData[2]?.options[0]!}
//       /> */}
//     </div>
//   );
// }
export default function Planner() {
  return (
    <div className="grid w-full grid-cols-[auto,repeat(5,1fr)] grid-rows-[auto,repeat(38,50px)]">
      <div className="sticky top-0 z-10 col-start-[1] row-start-[1] border-b border-r border-slate-100 bg-stone-50 bg-clip-padding py-2 text-sm font-medium text-slate-900"></div>
      <div className="text-md sticky top-0 z-10 col-start-[2] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900">
        Monday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[3] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900">
        Tuesday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[4] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900">
        Wednesday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[5] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900">
        Thursday
      </div>
      <div className="text-md sticky top-0 z-10 col-start-[6] row-start-[1] border-b border-slate-100 bg-stone-50 bg-clip-padding py-2 text-center font-medium text-slate-900">
        Friday
      </div>
      <div className="sticky left-0 col-start-[1] row-start-[2] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        5:00
      </div>
      <div className="col-start-[2] row-start-[2] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[2] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[2] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[2] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[2] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[3] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[3] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[3] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[3] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[3] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[3] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[4] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        6:00
      </div>
      <div className="col-start-[2] row-start-[4] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[4] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[4] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[4] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[4] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[5] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[5] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[5] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[5] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[5] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[5] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[6] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        7:00
      </div>
      <div className="col-start-[2] row-start-[6] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[6] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[6] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[6] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[6] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[7] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[7] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[7] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[7] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[7] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[7] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[8] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        8:00
      </div>
      <div className="col-start-[2] row-start-[8] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[8] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[8] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[8] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[8] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[9] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[9] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[9] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[9] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[9] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[9] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[10] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        9:00
      </div>
      <div className="col-start-[2] row-start-[10] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[10] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[10] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[10] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[10] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[11] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[11] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[11] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[11] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[11] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[11] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[12] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        10:00
      </div>
      <div className="col-start-[2] row-start-[12] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[12] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[12] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[12] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[12] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[13] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[13] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[13] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[13] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[13] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[13] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[14] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        11:00
      </div>
      <div className="col-start-[2] row-start-[14] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[14] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[14] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[14] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[14] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[15] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[15] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[15] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[15] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[15] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[15] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[16] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        12:00
      </div>
      <div className="col-start-[2] row-start-[16] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[16] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[16] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[16] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[16] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[17] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[17] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[17] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[17] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[17] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[17] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[18] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        13:00
      </div>
      <div className="col-start-[2] row-start-[18] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[18] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[18] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[18] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[18] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[19] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[19] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[19] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[19] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[19] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[19] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[20] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        14:00
      </div>
      <div className="col-start-[2] row-start-[20] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[20] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[20] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[20] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[20] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[21] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[21] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[21] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[21] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[21] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[21] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[22] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        15:00
      </div>
      <div className="col-start-[2] row-start-[22] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[22] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[22] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[22] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[22] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[23] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[23] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[23] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[23] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[23] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[23] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[24] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        16:00
      </div>
      <div className="col-start-[2] row-start-[24] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[24] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[24] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[24] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[24] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[25] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[25] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[25] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[25] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[25] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[25] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[26] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        17:00
      </div>
      <div className="col-start-[2] row-start-[26] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[26] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[26] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[26] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[26] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[27] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[27] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[27] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[27] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[27] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[27] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[28] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        18:00
      </div>
      <div className="col-start-[2] row-start-[28] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[28] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[28] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[28] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[28] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[29] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[29] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[29] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[29] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[29] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[29] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[30] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        19:00
      </div>
      <div className="col-start-[2] row-start-[30] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[30] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[30] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[30] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[30] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[31] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[31] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[31] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[31] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[31] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[31] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[32] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        20:00
      </div>
      <div className="col-start-[2] row-start-[32] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[32] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[32] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[32] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[32] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[33] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[33] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[33] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[33] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[33] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[33] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[34] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        21:00
      </div>
      <div className="col-start-[2] row-start-[34] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[34] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[34] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[34] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[34] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[35] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[35] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[35] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[35] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[35] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[35] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[36] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        22:00
      </div>
      <div className="col-start-[2] row-start-[36] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[36] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[36] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[36] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[36] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[37] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[37] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[37] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[37] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[37] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[37] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[38] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400">
        23:00
      </div>
      <div className="col-start-[2] row-start-[38] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[38] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[38] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[38] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[38] border-b border-r border-slate-100"></div>
      <div className="sticky left-0 col-start-[1] row-start-[39] border-r border-slate-100 bg-white p-1.5 text-right text-xs font-medium uppercase text-slate-400"></div>
      <div className="col-start-[2] row-start-[39] border-b border-r border-slate-100"></div>
      <div className="col-start-[3] row-start-[39] border-b border-r border-slate-100"></div>
      <div className="col-start-[4] row-start-[39] border-b border-r border-slate-100"></div>
      <div className="col-start-[5] row-start-[39] border-b border-r border-slate-100"></div>
      <div className="col-start-[6] row-start-[39] border-b border-r border-slate-100"></div>

      <Event
        title={ClassListData[2]?.title!}
        type={ClassListData[2]?.type!}
        colour={ClassListData[2]?.colour!}
        time={ClassListData[2]?.options[0]!}
      />
    </div>
  );
}

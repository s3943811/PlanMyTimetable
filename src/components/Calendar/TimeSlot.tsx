import React from "react";

export default function TimeSlot({ col, row }: { col: number; row: number }) {
  return (
    <div
      style={{
        gridColumnStart: `${col}`,
        gridRowStart: `${row}`,
      }}
      className={`border-b border-r border-slate-100`}
    ></div>
  );
}

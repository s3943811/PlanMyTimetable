import React from "react";

export default function TimeSlot({ col, row }: { col: number; row: number }) {
  return (
    <div
      style={{
        gridColumnStart: `${col}`,
        gridRowStart: `${row}`,
      }}
      className={`border-b border-r border-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 `}
    ></div>
  );
}

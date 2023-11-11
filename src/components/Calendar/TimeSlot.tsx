import { colStart, rowStart } from "~/lib/definitions";
import React from "react";

export default function TimeSlot({ col, row }: { col: number; row: number }) {
  return (
    <div
      className={`${colStart[col]} ${rowStart[row]} border-b border-r border-slate-100`}
    ></div>
  );
}

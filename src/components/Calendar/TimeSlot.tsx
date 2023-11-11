import { TimeSlotVariant, colStart, rowStart } from "~/lib/definitions";
import React from "react";

export default function TimeSlot({
  col,
  row,
  variantType,
}: {
  col: number;
  row: number;
  variantType: TimeSlotVariant;
}) {
  const variant: Record<TimeSlotVariant, string> = {
    0: "bg-inherit",
    1: "border-stone-300/80 bg-stone-300/50",
  };
  return (
    <div
      className={`${colStart[col]} ${rowStart[row]} border-b border-r  ${variant[variantType]}`}
    ></div>
  );
}

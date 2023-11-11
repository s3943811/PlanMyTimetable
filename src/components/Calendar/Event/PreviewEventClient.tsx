"use client";

import { usePreview } from "~/contexts/PreviewContext";
import { colStart, rowStart, rowSpans, Time } from "~/lib/definitions";
import { getDayEnum, getRowIndex } from "~/lib/functions";

export default function PreviewEventClient() {
  const { activeCourse } = usePreview();

  return activeCourse?.options.map((time: Time) => (
    <PreviewEvent time={time} />
  ));
}

function PreviewEvent({ time }: { time: Time }) {
  const rowSpan: number = time.duration / 30;
  return (
    <div
      className={`${colStart[getDayEnum(time.day)! + 2]} ${
        rowStart[getRowIndex(time.start)]
      } ${
        rowSpans[rowSpan]
      } m-0.5 rounded border-[0.18rem] border-dashed bg-slate-300/20  px-3 py-2`}
    ></div>
  );
}

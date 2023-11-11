import { colStart, rowStart, rowSpans, Time } from "~/lib/definitions";
import { getDayEnum, getRowIndex } from "~/lib/functions";

export default function PreviewEvent({ time }: { time: Time }) {
  const rowSpan: number = time.duration / 30;
  return (
    <div
      className={`${colStart[getDayEnum(time.day)! + 2]} ${
        rowStart[getRowIndex(time.start)]
      } ${
        rowSpans[rowSpan]
      } m-0.5 rounded border-[0.18rem] border-dashed bg-white/80 px-3 py-2`}
    ></div>
  );
}

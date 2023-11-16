import Link from "next/link";
export default function Page() {
  return (
    <div>
      <div className="mt-1 inline-flex h-10 w-fit items-center justify-center gap-3 rounded-lg text-sm">
        <Link
          href="/classes/add"
          className={`inline-flex w-full items-center justify-center rounded-md py-1.5 font-medium underline decoration-[1.5px] underline-offset-[7px] transition-all`}
        >
          Automatic
        </Link>
        <span>/</span>
        <Link
          href="/classes/add/manual"
          className={`inline-flex w-full items-center justify-center rounded-md py-1.5 pr-3 font-light text-neutral-500/90 transition-all`}
        >
          <p>Manual</p>
        </Link>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className=" my-4 h-[1px] w-full shrink-0 bg-neutral-200"
      ></div>
      <h3>Automatically gather timetable information?</h3>
    </div>
  );
}

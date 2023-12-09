export default function CalendarHeader() {
  return (
    <>
      <div className="sticky top-0 z-50 col-start-[1] row-start-[1] border-b border-r border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-sm font-medium text-slate-900"></div>
      <div className="sticky top-0 z-50 col-start-[2] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-slate-900 ">
        Monday
      </div>
      <div className="sticky top-0 z-50 col-start-[3] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-slate-900 ">
        Tuesday
      </div>
      <div className="sticky top-0 z-50 col-start-[4] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-slate-900 ">
        Wednesday
      </div>
      <div className="sticky top-0 z-50 col-start-[5] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-slate-900 ">
        Thursday
      </div>
      <div className="sticky top-0 z-50 col-start-[6] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-slate-900 ">
        Friday
      </div>
    </>
  );
}

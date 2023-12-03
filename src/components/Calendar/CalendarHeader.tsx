export default function CalendarHeader() {
  return (
    <>
      <div className="sticky top-0 z-50 col-start-[1] row-start-[1] border-b border-r border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-sm font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"></div>
      <div className="sticky top-0 z-50 col-start-[2] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        Monday
      </div>
      <div className="sticky top-0 z-50 col-start-[3] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 ">
        Tuesday
      </div>
      <div className="sticky top-0 z-50 col-start-[4] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 ">
        Wednesday
      </div>
      <div className="sticky top-0 z-50 col-start-[5] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 ">
        Thursday
      </div>
      <div className="sticky top-0 z-50 col-start-[6] row-start-[1] border-b border-neutral-100 bg-neutral-50/50 bg-clip-padding py-2 text-center text-base font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 ">
        Friday
      </div>
    </>
  );
}

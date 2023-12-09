export default function CalendarHeader() {
  return (
    <>
      <div className="sticky top-12 z-50 col-start-[1] row-start-[1] border-b border-r border-neutral-100 bg-neutral-50 bg-clip-padding py-2 text-sm font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 md:top-0"></div>
      <span className="sticky top-12 z-50 col-start-[2] row-start-[1] border-b border-neutral-100 bg-neutral-50 bg-clip-padding py-2 text-center text-sm font-medium text-neutral-900 after:content-['Mon'] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 sm:text-base sm:after:content-['Monday'] md:top-0"></span>
      <span className="sticky top-12 z-50 col-start-[3] row-start-[1] border-b border-neutral-100 bg-neutral-50 bg-clip-padding py-2 text-center text-sm font-medium text-neutral-900 after:content-['Tue'] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 sm:text-base sm:after:content-['Tuesday'] md:top-0"></span>
      <span className="sticky top-12 z-50 col-start-[4] row-start-[1] border-b border-neutral-100 bg-neutral-50 bg-clip-padding py-2 text-center text-sm font-medium text-neutral-900 after:content-['Wed'] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 sm:text-base sm:after:content-['Wednesday'] md:top-0"></span>
      <span className="sticky top-12 z-50  col-start-[5] row-start-[1] border-b border-neutral-100 bg-neutral-50 bg-clip-padding py-2 text-center text-sm font-medium text-neutral-900 after:content-['Thu'] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 sm:text-base sm:after:content-['Thursday'] md:top-0"></span>
      <span className="sticky top-12 z-50  col-start-[6] row-start-[1] border-b border-neutral-100 bg-neutral-50 bg-clip-padding py-2 text-center text-sm font-medium text-neutral-900 after:content-['Fri'] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 sm:text-base sm:after:content-['Friday'] md:top-0"></span>
    </>
  );
}

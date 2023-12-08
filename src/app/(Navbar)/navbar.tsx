import { HiBookOpen, HiHome } from "react-icons/hi2";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { ThemeSelector } from "~/components";
import ActiveLink from "./ActiveLink";
function Navbar() {
  return (
    <nav className="sticky top-0 z-[999] flex w-full flex-row border-b bg-white px-2 py-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white sm:z-0 sm:h-screen sm:w-fit sm:flex-col sm:items-center sm:justify-between sm:border-b-0 sm:border-r sm:p-3 sm:pt-8">
      <div className="inline-flex sm:block sm:space-y-3">
        <ActiveLink
          href="/"
          className="w-fit text-base after:content-['PlanMyTimetable'] sm:w-24 sm:text-sm sm:after:content-['Home']"
        >
          <HiHome />
        </ActiveLink>
        <ActiveLink href="/classes" className="w-fit sm:w-24">
          <HiBookOpen />
          Classes
        </ActiveLink>
      </div>
      <div className="flex gap-2 text-xs sm:flex-col sm:pt-1 ">
        <ActiveLink
          href="/help"
          className="w-fit sm:w-24 sm:after:content-['Help']"
        >
          <HiQuestionMarkCircle size={16} />
        </ActiveLink>
        <ThemeSelector />
        <div className="hidden w-[6.2rem] space-y-1 border-t border-t-neutral-50 pt-2 dark:border-t-neutral-700 sm:block">
          <p className="whitespace-break-spaces break-words text-xs font-medium">
            PlanMyTimetable
          </p>
          <p className=" whitespace-break-spaces break-all text-xs font-light">
            Built by Maximus Dionyssopoulos.
          </p>
          <a
            href="https://github.com/s3943811"
            className="font-medium underline underline-offset-4 hover:font-semibold"
          >
            Github
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

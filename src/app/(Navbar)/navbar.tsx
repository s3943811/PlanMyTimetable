import { HiBookOpen, HiHome } from "react-icons/hi2";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Button, ThemeSelector } from "~/components";
import ActiveLink from "./ActiveLink";
function Navbar() {
  return (
    <nav className="sticky top-0 z-[998] flex flex-row flex-wrap border-b bg-white px-2 py-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white md:z-0 md:h-screen md:w-fit md:flex-col md:items-center md:justify-between md:border-b-0 md:border-r md:p-3 md:pt-8">
      <div className="inline-flex md:block md:space-y-3">
        <ActiveLink
          href="/"
          className="w-fit text-base after:content-['PlanMyTimetable'] md:w-24 md:text-sm md:after:content-['Home']"
        >
          <HiHome />
        </ActiveLink>
        <ActiveLink href="/classes" className="w-fit md:w-24">
          <HiBookOpen />
          Classes
        </ActiveLink>
      </div>
      <div className="flex gap-2 text-xs md:flex-col md:pt-1">
        <ActiveLink
          href="/help"
          className="w-fit md:w-24 md:after:content-['Help']"
        >
          <HiQuestionMarkCircle size={16} />
        </ActiveLink>
        <ThemeSelector />
        <Button className=" w-full bg-green-500 text-green-100 hover:bg-green-600 dark:bg-green-500 dark:text-green-100 dark:hover:bg-green-600">
          <a href="https://www.buymeacoffee.com/maxdionyssopoulos">Donate</a>
        </Button>
        <div className="hidden w-[6.2rem] space-y-1 border-t border-t-neutral-50 pt-2 dark:border-t-neutral-700 md:block">
          <p className="whitespace-break-spaces break-words text-xs font-medium">
            PlanMyTimetable
          </p>
          <p className=" whitespace-break-spaces break-all text-xs font-light">
            Built by Maximus Dionyssopoulos.
          </p>
          <a
            href="https://github.com/s3943811"
            className="font-medium underline underline-offset-4 after:content-['_↗'] hover:font-semibold"
          >
            Github
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

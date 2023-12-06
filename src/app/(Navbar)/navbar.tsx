import { HiBookOpen, HiHome } from "react-icons/hi2";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { ThemeSelector } from "~/components";
import ActiveLink from "./ActiveLink";
function Navbar() {
  return (
    <nav className="sticky top-0 flex h-screen w-fit flex-col items-center justify-between border-r bg-white p-3 pt-8 dark:border-r-neutral-700 dark:bg-neutral-900 dark:text-white">
      <div className="space-y-3">
        <ActiveLink pathname="/">
          <HiHome />
          Home
        </ActiveLink>
        <ActiveLink pathname="/classes">
          <HiBookOpen />
          Classes
        </ActiveLink>
      </div>
      <div className="flex flex-col gap-2 border-t py-2 text-xs dark:border-t-neutral-700">
        <ActiveLink pathname="/help">
          <HiQuestionMarkCircle size={16} />
          Help
        </ActiveLink>
        <ThemeSelector />
        <div className="space-y-1">
          <p className="text-xs font-medium dark:font-semibold">
            PlanMyTimetable.
          </p>
          <p className=" w-[6.5rem] whitespace-break-spaces break-all text-xs">
            Built by Maximus Dionyssopoulos.
          </p>
          <a
            href="https://github.com/s3943811"
            className="font-medium underline underline-offset-4"
          >
            Github
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

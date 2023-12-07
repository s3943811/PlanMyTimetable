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
      <div className="flex flex-col gap-2 pt-1 text-xs ">
        <ActiveLink pathname="/help">
          <HiQuestionMarkCircle size={16} />
          Help
        </ActiveLink>
        <ThemeSelector />
        <div className="w-[6.2rem] space-y-1 border-t border-t-neutral-50 pt-2 dark:border-t-neutral-700">
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

import { HiBookOpen, HiHome } from "react-icons/hi2";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { RetainLink, buttonVariants, ThemeSelector } from "~/components";
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
      <div className="flex flex-col items-center gap-2">
        <ThemeSelector />
        <RetainLink className={buttonVariants.outlineIcon} href="/help">
          <HiQuestionMarkCircle className="h-[1.2rem] w-[1.2rem]" />
        </RetainLink>
      </div>
    </nav>
  );
}
export default Navbar;

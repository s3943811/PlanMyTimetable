import { HiBookOpen, HiHome } from "react-icons/hi2";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { RetainLink, buttonVariants } from "~/components";
import ActiveLink from "./ActiveLink";
function Navbar() {
  return (
    <nav className="sticky top-0 flex h-screen flex-col items-center justify-between border-r bg-white p-3 pt-8 dark:border-r-neutral-700 dark:bg-neutral-900 dark:text-white">
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
      <div>
        <RetainLink className={buttonVariants.ghost} href="/help">
          <HiQuestionMarkCircle size={25} />
        </RetainLink>
      </div>
    </nav>
  );
}
export default Navbar;

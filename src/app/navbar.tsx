import { HiCalendar, HiQuestionMarkCircle } from "react-icons/hi";
import { RetainLink, buttonVariants } from "~/components";
function Navbar() {
  return (
    <nav className="sticky top-0 flex h-screen flex-col items-center justify-between border-r bg-white p-3 pt-8">
      <div>
        <RetainLink
          href="/"
          className="flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-1.5 font-medium hover:bg-neutral-100 active:bg-neutral-200"
        >
          <HiCalendar />
          Home
        </RetainLink>
      </div>
      <div>
        <RetainLink className={buttonVariants["ghost"]} href="/help">
          <HiQuestionMarkCircle size={25} />
        </RetainLink>
      </div>
    </nav>
  );
}
export default Navbar;

import Link from "next/link";
import { HiCalendar, HiOutlineAdjustments } from "react-icons/hi";
import Button from "../Button/Button";
function Navbar() {
  return (
    <nav className="sticky top-0 flex h-screen flex-col items-center justify-between border-r bg-white p-3 pt-8">
      <div>
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-1.5 font-medium hover:bg-neutral-100 active:bg-neutral-200"
        >
          <HiCalendar />
          Home
        </Link>
      </div>
      <Button variant="outline">
        <HiOutlineAdjustments />
        Edit
      </Button>
    </nav>
  );
}
export default Navbar;

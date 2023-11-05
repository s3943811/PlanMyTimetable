import Link from "next/link";
import { BsCalendar3 } from "react-icons/bs";

function Navbar() {
  return (
    <nav className="flex flex-col border-r p-3 pt-10">
      <Link
        href="/"
        className="flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-1.5 font-medium hover:bg-neutral-100 active:bg-neutral-200"
      >
        <BsCalendar3 />
        Home
      </Link>
    </nav>
  );
}
export default Navbar;

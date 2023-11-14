import Link from "next/link";
import { BsCalendar3 } from "react-icons/bs";

function Navbar() {
  return (
    <nav className="sticky top-0 flex h-screen flex-col items-center justify-between border-r bg-white p-3 pt-8">
      <div>
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-1.5 font-medium hover:bg-neutral-100 active:bg-neutral-200"
        >
          <BsCalendar3 />
          Home
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;

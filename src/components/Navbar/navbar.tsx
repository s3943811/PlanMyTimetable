import Link from "next/link";
import {BsCalendar3} from "react-icons/bs"

function Navbar() {
    return (
    <nav className="flex flex-col pt-10 p-3 border-r">
        <Link href="/" className="flex flex-row items-center justify-center px-4 py-1.5 rounded-lg gap-2 font-medium hover:bg-neutral-100 active:bg-neutral-200"><BsCalendar3/>Home</Link>
    </nav>
    )
}
export default Navbar;
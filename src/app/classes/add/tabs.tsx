"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Tabs() {
  const pathname = usePathname();
  const activeStyle = "bg-white font-medium shadow";
  return (
    <div className="mt-3 inline-flex h-10 w-5/6 items-center justify-center gap-3 rounded-lg bg-neutral-50 p-2 text-sm">
      <Link
        href="/classes/add"
        className={`mx-auto inline-flex w-full items-center justify-center rounded-md px-3 py-1.5 transition-all ${
          !pathname.includes("manual") && activeStyle
        }`}
      >
        Automatically
      </Link>
      <Link
        href="/classes/add/manual"
        className={`mx-auto inline-flex w-full items-center justify-center rounded-md px-3 py-1.5 transition-all ${
          pathname.includes("manual") && activeStyle
        }`}
      >
        <p>Manual</p>
      </Link>
    </div>
  );
}

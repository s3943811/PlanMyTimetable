"use client";
import { RetainLink } from "~/components";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

export default function PageSelector() {
  const pathname = usePathname();

  const active =
    "[&[data-state=active]]:font-medium data-[state=active]:border-b-black dark:data-[state=active]:border-b-white";
  const placeholder =
    "[&[data-state=inactive]]:text-neutral-500/90 [&[data-state=inactive]]:dark:text-neutral-400";
  return (
    <div className="mb-3 inline-flex h-10 w-full items-center gap-3 border-b dark:border-b-neutral-700 ">
      <RetainLink
        data-state={pathname === "/classes/add" ? "active" : "inactive"}
        href="/classes/add"
        className={cn(
          `inline-flex w-fit items-center justify-center border-b-2 border-b-transparent py-1.5 transition-all
        `,
          active,
          placeholder,
        )}
      >
        Automatic
      </RetainLink>
      <span>/</span>
      <RetainLink
        data-state={pathname === "/classes/add/manual" ? "active" : "inactive"}
        href="/classes/add/manual"
        className={cn(
          `inline-flex w-fit items-center justify-center border-b-2 border-b-transparent py-1.5 transition-all
        `,
          active,
          placeholder,
        )}
      >
        Manual
      </RetainLink>
      <span>/</span>
      <RetainLink
        data-state={pathname === "/classes/add/blocked" ? "active" : "inactive"}
        href="/classes/add/blocked"
        className={cn(
          `inline-flex w-fit items-center justify-center border-b-2 border-b-transparent py-1.5 transition-all
        `,
          active,
          placeholder,
        )}
      >
        Blocked Time
      </RetainLink>
    </div>
  );
}

"use client";
import { RetainLink } from "~/components";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

export default function PageSelector() {
  const pathname = usePathname();

  const active =
    "[&[data-state=active]]:font-medium [&[data-state=active]]:underline [&[data-state=active]]:decoration-[1.5px] u[&[data-state=active]]:nderline-offset-[7px]";
  const placeholder =
    "[&[data-state=inactive]]:text-neutral-500/90 [&[data-state=inactive]]:dark:text-neutral-400";
  return (
    <div className="mt-1 inline-flex h-10 w-fit items-center justify-center gap-3 rounded-lg ">
      <RetainLink
        data-state={pathname === "/classes/add" ? "active" : "inactive"}
        href="/classes/add"
        className={cn(
          `inline-flex w-full items-center justify-center rounded-md py-1.5 transition-all 
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
          `inline-flex w-full items-center justify-center rounded-md py-1.5 transition-all 
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
          `inline-flex w-full items-center justify-center whitespace-nowrap rounded-md py-1.5 transition-all 
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

"use client";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { RetainLink } from "~/components";
export default function ActiveLink({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  const segement = usePathname();
  const layoutSegement = useSelectedLayoutSegment();
  // console.log(segement);
  const active =
    segement === pathname ||
    (layoutSegement && pathname.includes(layoutSegement));
  return (
    <RetainLink
      href={pathname}
      className={`flex h-8 w-24 flex-row items-center gap-1 whitespace-nowrap rounded-lg ${
        active ? "bg-neutral-50 font-medium dark:bg-neutral-800" : ""
      } px-2.5 py-1.5 text-sm hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 `}
    >
      {children}
    </RetainLink>
  );
}

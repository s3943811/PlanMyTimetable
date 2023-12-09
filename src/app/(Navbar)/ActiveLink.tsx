"use client";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { cn } from "~/lib/utils";
import { RetainLink } from "~/components";
import type { LinkProps } from "next/link";
interface RetainParamsLink extends LinkProps {
  children?: React.ReactNode;
  href: string;
  className?: string;
}

export default function ActiveLink({
  href,
  children,
  className,
  ...props
}: RetainParamsLink) {
  const segement = usePathname();
  const layoutSegement = useSelectedLayoutSegment();
  // console.log(segement);
  const active =
    segement === href || (layoutSegement && href.includes(layoutSegement));
  return (
    <RetainLink
      {...props}
      href={href}
      className={cn(
        `flex h-8 w-24 flex-row items-center gap-1 whitespace-nowrap rounded-lg ${
          active ? "bg-neutral-50 font-medium dark:bg-neutral-800" : ""
        } px-2.5 py-1.5 text-sm hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 `,
        className,
      )}
    >
      {children}
    </RetainLink>
  );
}

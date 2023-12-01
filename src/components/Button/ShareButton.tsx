"use client";

import { Button, Tooltip } from "~/components";
import { IoIosShareAlt } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ShareButton() {
  const pathname = usePathname();
  const p = useSearchParams();
  const params = new URLSearchParams(p);
  const copyLink = useCallback(() => {
    console.log(pathname);
    // TODO: Update this based on location
    const link = `localhost:3000/?${params}`;
    navigator.clipboard.writeText(link);
  }, [pathname, p, params]);

  return (
    <div className="group relative flex">
      <Button onClick={() => copyLink()}>
        <IoIosShareAlt />
        Share
      </Button>
      <span
        className={`absolute -left-5 bottom-10 z-[999] scale-0 whitespace-nowrap rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100`}
      >
        Copy to clipboard
      </span>
    </div>
  );
}

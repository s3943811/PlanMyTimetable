"use client";

import { Button } from "~/components";
import { IoIosShareAlt } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ShareButton() {
  const p = useSearchParams();
  const copyLink = useCallback(async () => {
    // console.log(pathname);
    const link = `https://planmytimetable.vercel.app/?${p.toString()}`;
    await navigator.clipboard.writeText(link);
  }, [p]);

  return (
    <div className="group relative flex">
      <Button onClick={() => copyLink()}>
        <IoIosShareAlt />
        Share
      </Button>
      <span
        className={`absolute -left-5 bottom-10 z-[999] scale-0 whitespace-nowrap rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 dark:bg-neutral-200 dark:text-neutral-950`}
      >
        Copy to clipboard
      </span>
    </div>
  );
}

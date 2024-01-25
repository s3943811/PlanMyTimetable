"use client";

import { Button, Tooltip } from "~/components";
import { IoIosShareAlt } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ShareButton() {
  const p = useSearchParams();
  const copyLink = useCallback(async () => {
    // console.log(pathname);
    const markdown = `[View My Timetable](https://planmytimetable.vercel.app/?${p.toString()})`;
    await navigator.clipboard.writeText(markdown);
  }, [p]);

  return (
    <Tooltip
      message={"Copy To Clipboard"}
      position="top"
      className=" whitespace-normal"
    >
      <Button onClick={() => copyLink()} data-umami-event="Share button">
        <IoIosShareAlt />
        Share
      </Button>
    </Tooltip>
  );
}

import React, { Suspense, useState } from "react";
import { Button, AddFriend } from "~/components";
import { Preference } from "~/lib/definitions";
import { IoIosShareAlt } from "react-icons/io";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import dynamic from "next/dynamic";

const FriendPopover = dynamic(
  () => import("~/components/Popovers/FriendPopover"),
  { ssr: false },
);

export default function CalendarToolbar() {
  return (
    <div className=" sticky top-0 inline-flex w-full gap-3 border-t border-b-neutral-50 px-3 py-4">
      <AddFriend />
      <FriendPopover />
      <div className="ml-auto gap-1">
        <Button>
          <IoIosShareAlt />
          Share
        </Button>
      </div>
    </div>
  );
}

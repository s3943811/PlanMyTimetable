"use client";
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
export type Friend = {
  id: string;
  state: Preference[];
  name: string;
  link: string;
  active: boolean;
};

export default function CalendarToolbar() {
  const [friendData, setFriendData] = useLocalStorage<Friend[]>("friends", []);

  return (
    <div className=" sticky top-0 inline-flex w-full gap-3 border-t border-b-neutral-50 px-3 py-4">
      <AddFriend friendData={friendData} setFriendData={setFriendData} />
      <FriendPopover friendData={friendData} setFriendData={setFriendData} />
      <div className="ml-auto gap-1">
        <Button>
          <IoIosShareAlt />
          Share
        </Button>
      </div>
    </div>
  );
}

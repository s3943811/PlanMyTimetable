"use client";
import { Popover } from "react-tiny-popover";
import React, { useState } from "react";
import { Button, Tooltip } from "~/components";
import { useFriend } from "~/contexts/FriendContext";
import type { Friend } from "~/contexts/FriendContext";
import { HiOutlineX, HiOutlineSelector, HiMinus } from "react-icons/hi";

export default function FriendPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { setFriendData, friendData } = useFriend();

  function setActive(item: Friend) {
    const newData = friendData?.map((friend) => {
      if (item.id === friend.id) {
        return {
          active: !item.active,
          id: item.id,
          state: item.state,
          name: item.name,
          link: item.link,
        };
      }
      return friend;
    });
    setFriendData(newData ?? null);
  }

  function removeFriend(index: number) {
    const newFriends = friendData?.toSpliced(index, 1);
    newFriends && setFriendData(newFriends);
  }

  return (
    <Popover
      containerClassName="z-50"
      isOpen={isOpen}
      positions={["top"]}
      padding={10}
      onClickOutside={() => setIsOpen(false)}
      content={
        <div
          className={`flex w-40 flex-col gap-1 rounded-lg border bg-white p-5 shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:text-white`}
        >
          {friendData?.length === 0 ? (
            <p className="text-sm">Add a friend to compare timetables.</p>
          ) : (
            <>
              {friendData?.map((item, index) => (
                <div
                  className="flex w-full flex-row items-center justify-between gap-2 rounded-md px-1"
                  key={item.id}
                >
                  <div className="space-x-2">
                    <input
                      id={item.name + "_selector"}
                      type="checkbox"
                      className=""
                      checked={item.active}
                      onChange={() => setActive(item)}
                      data-umami-event="hide friend"
                    />
                    <label
                      htmlFor={item.name + "_selector"}
                      className={` ${
                        item.active
                          ? "font-medium"
                          : "font-light  text-neutral-500/90 line-through decoration-2"
                      } `}
                    >
                      {item.name}
                    </label>
                  </div>
                  <Tooltip message={`Remove ${item.name}`} position="top">
                    <button
                      className="inline-flex h-6 items-center justify-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-sm hover:bg-neutral-50 active:bg-neutral-100 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
                      onClick={() => removeFriend(index)}
                      data-umami-event="clear friend"
                    >
                      <HiMinus />
                    </button>
                  </Tooltip>
                </div>
              ))}
              <button
                className="ring-offset-background mt-1.5 inline-flex h-6 w-full items-center justify-center whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1.5 text-sm font-medium text-neutral-50 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-800 dark:hover:bg-neutral-100"
                onClick={() => {
                  setFriendData([]);
                  setIsOpen(false);
                }}
              >
                <HiOutlineX size={18} /> Clear All
              </button>
            </>
          )}
        </div>
      }
    >
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        data-umami-event="open friend popover"
      >
        Friends <HiOutlineSelector />
      </Button>
    </Popover>
  );
}

"use client";
import { Popover } from "react-tiny-popover";
import React, { useState } from "react";
import { Button } from "~/components";
import { useFriend, Friend } from "~/contexts/FriendContext";
import { HiOutlineX, HiOutlineSelector } from "react-icons/hi";

export default function FriendPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { setFriendData, friendData } = useFriend();

  function setActive(item: Friend) {
    const newData = friendData.map((friend) => {
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
    setFriendData(newData);
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
          className={`flex w-40 flex-col gap-1 rounded-lg border bg-white p-5 shadow-lg`}
        >
          {friendData.length === 0 ? (
            <p className="text-sm">Add a friend to compare timetables.</p>
          ) : (
            <>
              {friendData.map((item) => (
                <div
                  className="flex w-full flex-row gap-2 rounded-md px-2"
                  key={item.id}
                >
                  <input
                    type="checkbox"
                    className=""
                    checked={item.active}
                    onChange={() => setActive(item)}
                  />
                  <p
                    className={` ${
                      item.active
                        ? "font-medium"
                        : "font-light  text-neutral-500/90 line-through decoration-2"
                    } `}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
              <button
                className="ring-offset-background mt-1.5 inline-flex h-6 w-full items-center justify-center whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1.5 text-sm font-medium text-neutral-50 hover:bg-neutral-700"
                onClick={() => {
                  setFriendData([]);
                  setIsOpen(false);
                }}
              >
                <HiOutlineX size={15} /> Clear All
              </button>
              <button
                className="absolute right-2 top-2 rounded-lg p-1 hover:bg-neutral-100"
                onClick={() => setIsOpen(false)}
              >
                <HiOutlineX />
              </button>
            </>
          )}
        </div>
      }
    >
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
        Friends <HiOutlineSelector />
      </Button>
    </Popover>
  );
}

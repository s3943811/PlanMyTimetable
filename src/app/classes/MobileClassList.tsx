"use client";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import { Button } from "~/components";
import ClassList from "./ClassList";

export default function MobileClassList() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghostIcon"
          className=" p-2 text-lg font-medium md:hidden"
        >
          <HiBars3 />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 backdrop-brightness-[.50]" />
        <DialogContent className=" fixed inset-y-12 left-0 z-50 h-full w-3/4 gap-4 overflow-auto border-r bg-white p-2 shadow-lg dark:border-r-neutral-700 dark:bg-neutral-900 md:inset-y-0">
          <DialogTitle className="inline-flex items-center gap-1 pl-1 text-md font-medium">
            Classes
          </DialogTitle>
          <ClassList />
          <DialogClose asChild>
            <Button
              variant="ghostIcon"
              className="absolute right-2 top-2 rounded-lg p-2"
            >
              <HiOutlineX />
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

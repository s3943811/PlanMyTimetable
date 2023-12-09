"use client";
import { HiBars3 } from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "~/components";
import ClassList from "./ClassList";
import { useDnD } from "~/contexts/DndProvider";

export default function MobileClassList() {
  const {
    hidden,
    openMobileClassListSheet: open,
    setMobileClassListSheetOpen: setOpen,
  } = useDnD();

  return (
    <Dialog open={open} onOpenChange={setOpen} width={768}>
      <DialogTrigger asChild>
        <Button
          variant="ghostIcon"
          className=" p-2 text-lg font-medium md:hidden"
        >
          <HiBars3 />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent
          className={`fixed inset-y-12 left-0 z-50 ${
            hidden ? "" : "invisible"
          }  md:hidd h-full gap-4 overflow-auto border-r bg-white p-2 shadow-lg dark:border-r-neutral-700 dark:bg-neutral-900 md:inset-y-0`}
        >
          <DialogTitle className="inline-flex items-center gap-1 pl-1 text-md font-medium">
            Classes
          </DialogTitle>
          <ClassList isMobile />
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

"use client";
import { HiBars3 } from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import {
  Button,
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "~/components";
import ClassList from "./DraggableClassList";
import { useDnD } from "~/contexts/DndProvider";

export default function MobileClassList() {
  const {
    hidden,
    openMobileClassListSheet: open,
    setMobileClassListSheetOpen: setOpen,
  } = useDnD();

  return (
    <Sheet open={open} onOpenChange={setOpen} closeWidth={768}>
      <SheetTrigger asChild>
        <Button
          variant="ghostIcon"
          className=" p-2 text-lg font-medium md:hidden"
        >
          <HiBars3 />
        </Button>
      </SheetTrigger>
      <SheetPortal>
        <SheetContent
          className={`fixed inset-y-12 left-0 z-50 ${
            hidden ? "" : "invisible"
          }  md:hidd h-full gap-4 overflow-auto border-r bg-white p-2 shadow-lg dark:border-r-neutral-700 dark:bg-neutral-900 md:inset-y-0`}
        >
          <SheetTitle className="inline-flex items-center gap-1 pl-1 text-md font-medium">
            Classes
          </SheetTitle>
          <ClassList isMobile />
          <SheetClose asChild>
            <Button
              variant="ghostIcon"
              className="absolute right-2 top-2 rounded-lg p-2"
            >
              <HiOutlineX />
            </Button>
          </SheetClose>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}

"use client";
import { Button } from "~/components";
import { HiPlus, HiOutlinePlusCircle } from "react-icons/hi";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
} from "@radix-ui/react-dialog";

export default function AddButton() {
  return (
    <>
      <Dialog modal={true}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <HiOutlinePlusCircle />
            Add
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-background/80 fixed inset-0 z-50 backdrop-brightness-75" />
          <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-40%] translate-y-[-50%] gap-4 rounded-lg border bg-white p-6 shadow-lg">
            <select className=" appearance-none rounded-lg border bg-white">
              <option value={"someOption"}>Option 1</option>
              <option value={"someOption2"}>Option 2</option>
            </select>
            <DialogClose asChild>
              <button>close</button>
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}

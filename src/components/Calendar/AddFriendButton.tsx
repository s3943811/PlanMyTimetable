"use client";
import React, { useState } from "react";
import { HiOutlineUserAdd, HiOutlineX } from "react-icons/hi";
import { Button, Tooltip, buttonVariants } from "~/components";
import { useForm } from "react-hook-form";
import * as z from "zod";
import JSONCrush from "jsoncrush";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Friend } from "~/app/(Planner)/CalendarToolbar";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  link: z
    .string()
    .url({ message: "Invalid link" })
    .refine((value) => new URL(value).searchParams.get("pref") !== null, {
      message: 'The link must contain a "pref" query parameter',
    }),
});

export default function AddFriend({
  friendData,
  setFriendData,
}: {
  friendData: Friend[];
  setFriendData: React.Dispatch<React.SetStateAction<Friend[]>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const pref = new URL(values.link).searchParams.get("pref")!;

    const friend: Friend = {
      id: crypto.randomUUID(),
      name: values.name,
      link: values.link,
      state: JSON.parse(JSONCrush.uncrush(pref)),
      active: true,
    };
    setFriendData([...friendData, friend]);
    setOpen(false);
  }

  const [open, setOpen] = useState(false);
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Tooltip message="Friend Comparison" position="top">
          <span className={buttonVariants["outlineIcon"]}>
            <HiOutlineUserAdd />
          </span>
        </Tooltip>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 backdrop-brightness-[.65]" />
        <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-40%] translate-y-[-50%] gap-4 rounded-lg border bg-white p-6 shadow-lg">
          <div className="flex flex-col space-y-1.5">
            <DialogTitle className="text-lg font-medium leading-none tracking-tight">
              Add a friend
            </DialogTitle>
            <DialogDescription className="text-sm font-light text-neutral-500/90">
              Compare a friends timetable, if they've used "PlanYourSemester" to
              create their preferences.
            </DialogDescription>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="contents">
            <fieldset className="flex flex-row items-center space-x-8">
              <label
                className="pl-0.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Name
              </label>
              <input
                {...register("name")}
                id="name"
                placeholder="Name"
                className={`flex h-10 w-full rounded-md border ${
                  errors.name && "border-red-300"
                } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.name
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50`}
              />
            </fieldset>
            {errors.name && (
              <p className="ml-20 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
            <fieldset className="flex flex-row items-center space-x-11">
              <label
                className="pl-0.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="link"
              >
                Link
              </label>
              <input
                {...register("link")}
                id="link"
                placeholder="Link"
                className={`flex h-10 w-full rounded-md border ${
                  errors.link && "border-red-300"
                } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.link
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50`}
              />
            </fieldset>
            {errors.link && (
              <p className=" ml-20 text-sm text-red-500">
                {errors.link.message}
              </p>
            )}
            <div className="ml-auto">
              <Button>Add friend</Button>
            </div>
          </form>
          <DialogClose asChild>
            <button className="absolute right-2 top-2 rounded-lg p-2 hover:bg-neutral-100">
              <HiOutlineX />
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

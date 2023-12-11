"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components";
import type { BlockedEvent } from "~/lib/definitions";
import { usePreview } from "~/contexts/PreviewContext";
import { useUrlState } from "~/hooks/useUrlState";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

const schema = z.object({
  id: z.string().optional(),
  day: z.enum(["Mon", "Tue", "Wed", "Thu", "Fri"]),
  start_time: z
    .string()
    .trim()
    .regex(
      /^([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,
      "Invalid time format",
    )
    .regex(
      /^(0[5-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Time must start on or after 5 am",
    ),
  duration: z.coerce
    .number({ invalid_type_error: "Duration must be a number" })
    .gte(30, { message: "Duration must be at least 30 minutes." })
    .lte(600, { message: "Duration must be less than than 600 minutes." }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(120, { message: "Name must be less than 120 characters" }),
});

export default function BlockedForm({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof schema>;
}) {
  const { blockedEvents } = usePreview();
  const { appendState, replaceState } = useUrlState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    const blockedEvent: BlockedEvent = {
      id: defaultValues?.id ?? nanoid(9),
      name: values.name,
      day: values.day,
      duration: values.duration,
      start: values.start_time,
    };
    if (
      defaultValues?.day === blockedEvent.day &&
      defaultValues?.name === blockedEvent.name &&
      defaultValues?.duration === blockedEvent.duration &&
      defaultValues?.start_time === blockedEvent.start
    )
      return;
    if (defaultValues) {
      const newBlocked = blockedEvents.map((item) => {
        if (item.id === defaultValues.id) {
          return blockedEvent;
        }
        return item;
      });
      replaceState(newBlocked, "blocked");
      toast.success(`${blockedEvent.name} updated`);
      return;
    }
    appendState(blockedEvent, "blocked", "/");
    toast.success(`${blockedEvent.name} created`);
  };

  return (
    <form className="contents space-y-7" onSubmit={handleSubmit(onSubmit)}>
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
          disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-900 dark:placeholder:text-neutral-400`}
        />
        {<ErrorMessage>{errors.name?.message}</ErrorMessage>}
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Give a name to the blocked time.
        </p>
      </div>
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="day"
        >
          Day
        </label>

        <select
          className=" flex h-10 w-full appearance-none rounded-md border bg-white px-3 py-2 text-sm shadow-sm
          disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-900 dark:placeholder:text-neutral-400"
          {...register("day")}
        >
          <option value="Mon">Monday</option>
          <option value="Tue">Tuesday</option>
          <option value="Wed">Wednesday</option>
          <option value="Thu">Thursday</option>
          <option value="Fri">Friday</option>
        </select>
        {<ErrorMessage>{errors.day?.message}</ErrorMessage>}
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          The day you want to block out a time.
        </p>
      </div>
      <div className="space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="start_time"
        >
          Start Time
        </label>
        <input
          {...register(`start_time`)}
          id="start_time"
          placeholder="Start time"
          type="time"
          className={`flex h-10 w-full rounded-md border ${
            errors.start_time && "border-red-300"
          } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.start_time
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-900 dark:placeholder:text-neutral-400`}
        />
        {<ErrorMessage>{errors.start_time?.message}</ErrorMessage>}
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          The start time you want to block out.
        </p>
      </div>
      <div className="space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="duration"
        >
          Duration
        </label>
        <input
          {...register("duration")}
          id="duration"
          placeholder="Duration"
          className={`flex h-10 w-full rounded-md border ${
            errors.duration && "border-red-300"
          } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.duration
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-900 dark:placeholder:text-neutral-400`}
        />
        {<ErrorMessage>{errors.duration?.message}</ErrorMessage>}
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          How long you want to block out (in minutes).
        </p>
      </div>
      <div className="ml-auto space-x-5">
        <Button>{defaultValues ? `Updated blocked time` : "Block time"}</Button>
      </div>
    </form>
  );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-red-500">{children}</p>;
}

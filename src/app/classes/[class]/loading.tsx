import {
  HiOutlineXCircle,
  HiOutlinePlusCircle,
  HiOutlineMinusCircle,
} from "react-icons/hi";
import { Button } from "~/components";

export default function Loading() {
  return (
    <div className="contents space-y-7">
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="course_name"
        >
          Name
        </label>
        <div className=" h-10 w-full animate-pulse rounded-md bg-neutral-100"></div>
        <p className="text-xs font-light text-neutral-500/90">
          This is the name of the class in plain text. For example, Full Stack
          Development.
        </p>
      </div>
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="type"
        >
          Code
        </label>
        <div className=" h-10 w-full animate-pulse rounded-md bg-neutral-100"></div>
        <p className="text-xs font-light text-neutral-500/90">
          This is a code used to describe the course by the university
          (optional). For example, COSC2758.
        </p>
      </div>
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="colour"
        >
          Colour
        </label>
        <div className=" h-10 w-full animate-pulse rounded-md bg-neutral-100"></div>
        <p className="text-xs font-light text-neutral-500/90">
          A colour for the class.
        </p>
      </div>
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="course_code"
        >
          Type
        </label>
        <div className=" h-10 w-full animate-pulse rounded-md bg-neutral-100"></div>
        <p className="text-xs font-light text-neutral-500/90">
          The type of class. For example, a Lecture or a Workshop.
        </p>
      </div>
      <div className="sticky top-0 z-10 inline-flex justify-between bg-white">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Options</h3>
          <p className="text-xs font-light text-neutral-500/90">
            This is the times and rooms on offer for this class this semester.
          </p>
        </div>
        <div className=" inline-flex gap-1">
          <Button variant="secondary" type="button">
            <HiOutlineXCircle /> Remove All
          </Button>

          <Button variant="secondary" type="button">
            <HiOutlinePlusCircle /> Add Option
          </Button>
        </div>
      </div>
      <div className=" space-y-6">
        <div className=" w-full space-y-2">
          <label
            className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="duration"
          >
            Duration
          </label>
          <div className=" h-10 w-full animate-pulse rounded-md bg-neutral-100"></div>
          <p className="text-xs font-light text-neutral-500/90">
            How long the Lecture goes for in minutes.
          </p>
        </div>
        <div>
          <OptionGroupLoading />
          <OptionGroupLoading />
          <OptionGroupLoading />
        </div>
      </div>
      <div className="ml-auto space-x-5">
        <Button variant="outlineLarge">Clear</Button>
        <Button variant="normalLarge">Update Class</Button>
      </div>
    </div>
  );
}

function OptionGroupLoading() {
  return (
    <div className="relative rounded-md border px-2.5 py-2 pb-3">
      <div className="space-y-7">
        <div className="flex flex-row space-x-10">
          <div className=" w-full space-y-2">
            <label
              className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="option_day"
            >
              Day
            </label>

            <div className=" h-10 w-full animate-pulse rounded-md bg-neutral-100"></div>
            <p className="text-xs font-light text-neutral-500/90">
              The day of the week.
            </p>
          </div>
          <div className=" w-full space-y-2">
            <label
              className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="start_time"
            >
              Start Time
            </label>
            <div className=" h-10 w-full animate-pulse rounded-md bg-neutral-100"></div>
            <p className="text-xs font-light text-neutral-500/90">
              The time the Lecture starts.
            </p>
          </div>
        </div>

        <div className="flex flex-row space-x-10">
          <div className=" w-full space-y-2">
            <label
              className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="room"
            >
              Room
            </label>
            <div className=" h-10 w-full animate-pulse rounded-md bg-neutral-100"></div>
            <p className="text-xs font-light text-neutral-500/90">
              What room the Lecture will be in (if online write "-").
            </p>
          </div>
          <div className=" w-full space-y-2">
            <label
              className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="campus"
            >
              Campus
            </label>
            <div className=" h-10 w-full animate-pulse rounded-md bg-neutral-100"></div>
            <p className="text-xs font-light text-neutral-500/90">
              What campus the Lecture will be on. For example, RMIT students may
              write "Melbourne City" or "Canvas".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useForm, SubmitHandler } from "react-hook-form";
import { useId } from "react";
import { Button } from "~/components";
import { HiOutlineSelector, HiOutlinePlusCircle } from "react-icons/hi";
import { CourseType } from "~/lib/definitions";

export default function ClassForm() {
  return (
    <form className="contents space-y-7">
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="course_name"
        >
          Name
        </label>
        <input
          required
          id="course_name"
          placeholder="Name"
          className=" flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 
          focus:ring-neutral-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-xs font-light text-neutral-500/90">
          This is the name of the class in plain text. For example, Full Stack
          Development.
        </p>
      </div>
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="course_code"
        >
          Code
        </label>
        <input
          id="course_code"
          placeholder="Code"
          className="flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm 
          file:border-0 file:bg-transparent file:font-medium
          placeholder:text-neutral-400/90 focus:ring-neutral-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-xs font-light text-neutral-500/90">
          This is a code used to describe the course by the university
          (optional). For example, COSC2758.
        </p>
      </div>
      {/* TODO: Placeholder here to create tabs */}
      <div className="h-10 space-y-2 rounded-md bg-neutral-200"></div>
      <div className="inline-flex justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Options</h3>
          <p className="text-xs font-light text-neutral-500/90">
            This is the times and rooms on offer for this class this semester.
          </p>
        </div>
        <Button variant="secondary" type="button">
          <HiOutlinePlusCircle /> Add Option
        </Button>
      </div>
      <div className=" space-y-6">
        <OptionForm type={CourseType.Lecture} />
        <div
          data-orientation="horizontal"
          role="none"
          className=" my-4 h-[1px] w-full shrink-0 bg-neutral-300"
        ></div>
        <OptionForm type={CourseType.Lecture} />
      </div>
      <div className="ml-auto space-x-5">
        {/* <Button variant="outline">Cancel</Button> */}
        <Button variant="normalLarge">Submit</Button>
      </div>
    </form>
  );
}

function OptionForm({ type }: { type: CourseType }) {
  return (
    <div className="space-y-7 rounded-md border px-2.5 py-2 pb-3">
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="option_day"
        >
          Day
        </label>
        <select
          className=" flex h-10 w-full appearance-none rounded-md border bg-white px-3 py-2 text-sm shadow-sm
          disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
        </select>
        <p className="text-xs font-light text-neutral-500/90">
          The day of the week.
        </p>
      </div>
      <div className="flex flex-row space-x-10">
        <div className=" w-full space-y-2">
          <label
            className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="start_time"
          >
            Start Time
          </label>
          <input
            required
            id="start_time"
            placeholder="Start time"
            type="time"
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm 
          file:border-0 file:bg-transparent file:font-medium
          placeholder:text-neutral-400/90 focus:ring-neutral-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-xs font-light text-neutral-500/90">
            The time the {CourseType[type]} starts.
          </p>
        </div>
        <div className=" w-full space-y-2">
          <label
            className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="duration"
          >
            Duration
          </label>
          <input
            required
            id="duration"
            placeholder="Duration"
            type="number"
            min={1}
            max={600}
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm 
          file:border-0 file:bg-transparent file:font-medium
          placeholder:text-neutral-400/90 focus:ring-neutral-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-xs font-light text-neutral-500/90">
            How long the {CourseType[type]} goes for in minutes.
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
          <input
            required
            id="room"
            placeholder="Room"
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm 
          file:border-0 file:bg-transparent file:font-medium
          placeholder:text-neutral-400/90 focus:ring-neutral-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-xs font-light text-neutral-500/90">
            What room the {CourseType[type]} will be in (if online write "-").
          </p>
        </div>
        <div className=" w-full space-y-2">
          <label
            className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="campus"
          >
            Campus
          </label>
          <input
            required
            id="room"
            placeholder="Room"
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm 
          file:border-0 file:bg-transparent file:font-medium
          placeholder:text-neutral-400/90 focus:ring-neutral-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-xs font-light text-neutral-500/90">
            What campus the {CourseType[type]} will be on. For example, RMIT
            students may write "Melbourne City" or "Canvas".
          </p>
        </div>
      </div>
    </div>
  );
}

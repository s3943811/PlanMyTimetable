"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Tooltip } from "~/components";
import { useEffect } from "react";
import {
  HiOutlineXCircle,
  HiOutlinePlusCircle,
  HiOutlineMinusCircle,
} from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUrlState } from "~/hooks/useUrlState";
import { ColourPalette, CourseType } from "~/lib/definitions";
import { usePreview } from "~/contexts/PreviewContext";
import { getCourseTypeString } from "~/lib/functions";
import toast from "react-hot-toast";
import type { Course } from "~/lib/definitions";
import type {
  UseFormRegister,
  UseFieldArrayRemove,
  FieldErrors,
} from "react-hook-form";

const optionSchema = z.object({
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
  room: z.string().trim().min(1, { message: "Room is required" }),
  campus: z.string().trim().min(1, { message: "Campus is required" }),
});
export const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(120, { message: "Name must be less than 120 characters" }),
  code: z
    .string()
    .trim()
    .min(1, { message: "Code is required" })
    .max(120, { message: "Code must be less than 120 characters" }),
  type: z.enum(["Lecture", "Tutorial", "Workshop", "Practical", "Other"]),
  colour: z.enum([
    "Purple",
    "Yellow",
    "Red",
    "Orange",
    "Green",
    "Teal",
    "Blue",
    "Fuchsia",
    "Pink",
  ]),
  duration: z.coerce
    .number()
    .gte(1, { message: "Duration must be at least 1 minute." })
    .lte(600, { message: "Duration must be less than than 600 minutes." }),
  options: z
    .array(optionSchema)
    .min(1, { message: "At least one option is required" }),
});

const val: z.infer<typeof formSchema> = {
  title: "",
  code: "",
  type: "Lecture",
  colour: "Purple",
  duration: NaN,
  options: [
    {
      day: "Mon",
      start_time: "",
      room: "",
      campus: "",
    },
  ],
};

export default function ClassForm({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof formSchema>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? val,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);
  const watchType = watch("type");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { appendState, replaceMultiple } = useUrlState();
  const { courseData, events } = usePreview();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const course: Course = {
      title: values.title,
      courseCode: values.code,
      type: CourseType[values.type],
      colour: ColourPalette[values.colour],
      options: values.options.map((item) => {
        return {
          day: item.day,
          start: item.start_time,
          duration: values.duration,
          location: item.room,
          campus_description: item.campus,
        };
      }),
    };
    // console.log(course);
    if (defaultValues) {
      const courses = courseData.map((item) => {
        if (
          item.title === defaultValues.title &&
          item.courseCode === defaultValues.code &&
          getCourseTypeString(item.type) === defaultValues.type
        ) {
          return course;
        }
        return item;
      });
      const newEvents = events.map((item) => {
        if (
          item.title === defaultValues.title &&
          item.courseCode === defaultValues.code &&
          getCourseTypeString(item.type) === defaultValues.type
        ) {
          return {
            title: values.title,
            courseCode: values.code,
            type: CourseType[values.type as keyof typeof CourseType],
            colour: ColourPalette[values.colour as keyof typeof ColourPalette],
            time: item.time,
          };
        }
        return item;
      });
      // setCourseData(courses);
      replaceMultiple(
        [
          { element: courses, prefName: "state" },
          { element: newEvents, prefName: "pref" },
        ],
        `/classes/${course.courseCode}-${getCourseTypeString(course.type)}`,
      );
      toast.success("Class updated successfully");
      return;
    }
    const already = courseData.find(
      (item) =>
        item.courseCode === course.courseCode && item.type === course.type,
    );
    if (already) {
      setError("code", {
        message: "Course with this code and type already exists",
      });
      setError("type", {
        message: "Course with this code and type already exists",
      });
      return;
    }
    appendState(course, "state", "/classes");
    toast.success("Class created successfully");
  }
  return (
    <form className="contents space-y-7" onSubmit={handleSubmit(onSubmit)}>
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="course_name"
        >
          Name
        </label>
        <input
          {...register("title")}
          id="course_name"
          placeholder="Name"
          className={`flex h-10 w-full rounded-md border ${
            errors.title && "border-red-300"
          } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.title
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50`}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
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
          {...register("code")}
          disabled={defaultValues ? true : false}
          placeholder={defaultValues ? defaultValues.code : "Code"}
          id="course_code"
          className={`flex h-10 w-full rounded-md border ${
            errors.code && "border-red-300"
          } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.code
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
           disabled:cursor-not-allowed disabled:opacity-50`}
        />
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
        <p className="text-xs font-light text-neutral-500/90">
          This is a code used to describe the course by the university. For
          example, COSC2758.
        </p>
      </div>
      <div className=" space-y-2">
        <label
          className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="colour"
        >
          Colour
        </label>
        <select
          className=" flex h-10 w-full appearance-none rounded-md border bg-white px-3 py-2 text-sm shadow-sm
          disabled:cursor-not-allowed disabled:opacity-50"
          {...register("colour")}
        >
          <option>Purple</option>
          <option>Yellow</option>
          <option>Orange</option>
          <option>Red</option>
          <option>Green</option>
          <option>Teal</option>
          <option>Blue</option>
          <option>Fuchsia</option>
          <option>Pink</option>
        </select>
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
        <select
          className={`appearence-none flex h-10 w-full rounded-md border ${
            errors.type && "border-red-300"
          } bg-white px-3 py-2 text-sm shadow-sm ${
            errors.type
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
           disabled:cursor-not-allowed disabled:opacity-50`}
          {...register("type")}
          disabled={defaultValues ? true : false}
          placeholder={defaultValues ? defaultValues.type : "Lecture"}
        >
          <option>Lecture</option>
          <option>Tutorial</option>
          <option>Workshop</option>
          <option>Practical</option>
          <option>Other</option>
        </select>
        <p className="text-xs font-light text-neutral-500/90">
          The type of class. For example, a Lecture or a Workshop.
        </p>
        {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
      </div>
      <div className="sticky top-0 z-10 inline-flex justify-between bg-white">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Options</h3>
          <p className="text-xs font-light text-neutral-500/90">
            This is the times and rooms on offer for this class this semester.
          </p>
        </div>
        <div className=" inline-flex gap-1">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              for (let i = fields.length - 1; i > 0; i--) {
                remove(i);
              }
            }}
          >
            <HiOutlineXCircle /> Remove All
          </Button>

          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              append({ day: "Mon", start_time: "", room: "", campus: "" })
            }
          >
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
          <input
            {...register("duration")}
            id="duration"
            placeholder="Duration"
            type="number"
            className={`flex h-10 w-full rounded-md border ${
              errors.duration && "border-red-300"
            } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.duration
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50`}
          />
          {errors.duration && (
            <ErrorMessage>{errors.duration.message}</ErrorMessage>
          )}
          <p className="text-xs font-light text-neutral-500/90">
            How long the {watchType} goes for in minutes.
          </p>
        </div>
        {errors.options && (
          <ErrorMessage>{errors.options.message}</ErrorMessage>
        )}
        {fields.map((fields, index) => (
          <div key={fields.id}>
            <OptionForm
              type={watchType}
              register={register}
              errors={errors}
              index={index}
              remove={remove}
            />
          </div>
        ))}
      </div>
      <div className="ml-auto space-x-5">
        {!defaultValues && (
          <Button variant="outlineLarge" type="reset">
            Clear
          </Button>
        )}
        <Button variant="normalLarge">
          {defaultValues ? `Update Class` : "Add Class"}
        </Button>
      </div>
    </form>
  );
}

function OptionForm({
  type,
  register,
  errors,
  index,
  remove,
}: {
  type: "Lecture" | "Tutorial" | "Workshop" | "Practical" | "Other";
  register: UseFormRegister<z.infer<typeof formSchema>>;
  errors: FieldErrors<z.infer<typeof formSchema>>;
  index: number;
  remove: UseFieldArrayRemove;
}) {
  return (
    <div className="relative rounded-md border px-2.5 py-2 pb-3">
      {index !== 0 && (
        <div className="absolute right-1 top-1">
          <Tooltip message="Remove" position="top">
            <Button variant="ghostIcon" onClick={() => remove(index)}>
              <HiOutlineMinusCircle />
            </Button>
          </Tooltip>
        </div>
      )}
      <div className="space-y-7">
        <div className="flex flex-row space-x-10">
          <div className=" w-full space-y-2">
            <label
              className="ml-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="option_day"
            >
              Day
            </label>

            <select
              className=" flex h-10 w-full appearance-none rounded-md border bg-white px-3 py-2 text-sm shadow-sm
          disabled:cursor-not-allowed disabled:opacity-50"
              {...register(`options.${index}.day`)}
            >
              <option value="Mon">Monday</option>
              <option value="Tue">Tuesday</option>
              <option value="Wed">Wednesday</option>
              <option value="Thu">Thursday</option>
              <option value="Fri">Friday</option>
            </select>
            {
              <ErrorMessage>
                {errors.options?.[index]?.day?.message}
              </ErrorMessage>
            }
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
            <input
              {...register(`options.${index}.start_time`)}
              id="start_time"
              placeholder="Start time"
              type="time"
              className={`flex h-10 w-full rounded-md border ${
                errors.options?.[index]?.start_time && "border-red-300"
              } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.options?.[index]?.start_time
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {
              <ErrorMessage>
                {errors.options?.[index]?.start_time?.message}
              </ErrorMessage>
            }
            <p className="text-xs font-light text-neutral-500/90">
              The time the {type} starts.
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
              {...register(`options.${index}.room`)}
              id="room"
              placeholder="Room"
              className={`flex h-10 w-full rounded-md border ${
                errors.options?.[index]?.room && "border-red-300"
              } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.options?.[index]?.room
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {
              <ErrorMessage>
                {errors.options?.[index]?.room?.message}
              </ErrorMessage>
            }
            <p className="text-xs font-light text-neutral-500/90">
              {`What room the ${type} will be in (if online write "-").`}
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
              {...register(`options.${index}.campus`)}
              id="campus"
              placeholder="Campus"
              className={`flex h-10 w-full rounded-md border ${
                errors.options?.[index]?.campus && "border-red-300"
              } px-3 py-2 text-sm shadow-sm file:border-0 
          file:bg-transparent file:font-medium placeholder:text-neutral-500/90 ${
            errors.options?.[index]?.campus
              ? " focus:ring-red-400/60"
              : " focus:ring-neutral-400/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {
              <ErrorMessage>
                {errors.options?.[index]?.campus?.message}
              </ErrorMessage>
            }
            <p className="text-xs font-light text-neutral-500/90">
              {`What campus the ${type} will be on. For example, RMIT students may
              write "Melbourne City" or "Canvas".`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-red-500">{children}</p>;
}

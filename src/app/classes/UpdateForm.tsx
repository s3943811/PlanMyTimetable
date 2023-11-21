"use client";
import { Button } from "~/components";
import ClassForm from "./ClassForm";
import { useClassForm } from "~/contexts/ClassFormContext";
import { HiTrash } from "react-icons/hi";
import { useUrlState } from "~/hooks/useUrlState";
import { usePreview } from "~/contexts/PreviewContext";
import { getCourseTypeString } from "~/lib/functions";
import { Preference } from "~/lib/definitions";

export default function UpdateForm() {
  const { active } = useClassForm();
  const { courseData } = usePreview();
  const { replaceMultiple, decode } = useUrlState();
  const handleDelete = () => {
    const index = courseData.findIndex(
      (item) =>
        item.title === active?.title &&
        item.courseCode === active.code &&
        getCourseTypeString(item.type) === active.type,
    );
    let events: Preference[] = [];
    const parsedPrefs = decode("pref");
    if (parsedPrefs) {
      events = parsedPrefs;
    }
    const eventIndex = events.findIndex(
      (item) =>
        item.title === active?.title &&
        item.courseCode === active.code &&
        getCourseTypeString(item.type) === active.type,
    );
    console.log(eventIndex);
    const classes = index !== -1 ? courseData.toSpliced(index, 1) : courseData;
    const newEvents = eventIndex !== -1 ? events.toSpliced(index, 1) : events;
    replaceMultiple([
      { element: classes, prefName: "state" },
      { element: newEvents, prefName: "pref" },
    ]);
  };
  if (courseData.length === 0) {
    return;
  }
  return (
    <div className="flex grow flex-col px-8 py-2">
      <div className="absolute right-9 top-[4.25rem]">
        {/* TODO: Add modal confirmation */}
        <Button onClick={handleDelete}>
          <HiTrash />
          Delete
        </Button>
      </div>
      <h3 className="text-base font-medium">
        {active?.title} - {active?.type}
      </h3>
      <p className="text-sm font-light text-neutral-500/90">
        Update class details. Remove unneeded classes.
      </p>
      <div
        data-orientation="horizontal"
        role="none"
        className=" my-3 h-[1px] w-full shrink-0 bg-neutral-200"
      ></div>
      {active && <ClassForm defaultValues={active} />}
    </div>
  );
}

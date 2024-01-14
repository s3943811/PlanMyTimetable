"use client";
import { Button } from "~/components";
import { HiTrash } from "react-icons/hi2";
import { useUrlState } from "~/hooks/useUrlState";
import toast from "react-hot-toast";
import { usePreview } from "~/contexts/PreviewContext";
import type { Preference } from "~/lib/definitions";

interface deleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: deleteButtonProps) {
  const { courseData } = usePreview();
  const { replaceMultiple, decode } = useUrlState();

  const handleDelete = () => {
    const index = courseData.findIndex((item) => item.id === id);
    let events: Preference[] = [];
    const parsedPrefs: Preference[] = decode("pref") as Preference[];
    if (parsedPrefs) {
      events = parsedPrefs;
    }
    const eventIndex = events.findIndex((item) => item.id === id);

    const classes = index !== -1 ? courseData.toSpliced(index, 1) : courseData;
    const newEvents =
      eventIndex !== -1 ? events.toSpliced(eventIndex, 1) : events;
    const newIndex = index >= courseData.length - 1 ? 0 : index + 1;

    replaceMultiple(
      [
        { element: classes, prefName: "state" },
        { element: newEvents, prefName: "pref" },
      ],
      classes.length === 0
        ? "/classes/add"
        : `/classes/${courseData[newIndex]?.id}`,
    );
    toast.success("Class deleted successfully");
  };

  return (
    <Button onClick={handleDelete}>
      <HiTrash />
      Delete
    </Button>
  );
}

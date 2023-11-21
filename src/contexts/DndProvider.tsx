"use client";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from "@dnd-kit/core";
import { usePreview, DragType } from "./PreviewContext";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Preference } from "~/lib/definitions";
import { useUrlState } from "~/hooks/useUrlState";

export function DndProvider({ children }: { children: React.ReactNode }) {
  const { setActiveCourse, events, setEvents, setDragType, setOver } =
    usePreview();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );
  const { searchParams, decode, replaceState, appendState } = useUrlState();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && over.data.current?.accepts === active.data.current?.course) {
      const preference: Preference = {
        title: active.data.current?.course.title,
        courseCode: active.data.current?.course.courseCode,
        type: active.data.current?.course.type,
        colour: active.data.current?.course.colour,
        time: over.data.current?.time,
      };
      const currentPref = searchParams.get("pref");
      /**
       * Search the events array and determine wherther the element being dragged matches an event
       * This was done so that elements can be dragged within the calendar and not be duplicated but rather moved
       */
      const isAlreadyEvent = events.find(
        (course) =>
          course.title === active.data.current?.course.title &&
          course.courseCode === active.data.current?.course.courseCode &&
          course.type === active.data.current?.course.type &&
          course.colour === active.data.current?.course.colour,
      );
      if (isAlreadyEvent) {
        /**
         * If we determine we have an element that has already been dropped once
         * we then decode the url params and replace the element with the new preference and re-encode it
         * replacing the previous string
         * uing the setState (setEvents) is key has the useEffect is looking for if the length of currentPref (searchParams.getAll("pref"))
         * changes, which dosen't occur here since its already been dropped
         * this was done to keep the other preferences
         */
        let parsedPrefs = decode("pref");
        parsedPrefs = parsedPrefs.map((item: Preference) => {
          if (
            item.title === preference.title &&
            item.courseCode === preference.courseCode &&
            item.type === preference.type &&
            item.colour === preference.colour
          ) {
            return preference;
          }
          return item;
        });
        // replace the old "event" with this new one
        replaceState(parsedPrefs, "pref");
        setEvents(parsedPrefs);
      } else {
        // add a new event
        appendState(preference, "pref");
      }
    }
    setOver(false);
    setActiveCourse(null);
  }

  function handleDragStart(event: DragStartEvent) {
    setDragType(
      event.active.id?.toString().includes("event")
        ? DragType.event
        : DragType.course,
    );
    setActiveCourse(event.active.data.current?.course);
  }

  function handleDragCancel() {
    setActiveCourse(null);
    setOver(false);
  }

  function handleDragOver(event: DragOverEvent) {
    if (event.over) {
      setOver(true);
    } else {
      setOver(false);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      modifiers={[restrictToWindowEdges]}
    >
      {children}
    </DndContext>
  );
}

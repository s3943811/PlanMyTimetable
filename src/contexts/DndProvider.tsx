"use client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { usePreview } from "./PreviewContext";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import type { Course, Preference, Time } from "~/lib/definitions";
import { useUrlState } from "~/hooks/useUrlState";
import { createContext, useContext, useState } from "react";

interface DnDContext {
  dragType: DragType | null;
  setDragType: (dragType: DragType | null) => void;
  show: (over: boolean) => void;
  hidden: boolean;
  setMobileClassListSheetOpen: (over: boolean) => void;
  openMobileClassListSheet: boolean;
}

const DnDContext = createContext({} as DnDContext);
export function useDnD() {
  return useContext(DnDContext);
}

export enum DragType {
  event,
  course,
}

export function DndProvider({ children }: { children: React.ReactNode }) {
  const [dragType, setDragType] = useState<DragType | null>(null);
  const [hidden, show] = useState(true);
  const [openMobileClassListSheet, setMobileClassListSheetOpen] =
    useState(false);

  const { setActiveCourse, events, setEvents } = usePreview();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );
  const { decode, replaceState, appendState } = useUrlState();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && over.data.current?.accepts === active.data.current?.course) {
      const activeCourse = active.data.current?.course as Course;
      const activeTime = over.data.current?.time as Time;
      const preference: Preference = {
        title: activeCourse.title,
        courseCode: activeCourse.courseCode,
        type: activeCourse.type,
        colour: activeCourse.colour,
        time: activeTime,
      };
      /**
       * Search the events array and determine wherther the element being dragged matches an event
       * This was done so that elements can be dragged within the calendar and not be duplicated but rather moved
       */
      const isAlreadyEvent = events.find(
        (course) =>
          course.title === activeCourse.title &&
          course.courseCode === activeCourse.courseCode &&
          course.type === activeCourse.type &&
          course.colour === activeCourse.colour,
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
        let parsedPrefs = decode("pref") as Preference[];
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
      setMobileClassListSheetOpen(false);
    }
    show(true);
    setActiveCourse(null);
  }

  function handleDragStart(event: DragStartEvent) {
    setDragType(
      event.active.id?.toString().includes("event")
        ? DragType.event
        : DragType.course,
    );
    setActiveCourse(event.active.data.current?.course as Course);
    show(false);
  }

  function handleDragCancel() {
    setActiveCourse(null);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToWindowEdges]}
    >
      <DnDContext.Provider
        value={{
          dragType,
          setDragType,
          show,
          hidden,
          openMobileClassListSheet,
          setMobileClassListSheetOpen,
        }}
      >
        {children}
      </DnDContext.Provider>
    </DndContext>
  );
}

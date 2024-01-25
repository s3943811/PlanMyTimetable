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
      /**
       * If a time is grouped, i.e a single preference but multiple events in the calendar
       * then we need to do the following:
       * find all the matching groupped times from the course
       * set the preference to grouped and create all the preferences that are grouped
       */
      let preference: Preference | Array<Preference>;
      if (activeTime.grouped) {
        const firstTwoDigits = activeTime.grouped_code.slice(0, 2);
        const pattern = new RegExp(`^${firstTwoDigits}-P[1-9]$`);

        preference = activeCourse.options
          .filter((time) => time.grouped && pattern.test(time.grouped_code))
          .map((option) => ({
            id: activeCourse.id,
            title: activeCourse.title,
            courseCode: activeCourse.courseCode,
            type: activeCourse.type,
            colour: activeCourse.colour,
            grouped: true,
            grouped_code: option.grouped ? option.grouped_code : "",
            time: option,
          }));
      } else {
        preference = {
          id: activeCourse.id,
          title: activeCourse.title,
          courseCode: activeCourse.courseCode,
          type: activeCourse.type,
          colour: activeCourse.colour,
          grouped: false,
          time: activeTime,
        };
      }
      /**
       * Search the events array and determine wherther the element being dragged matches an event
       * This was done so that elements can be dragged within the calendar and not be duplicated but rather moved
       */
      const isAlreadyEvent = events.find(
        (course) => course.id === activeCourse.id,
      );
      if (isAlreadyEvent) {
        /**
         * If we determine we have an element that has already been dropped once
         * we then decode the url params and replace the element with the new preference and re-encode it
         * replacing the previous string
         * the setState here is for UX reasons, without it there is a slight delay between the update whereas with it its almost instant
         *
         *
         * Grouped Preferences: Here we check if the preference we have created is an array - if so its a grouped event
         * if its grouped all we do is filter the prefs to remove the old grouped items
         * then reconstruct the array with the filtered preferences and our new grouped preferences
         * for non-grouped its similar except what we are doing is just mapping over the prefs
         * and if the ids match return the new preference else return the old one.
         */
        let parsedPrefs = decode("pref") as Preference[];
        if (Array.isArray(preference)) {
          parsedPrefs = parsedPrefs.filter(
            (item) => item.id !== activeCourse.id,
          );
          parsedPrefs = [...parsedPrefs, ...preference];
        } else if (!Array.isArray(preference)) {
          parsedPrefs = parsedPrefs.map((item: Preference) => {
            if (!Array.isArray(preference) && item.id === preference.id) {
              return preference;
            }
            return item;
          });
        }

        // replace the old "event" with this new one
        replaceState(parsedPrefs, "pref");
        setEvents(parsedPrefs);
      } else {
        // add a new event(s)
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
      autoScroll={false}
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

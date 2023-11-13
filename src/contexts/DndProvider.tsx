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
} from "@dnd-kit/core";
import { useCallback } from "react";
import { usePreview, DragType } from "./PreviewContext";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Preference } from "~/lib/definitions";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
export function DndProvider({ children }: { children: React.ReactNode }) {
  const { setActiveCourse, events, setEvents, setDragType } = usePreview();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

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
      const currentPref = searchParams.getAll("pref");
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
        let parsedPrefs = currentPref.map((item) =>
          JSON.parse(decodeURIComponent(item)),
        );
        parsedPrefs = parsedPrefs.map((item) => {
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
        const newPrefs = parsedPrefs.map((element) => {
          return createQueryString(
            "pref",
            encodeURIComponent(JSON.stringify(element)),
          );
        });
        router.replace(`${pathname}?${newPrefs.join("&")}`, { scroll: false });
        setEvents(parsedPrefs);
      } else {
        const newPref = createQueryString(
          "pref",
          encodeURIComponent(JSON.stringify(preference)),
        );
        if (currentPref) {
          const url = `${pathname}?${searchParams}&${newPref}`;
          console.log(url);
          router.push(url, { scroll: false });
        } else {
          console.log("3");
          router.push(`${pathname}?${searchParams}&${newPref}`, {
            scroll: false,
          });
        }
      }
    }
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
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToWindowEdges]}
    >
      {children}
    </DndContext>
  );
}

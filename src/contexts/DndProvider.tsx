"use client";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useCallback } from "react";
import { usePreview } from "./PreviewContext";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Preference } from "~/lib/definitions";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
export function DndProvider({ children }: { children: React.ReactNode }) {
  const { setActiveCourse } = usePreview();
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
      const newPref = createQueryString(
        "pref",
        encodeURIComponent(JSON.stringify(preference)),
      );
      const currentPref = searchParams.get("pref");
      if (currentPref) {
        const url = `${pathname}?${searchParams}&${newPref}`;
        console.log(url);
        router.push(url);
      } else {
        console.log("3");
        router.push(`${pathname}?${searchParams}&${newPref}`);
      }
    }
    setActiveCourse(null);
  }
  function handleDragStart(event: DragStartEvent) {
    setActiveCourse(event.active.data.current?.course);
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      modifiers={[restrictToWindowEdges]}
    >
      {children}
    </DndContext>
  );
}

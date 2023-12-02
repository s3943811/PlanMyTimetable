"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUrlState } from "~/hooks/useUrlState";
import type { Course, Preference } from "~/lib/definitions";

interface PreviewProviderProps {
  children: React.ReactNode;
}
interface PreviewContext {
  activeCourse: Course | null;
  setActiveCourse: (course: Course | null) => void;
  events: Array<Preference>;
  setEvents: (preference: Array<Preference>) => void;
  dragType: DragType | null;
  setDragType: (dragType: DragType | null) => void;
  over: boolean;
  setOver: (over: boolean) => void;
  courseData: Course[];
  setCourseData: (course: Course[]) => void;
}
export enum DragType {
  event,
  course,
}
const PreviewContext = createContext({} as PreviewContext);
export function usePreview() {
  return useContext(PreviewContext);
}
export function PreviewProvider({ children }: PreviewProviderProps) {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [dragType, setDragType] = useState<DragType | null>(null);
  const [over, setOver] = useState<boolean>(false);

  const { decode, searchParams } = useUrlState();
  const [events, setEvents] = useState<Array<Preference>>(
    (decode("pref") as Preference[]) ?? [],
  );
  const [courseData, setCourseData] = useState<Course[]>(
    decode("state") as Course[],
  );
  const state = searchParams.get("state");
  useEffect(() => {
    const data = decode("state") as Course[];
    setCourseData(data);
  }, [state, decode]);
  return (
    <PreviewContext.Provider
      value={{
        activeCourse,
        setActiveCourse,
        events,
        setEvents,
        dragType,
        setDragType,
        over,
        setOver,
        courseData,
        setCourseData,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

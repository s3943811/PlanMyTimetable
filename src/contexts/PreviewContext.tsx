"use client";
import React, { createContext, useContext, useState } from "react";
import { Course, Preference } from "~/lib/definitions";

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
  const [events, setEvents] = useState<Array<Preference>>([]);
  const [dragType, setDragType] = useState<DragType | null>(null);
  const [over, setOver] = useState<boolean>(false);
  // console.log(over);
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
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

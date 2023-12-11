"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUrlState } from "~/hooks/useUrlState";
import type { Course, Preference, BlockedEvent } from "~/lib/definitions";

interface PreviewProviderProps {
  children: React.ReactNode;
}
interface PreviewContext {
  activeCourse: Course | null;
  setActiveCourse: (course: Course | null) => void;
  events: Array<Preference>;
  setEvents: (preference: Array<Preference>) => void;
  courseData: Course[];
  setCourseData: (course: Course[]) => void;
  blockedEvents: BlockedEvent[];
  setBlockedEvents: (events: BlockedEvent[]) => void;
}

const PreviewContext = createContext({} as PreviewContext);
export function usePreview() {
  return useContext(PreviewContext);
}
export function PreviewProvider({ children }: PreviewProviderProps) {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const { decode, searchParams } = useUrlState();
  const [blockedEvents, setBlockedEvents] = useState<BlockedEvent[]>(
    (decode("blocked") as BlockedEvent[]) ?? [],
  );
  const [events, setEvents] = useState<Array<Preference>>(
    (decode("pref") as Preference[]) ?? [],
  );
  const [courseData, setCourseData] = useState<Course[]>(
    (decode("state") as Course[]) ?? [],
  );

  const state = searchParams.get("state");
  useEffect(() => {
    const data = decode("state") as Course[];
    if (data) {
      setCourseData(data);
    }
  }, [state, decode]);
  const blocked = searchParams.get("blocked");
  useEffect(() => {
    const data = decode("blocked") as BlockedEvent[];
    if (data) {
      setBlockedEvents(data);
    }
  }, [blocked, decode]);

  return (
    <PreviewContext.Provider
      value={{
        activeCourse,
        setActiveCourse,
        events,
        setEvents,
        courseData,
        setCourseData,
        setBlockedEvents,
        blockedEvents,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

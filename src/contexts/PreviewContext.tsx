"use client"
import React, { createContext, useContext, useState } from "react";
import { Course } from "~/lib/definitions";

interface PreviewProviderProps {
  children: React.ReactNode;
}
interface PreviewContext {
  activeCourse: Course | null;
  setActiveCourse: (course: Course | null) => void;
}
const PreviewContext = createContext({} as PreviewContext);

export function usePreview() {
  return useContext(PreviewContext);
}
export function PreviewProvider({ children }: PreviewProviderProps) {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  return (
    <PreviewContext.Provider value={{ activeCourse, setActiveCourse }}>
      {children}
    </PreviewContext.Provider>
  );
}

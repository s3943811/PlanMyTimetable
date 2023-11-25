"use client";
import React, { createContext, useContext, useState } from "react";
import { formSchema } from "~/app/classes/ClassForm";
import * as z from "zod";

interface ClassFormProviderProps {
  children: React.ReactNode;
}

interface ClassFormContext {
  active: z.infer<typeof formSchema> | null;
  setActive: (course: z.infer<typeof formSchema> | null) => void;
}

const ClassFormContext = createContext({} as ClassFormContext);
export function useClassForm() {
  return useContext(ClassFormContext);
}

export function ClassFormProvider({ children }: ClassFormProviderProps) {
  const [active, setActive] = useState<z.infer<typeof formSchema> | null>(null);

  return (
    <ClassFormContext.Provider value={{ active, setActive }}>
      {children}
    </ClassFormContext.Provider>
  );
}

"use client";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { usePreview } from "./PreviewContext";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
export function DndProvider({ children }: { children: React.ReactNode }) {
  const { setActiveCourse } = usePreview();
  const [isDropped, setIsDropped] = useState(false);
  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
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

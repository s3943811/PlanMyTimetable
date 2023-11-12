import Link from "next/link";
import ClassListSidebar from "./(Planner)/ClassListSidebar";
import Calendar from "./(Planner)/Calendar";
import { PreviewProvider } from "~/contexts/PreviewContext";
import { DndProvider } from "~/contexts/DndProvider";

export default function HomePage() {
  return (
    <main className="flex w-screen flex-row">
      <PreviewProvider>
        <DndProvider>
          <ClassListSidebar />
          <Calendar />
        </DndProvider>
      </PreviewProvider>
    </main>
  );
}

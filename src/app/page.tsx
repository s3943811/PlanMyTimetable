import ClassListSidebar from "./(Planner)/ClassListSidebar";
import Calendar from "./(Planner)/Calendar";
import ClassList from "./(Planner)/ClassList";
import { PreviewProvider } from "~/contexts/PreviewContext";
import { DndProvider } from "~/contexts/DndProvider";
import { AllocatedPopover } from "~/components";

export default function HomePage() {
  return (
    <PreviewProvider>
      <DndProvider>
        <ClassListSidebar>
          <ClassList />
          <AllocatedPopover />
        </ClassListSidebar>
        <Calendar />
      </DndProvider>
    </PreviewProvider>
  );
}

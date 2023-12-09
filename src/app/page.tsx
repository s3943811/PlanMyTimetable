import ClassListSidebar from "./(Planner)/ClassListSidebar";
import Calendar from "./(Planner)/Calendar";
import ClassList from "./(Planner)/ClassList";
import { PreviewProvider } from "~/contexts/PreviewContext";
import { DndProvider } from "~/contexts/DndProvider";
import { AllocatedPopover, DragOverlay } from "~/components";

export default function HomePage() {
  return (
    <PreviewProvider>
      <DndProvider>
        <ClassListSidebar>
          <div className="hidden overflow-y-auto overflow-x-hidden scrollbar-hide md:block">
            <ClassList isMobile={false} />
          </div>
          <div
            className={`hidden dark:border-t-neutral-700 dark:bg-neutral-900 md:sticky md:bottom-0 md:flex md:h-16 md:max-w-full md:flex-col md:items-center md:gap-2 md:border-t md:bg-white md:p-2 md:py-4`}
          >
            <AllocatedPopover />
          </div>
        </ClassListSidebar>
        <Calendar />
        <DragOverlay />
      </DndProvider>
    </PreviewProvider>
  );
}

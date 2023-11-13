import {
  ClassCard,
  ClassCardClient,
  DragOverlay,
  AllocatedPopover,
} from "~/components";
import { CourseType } from "~/lib/definitions";
import { ClassListData } from "~/data/data";

export default function ClassListSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen min-h-screen w-64 min-w-fit flex-col gap-3 overflow-auto border-r p-3">
      {ClassListData.map((item) => (
        <ClassCardClient
          key={item.courseCode + CourseType[item.type]}
          course={item}
        >
          <ClassCard
            key={item.courseCode + CourseType[item.type]}
            course={item}
          />
        </ClassCardClient>
      ))}
      <DragOverlay />
      <AllocatedPopover />
    </aside>
  );
}

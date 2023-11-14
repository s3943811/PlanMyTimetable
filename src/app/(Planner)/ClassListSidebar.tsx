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
    <aside className="sticky top-0 flex h-screen min-h-screen w-64 min-w-fit flex-col gap-3 overflow-y-auto overflow-x-hidden border-r p-3">
      <div className=" inline-flex border-b border-b-neutral-50 px-3 py-1 font-medium">
        <h2 className="inline-flex items-center gap-1 text-md">Classes</h2>
      </div>
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

import {
  ClassCard,
  ClassCardClient,
  DragOverlay,
  AllocatedPopover,
  Button,
} from "~/components";
import { CourseType } from "~/lib/definitions";
import { ClassListData } from "~/data/data";
import { HiPlus, HiOutlinePlusCircle } from "react-icons/hi";

export default function ClassListSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen min-h-screen w-64 min-w-fit flex-col gap-3 overflow-y-auto overflow-x-hidden border-r p-3">
      <div className=" inline-flex w-72 justify-between border-b border-b-neutral-50 py-1 pl-3 pr-1">
        <h2 className="inline-flex items-center gap-1 text-md font-medium">
          Classes
        </h2>
        <Button variant="outline">
          <HiOutlinePlusCircle />
          Add
        </Button>
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

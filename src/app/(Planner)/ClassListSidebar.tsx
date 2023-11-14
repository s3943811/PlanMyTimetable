import {
  ClassCard,
  ClassCardClient,
  DragOverlay,
  AllocatedPopover,
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
        {/* focus:ring-2 focus:ring-neutral-400/50 focus:ring-offset-2 focus:ring-offset-neutral-50 */}
        <button className="inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50 ">
          <HiOutlinePlusCircle />
          Add
        </button>
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

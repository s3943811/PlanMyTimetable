import {
  ClassCard,
  ClassCardClient,
  DragOverlay,
  AllocatedPopover,
  RetainLink,
  buttonVariants,
  Tooltip,
} from "~/components";
import { CourseType } from "~/lib/definitions";
import { ClassListData } from "~/data/data";
import { HiOutlineAdjustments, HiOutlinePlusCircle } from "react-icons/hi";

export default function ClassListSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen min-h-screen w-64 min-w-fit flex-col border-r p-3">
      <div className=" inline-flex w-72 justify-between border-b border-b-neutral-50 py-1 pl-3 pr-1">
        <h2 className="inline-flex items-center gap-1 text-md font-medium">
          Classes
        </h2>
        <div className="inline-flex gap-1">
          <Tooltip message={"Add"}>
            <RetainLink
              className={buttonVariants["outlineIcon"]}
              href="/classes/add"
            >
              <HiOutlinePlusCircle />
            </RetainLink>
          </Tooltip>
          <Tooltip message={"Manage"}>
            <RetainLink
              className={buttonVariants["outlineIcon"]}
              href="/classes/manage"
            >
              <HiOutlineAdjustments />
            </RetainLink>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden pb-4 pt-1 scrollbar-hide">
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
      </div>
      <AllocatedPopover />
    </aside>
  );
}

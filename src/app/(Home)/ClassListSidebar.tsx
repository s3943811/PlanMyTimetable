import {
  RetainLink,
  buttonVariants,
  Tooltip,
  AllocatedPopover,
  BlockedDialog,
} from "~/components";
import { HiOutlinePlusCircle } from "react-icons/hi";
import SidebarLayout from "./SidebarLayout";
import MobileClassList from "./DraggableMobileClassList";

export default function ClassListSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayout>
      <div className=" inline-flex justify-between border-b px-3 py-4 dark:border-b-neutral-700">
        <h2 className="inline-flex items-center gap-1 text-md font-medium">
          <MobileClassList />
          Classes
        </h2>
        <div className="inline-flex gap-1">
          <div className="md:hidden">
            <AllocatedPopover />
          </div>
          <RetainLink
            // data-umami-event="add button homepage"
            className={buttonVariants.outlineIcon}
            href="/classes/add"
          >
            <HiOutlinePlusCircle /> Add
          </RetainLink>
          <BlockedDialog />
        </div>
      </div>
      {children}
    </SidebarLayout>
  );
}

import { RetainLink, buttonVariants, Tooltip } from "~/components";
import { HiOutlinePlusCircle } from "react-icons/hi";
import SidebarLayout from "./SidebarLayout";

export default function ClassListSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayout>
      <div className=" inline-flex justify-between border-b px-3 py-4 dark:border-b-neutral-700">
        <h2 className="inline-flex items-center gap-1 text-md font-medium">
          Classes
        </h2>
        <div className="inline-flex gap-1">
          <Tooltip message={"Add"} position="bottom">
            <RetainLink
              className={buttonVariants.outlineIcon}
              href="/classes/add"
            >
              <HiOutlinePlusCircle /> Add
            </RetainLink>
          </Tooltip>
        </div>
      </div>
      {children}
    </SidebarLayout>
  );
}

import { RetainLink, buttonVariants, Tooltip } from "~/components";
import { HiOutlineAdjustments, HiOutlinePlusCircle } from "react-icons/hi";

export default function ClassListSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="sticky top-0 flex h-screen min-h-screen w-64 min-w-fit flex-col border-r ">
      <div className=" inline-flex grow justify-between border-b px-3 py-4">
        <h2 className="inline-flex items-center gap-1 text-md font-medium">
          Classes
        </h2>
        <div className="inline-flex gap-1">
          <Tooltip message={"Edit"} position="bottom">
            <RetainLink className={buttonVariants.outlineIcon} href="/classes">
              <HiOutlineAdjustments />
            </RetainLink>
          </Tooltip>
          <Tooltip message={"Add"} position="bottom">
            <RetainLink
              className={buttonVariants.outlineIcon}
              href="/classes/add"
            >
              <HiOutlinePlusCircle />
            </RetainLink>
          </Tooltip>
        </div>
      </div>
      {children}
    </aside>
  );
}

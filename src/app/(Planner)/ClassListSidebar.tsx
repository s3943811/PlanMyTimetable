import { RetainLink, buttonVariants, Tooltip } from "~/components";
import { HiOutlineAdjustments, HiOutlinePlusCircle } from "react-icons/hi";

export default function ClassListSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="sticky top-0 flex h-screen min-h-screen w-64 min-w-fit flex-col border-r p-3">
      <div className=" inline-flex w-72 justify-between border-b border-b-neutral-50 py-1 pl-3 pr-1">
        <h2 className="inline-flex items-center gap-1 text-md font-medium">
          Classes
        </h2>
        <div className="inline-flex gap-1">
          <Tooltip message={"Edit"}>
            <RetainLink
              className={buttonVariants["outlineIcon"]}
              href="/classes"
            >
              <HiOutlineAdjustments />
            </RetainLink>
          </Tooltip>
          <Tooltip message={"Add"}>
            <RetainLink
              className={buttonVariants["outlineIcon"]}
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

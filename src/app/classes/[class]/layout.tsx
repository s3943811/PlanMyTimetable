import { HiOutlinePlusCircle } from "react-icons/hi";
import { RetainLink, Tooltip, buttonVariants } from "~/components";
import ClassList from "../ClassList";

export default function ClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full grow flex-col">
      <div className="sticky top-0 z-20 inline-flex w-full justify-between border-b bg-white pb-2 pl-5 pr-3 pt-4 dark:border-b-neutral-700 dark:bg-neutral-900 dark:text-white">
        <h2 className="inline-flex items-center gap-1 pl-1 text-md font-medium">
          Classes
        </h2>
        <div className="inline-flex gap-1">
          <Tooltip message={"Add"} position="bottom">
            <RetainLink
              className={buttonVariants.outlineIcon}
              href="/classes/add"
            >
              <HiOutlinePlusCircle />
              Add
            </RetainLink>
          </Tooltip>
        </div>
      </div>
      <div className="flex grow flex-row">
        <ClassList />
        {children}
      </div>
    </section>
  );
}

import ClassList from "./ClassList";
import UpdateForm from "./UpdateForm";
import { PreviewProvider } from "~/contexts/PreviewContext";
import { RetainLink, buttonVariants, Tooltip } from "~/components";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { ClassFormProvider } from "~/contexts/ClassFormContext";

export default function Page() {
  return (
    <PreviewProvider>
      <section className="flex w-full grow flex-col">
        <div className="sticky top-0 z-20 inline-flex w-full justify-between border-b bg-white pb-2 pl-5 pr-3 pt-4">
          <h2 className="inline-flex items-center gap-1 pl-1 text-md font-medium">
            Classes
          </h2>
          <div className="inline-flex gap-1">
            <Tooltip message={"Add"} position="bottom">
              <RetainLink
                className={buttonVariants["outlineIcon"]}
                href="/classes/add"
              >
                <HiOutlinePlusCircle />
                Add
              </RetainLink>
            </Tooltip>
          </div>
        </div>
        <div className="flex grow flex-row">
          <ClassFormProvider>
            <ClassList />
            <UpdateForm />
          </ClassFormProvider>
        </div>
      </section>
    </PreviewProvider>
  );
}

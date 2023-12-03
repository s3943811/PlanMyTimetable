import ClassForm from "../../ClassForm";
import { RetainLink } from "~/components";

export default function Page() {
  return (
    <>
      <div className="mt-1 inline-flex h-10 w-fit items-center justify-center gap-3 rounded-lg dark:bg-neutral-900 dark:text-white">
        <RetainLink
          href="/classes/add"
          className={`inline-flex w-full items-center justify-center rounded-md py-1.5 font-light text-neutral-500/90 transition-all dark:text-neutral-400`}
        >
          Automatic
        </RetainLink>
        <span>/</span>
        <RetainLink
          href="/classes/add/manual"
          className={`inline-flex w-full items-center justify-center rounded-md py-1.5 pr-3 font-medium underline decoration-[1.5px] underline-offset-[7px] transition-all`}
        >
          <p>Manual</p>
        </RetainLink>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className=" my-3 h-[1px] w-full shrink-0 bg-neutral-200 dark:bg-neutral-600"
      ></div>
      <ClassForm></ClassForm>
    </>
  );
}

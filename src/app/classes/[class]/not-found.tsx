import { buttonVariants } from "~/components";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import RetainParamsLink from "~/components/Link/RetainParamsLink";
import { cn } from "~/lib/utils";
export default function NotFound() {
  return (
    <div className=" flex w-full flex-col items-center justify-center gap-3">
      <div className=" rounded-3xl bg-neutral-200 p-4 dark:bg-neutral-800">
        <HiOutlineExclamationCircle fontSize={"4rem"} />
      </div>
      <h1 className="text-2xl font-medium">Not found</h1>
      <p className="text-neu text-sm">
        This class could not be found. Please try again.
      </p>
      <RetainParamsLink
        href="/"
        className={cn(buttonVariants.normalLarge, "mt-3")}
      >
        Return home
      </RetainParamsLink>
    </div>
  );
}

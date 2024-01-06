import BlockedForm from "./BlockedForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add blocked time",
};
export default function Page() {
  return (
    <>
      <p className=" text-neutral-700 dark:text-neutral-200">
        Please note blocked times hide options for being displayed if they are
        in that blocked time.
      </p>
      <BlockedForm />
    </>
  );
}

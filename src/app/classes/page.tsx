"use client";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RetainLink } from "~/components";
import { usePreview } from "~/contexts/PreviewContext";
import { useUrlState } from "~/hooks/useUrlState";

export default function Page() {
  const { courseData } = usePreview();
  const { redirect } = useUrlState();
  if (courseData.length !== 0) {
    const redirectURL = `/classes/${courseData[0]?.id}`;
    // console.log(redirectURL);
    redirect(redirectURL);
  } else {
    return (
      <div className=" flex h-[100dvh] grow flex-col items-center justify-center gap-3 dark:bg-neutral-900">
        <HiOutlineAcademicCap size={96} />
        <p>{`You haven't added any classes yet.`} </p>
        <RetainLink
          className="under font-medium underline decoration-[1.5px] underline-offset-[7px] transition-all hover:font-semibold"
          href={"/classes/add"}
        >
          Add a class now.
        </RetainLink>
      </div>
    );
  }
}

"use client";
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
    redirect("/classes/add");
  }
}

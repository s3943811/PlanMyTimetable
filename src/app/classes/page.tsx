"use client";
import { usePreview } from "~/contexts/PreviewContext";
import { useUrlState } from "~/hooks/useUrlState";
import { getCourseTypeString } from "~/lib/functions";

export default function Page() {
  const { courseData } = usePreview();
  const { redirect } = useUrlState();
  if (courseData) {
    const redirectURL = `/classes/${courseData[0]
      ?.courseCode}-${getCourseTypeString(courseData[0]!.type)}`;
    console.log(redirectURL);
    redirect(redirectURL);
  } else {
    console.log("here");
  }
}

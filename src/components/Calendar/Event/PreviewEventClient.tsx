"use client";

import { usePreview } from "~/contexts/PreviewContext";
import PreviewEvent from "./PreviewEvent";
import { Time } from "~/lib/definitions";

export default function PreviewEventClient() {
  const { activeCourse } = usePreview();

  return activeCourse?.options.map((time: Time) => (
    <PreviewEvent time={time} />
  ));
}

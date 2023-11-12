"use client";
import { useSearchParams } from "next/navigation";
import Event from "./Event";
import { useEffect } from "react";
import React from "react";
import { usePreview } from "~/contexts/PreviewContext";
export default function EventList() {
  const searchParams = useSearchParams();
  const pref = searchParams.getAll("pref");
  const { events, setEvents } = usePreview();

  useEffect(() => {
    const parsedPrefs = pref.map((item) =>
      JSON.parse(decodeURIComponent(item)),
    );
    setEvents(parsedPrefs);
  }, [pref.length]);

  return events.map((item) => (
    <React.Fragment key={item.courseCode + item.type}>
      <Event
        title={item.title}
        type={item.type}
        colour={item.colour}
        time={item.time}
      />
    </React.Fragment>
  ));
}

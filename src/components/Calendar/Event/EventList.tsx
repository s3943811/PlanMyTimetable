"use client";
import Event from "./Event";
import EventClient from "./EventClient";
import { useEffect } from "react";
import React from "react";
import { usePreview } from "~/contexts/PreviewContext";
import { useUrlState } from "~/hooks/useUrlState";

export default function EventList() {
  const { searchParams, decode } = useUrlState();
  const pref = searchParams.get("pref");
  const { events, setEvents } = usePreview();

  useEffect(() => {
    const parsedPrefs = decode("pref");
    if (parsedPrefs) {
      console.log(parsedPrefs);
      setEvents(parsedPrefs);
    }
  }, [pref]);

  return events.map((item) => (
    <React.Fragment key={item.courseCode + item.type}>
      <EventClient preference={item}>
        <Event
          title={item.title}
          type={item.type}
          colour={item.colour}
          time={item.time}
        />
      </EventClient>
    </React.Fragment>
  ));
}

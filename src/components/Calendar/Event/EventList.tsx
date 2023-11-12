"use client";
import { useSearchParams } from "next/navigation";
import Event from "./Event";
import { Preference } from "~/lib/definitions";
import { useEffect, useState } from "react";
import React from "react";
export default function EventList() {
  const searchParams = useSearchParams();
  const pref = searchParams.get("pref");
  const [events, setEvents] = useState<Array<Preference>>([]);

  useEffect(() => {
    pref && setEvents(JSON.parse(pref));
    console.log(events);
  }, [pref]);

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

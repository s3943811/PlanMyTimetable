"use client";
import Event from "./Event";
import EventClient from "./EventClient";
import { useEffect, useMemo } from "react";
import React from "react";
import { usePreview } from "~/contexts/PreviewContext";
import { useUrlState } from "~/hooks/useUrlState";
import { useFriend } from "~/contexts/FriendContext";
import { getDayEnum, getRowIndex, groupByStartAndDay } from "~/lib/functions";
import {
  ActiveCourseFriendPreview,
  FriendEvent,
  FriendClashEvent,
} from "./FriendEventList";
import Clash from "./Clash";

import {
  CourseType,
  Preference,
  colStart,
  rowSpans,
  rowStart,
} from "~/lib/definitions";

export default function EventList() {
  const { searchParams, decode } = useUrlState();
  const pref = searchParams.get("pref");
  const { events, setEvents } = usePreview();
  const { friendData } = useFriend();

  if (!friendData) {
    return events.map((item) => {
      const rowSpan: number = item.time.duration / 30;
      return (
        <div
          className={`z-10 ${colStart[getDayEnum(item.time.day)! + 2]} ${
            rowStart[getRowIndex(item.time.start)]
          } ${
            rowSpans[rowSpan]
          } animate-pulse rounded-md bg-neutral-200/50 py-2`}
        ></div>
      );
    });
  }

  const clashes: (Preference & { originalType: string })[][] = useMemo(() => {
    const combined = [
      ...events.map((event) => ({ ...event, originalType: "event" })),
      ...friendData
        .filter((friend) => friend.active)
        .flatMap((friend) =>
          friend.state.map((item) => ({ ...item, originalType: "friend" })),
        ),
    ];

    return groupByStartAndDay(
      combined.filter((obj, index, self) => {
        return (
          self.findIndex(
            (t) =>
              t.title === obj.title &&
              t.courseCode === obj.courseCode &&
              t.type === obj.type &&
              t.time.start === obj.time.start &&
              t.time.day === obj.time.day &&
              t.time.campus_description === obj.time.campus_description,
          ) === index
        );
      }),
    ).filter((item: Preference[]) => item.length > 1);
  }, [events, friendData]);

  const eventsNoClashes = useMemo(
    () =>
      events.filter(
        (event) => !clashes.flat().some((item) => item.time === event.time),
      ),
    [events, clashes],
  );

  const friendsNoClashes = useMemo(() => {
    const flatClashes = clashes.flat();
    const eventTimes = new Set(
      eventsNoClashes.map((event) => `${event.time.start}-${event.time.day}`),
    );

    const preferenceMap: { [key: string]: string[] } = {};

    friendData
      .filter((friend) => friend.active)
      .forEach((friend) => {
        friend.state.forEach((stateItem) => {
          if (
            !flatClashes.some(
              (clash) =>
                clash.title === stateItem.title &&
                clash.courseCode === stateItem.courseCode &&
                clash.type === stateItem.type &&
                clash.time.start === stateItem.time.start &&
                clash.time.day === stateItem.time.day &&
                clash.time.campus_description ===
                  stateItem.time.campus_description,
            ) &&
            !eventTimes.has(`${stateItem.time.start}-${stateItem.time.day}`)
          ) {
            const key = `${stateItem.title}+${stateItem.courseCode}+${stateItem.type}+${stateItem.time.start}+${stateItem.time.day}+${stateItem.time.duration}+${stateItem.time.campus_description}+${stateItem.time.location}`;
            if (!preferenceMap[key]) {
              preferenceMap[key] = [];
            }
            preferenceMap[key]?.push(friend.name);
          }
        });
      });

    return Object.entries(preferenceMap).map(([key, friends]) => {
      const [
        title,
        courseCode,
        type,
        start,
        day,
        duration,
        campus_description,
        location,
      ] = key.split("+") as [
        string,
        string,
        CourseType,
        string,
        string,
        number,
        string,
        string,
      ];
      return {
        title,
        courseCode,
        type,
        time: { start, day, duration, campus_description, location },
        friends,
      } as Omit<Preference, "colour"> & { friends: string[] };
    });
  }, [friendData, clashes, eventsNoClashes]);

  useEffect(() => {
    console.log(clashes);
    const parsedPrefs = decode("pref");
    if (parsedPrefs) {
      // console.log(parsedPrefs);
      setEvents(parsedPrefs);
    }
  }, [pref]);

  return (
    <>
      {eventsNoClashes.map((item) => (
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
      ))}
      {friendsNoClashes.map((item) => (
        <React.Fragment key={item.courseCode + item.type + item.title}>
          <FriendEvent item={item} />
        </React.Fragment>
      ))}
      {clashes.map((group, index) => {
        const largestDuration = group.reduce((max, item) => {
          return item.time.duration > max ? item.time.duration : max;
        }, 0);
        const rowSpan: number = largestDuration / 30;
        return (
          <Clash
            key={index}
            col={colStart[getDayEnum(group[index]!.time.day)! + 2]!}
            row={rowStart[getRowIndex(group[index]!.time.start)]!}
            span={rowSpans[rowSpan]!}
          >
            {group.map((item) => (
              <React.Fragment
                key={
                  item.courseCode + item.originalType + item.type + item.title
                }
              >
                {item.originalType === "event" ? (
                  <EventClient preference={item} clash={largestDuration}>
                    <Event
                      title={item.title}
                      type={item.type}
                      colour={item.colour}
                      time={item.time}
                    />
                  </EventClient>
                ) : (
                  <FriendClashEvent item={item} />
                )}
              </React.Fragment>
            ))}
          </Clash>
        );
      })}
    </>
  );
}

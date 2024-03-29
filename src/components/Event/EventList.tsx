"use client";
import Event from "./EventBody";
import EventClient from "./EventClientWrapper";
import { useEffect, useMemo } from "react";
import React from "react";
import { usePreview } from "~/contexts/PreviewContext";
import { useUrlState } from "~/hooks/useUrlState";
import { useFriend } from "~/contexts/FriendContext";
import {
  getDayEnum,
  getRowIndex,
  groupPreferencesByStartAndDay,
} from "~/lib/functions";
import { FriendEvent, FriendClashEvent } from "./FriendEventList";
import Clash from "./Clash";
import type { CourseType, Preference, Time } from "~/lib/definitions";

export default function EventList() {
  const { searchParams, decode } = useUrlState();
  const pref = searchParams.get("pref");
  const { events, setEvents } = usePreview();
  const { friendData } = useFriend();

  const clashes = useMemo<(Preference & { originalType: string })[][]>(() => {
    const combined = [
      ...events.map((event) => ({ ...event, originalType: "event" })),
      ...(friendData
        ?.filter((friend) => friend.active)
        .flatMap((friend) =>
          friend.state.map((item) => ({ ...item, originalType: "friend" })),
        ) ?? []),
    ];

    return groupPreferencesByStartAndDay(
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
    ).filter((item: (Time | Preference)[]) => item.length > 1);
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

    const preferenceMap: Record<string, string[]> = {};

    friendData
      ?.filter((friend) => friend.active)
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
            const key = `${stateItem.id}+${stateItem.title}+${stateItem.courseCode}+${stateItem.type}+${stateItem.time.start}+${stateItem.time.day}+${stateItem.time.duration}+${stateItem.time.campus_description}+${stateItem.time.location}`;
            if (!preferenceMap[key]) {
              preferenceMap[key] = [];
            }
            preferenceMap[key]?.push(friend.name);
          }
        });
      });

    return Object.entries(preferenceMap).map(([key, friends]) => {
      const [
        id,
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
        string,
        CourseType,
        string,
        string,
        number,
        string,
        string,
      ];
      return {
        id,
        title,
        courseCode,
        type,
        time: { start, day, duration, campus_description, location },
        friends,
      } as Omit<Preference, "colour"> & { friends: string[] };
    });
  }, [friendData, clashes, eventsNoClashes]);

  useEffect(() => {
    const parsedPrefs = decode("pref") as Preference[];
    if (parsedPrefs) {
      // console.log(parsedPrefs);
      setEvents(parsedPrefs);
    }
  }, [pref, decode, setEvents]);

  return (
    <>
      {eventsNoClashes.map((item) => (
        <EventClient
          preference={item}
          key={item.id + (item.grouped ? item.grouped_code : "")}
        >
          <Event title={item.title} type={item.type} time={item.time} />
        </EventClient>
      ))}
      {friendsNoClashes.map((item) => (
        <React.Fragment key={item.id + item.friends.join(",")}>
          <FriendEvent item={item} />
        </React.Fragment>
      ))}
      {clashes.map((group, index) => {
        const largestDuration = group.reduce((max, item) => {
          return Number(item.time.duration) > max
            ? Number(item.time.duration)
            : max;
        }, 0);
        const rowSpan: number = largestDuration / 30;
        const col = getDayEnum(group[0]!.time.day)! + 2;
        return (
          <Clash
            key={index}
            col={col}
            row={getRowIndex(group[0]!.time.start)}
            span={rowSpan}
          >
            {group.map((item) => (
              <React.Fragment
                key={item.id + (item.grouped ? item.grouped_code : "")}
              >
                {item.originalType === "event" ? (
                  <EventClient preference={item} clash={largestDuration}>
                    <Event
                      title={item.title}
                      type={item.type}
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

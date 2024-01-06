import React from "react";
import {
  CalendarHeader,
  TimeSlot,
  PreviewEventClient,
  EventList,
  BlockedEventList,
} from "~/components";
import CalendarToolbar from "../../components/Calendar/CalendarToolbar";
import CalendarLayout from "../../components/Calendar/CalendarLayout";
import { FriendProvider } from "~/contexts/FriendContext";

export default function Calendar() {
  return (
    <CalendarLayout>
      <div className="grid grid-cols-[auto,repeat(5,minmax(0,1fr))] grid-rows-[2.5rem,repeat(38,2.8rem)] md:grid-rows-[2.5rem,repeat(38,4rem)] lg:grid-rows-[2.5rem,repeat(38,2.8rem)]">
        <CalendarHeader />
        {Array.from({ length: 38 }, (_, index) => {
          const num = 2 + index;
          return (
            <React.Fragment key={index}>
              <div
                style={{ gridRowStart: `${num}` }}
                className={`col-start-[1] border-r border-neutral-100 bg-white p-0.5 text-right text-xs font-medium uppercase text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 md:p-1.5 `}
              >
                {index % 2 !== 1 && `${index / 2 + 5}:00`}
              </div>
              <TimeSlot col={2} row={2 + index} />
              <TimeSlot col={3} row={2 + index} />
              <TimeSlot col={4} row={2 + index} />
              <TimeSlot col={5} row={2 + index} />
              <TimeSlot col={6} row={2 + index} />
            </React.Fragment>
          );
        })}
        <FriendProvider fallback={<EventList />}>
          <EventList />
        </FriendProvider>
        <PreviewEventClient />
        <BlockedEventList />
      </div>
      <CalendarToolbar />
    </CalendarLayout>
  );
}

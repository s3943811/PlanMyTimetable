import { HiOutlineUserAdd, HiMinus } from "react-icons/hi";
import { HiInbox } from "react-icons/hi2";
export default function Page() {
  return (
    <article className=" container flex grow flex-col space-y-4 divide-y divide-neutral-200 p-8 dark:divide-neutral-700 dark:bg-neutral-900 dark:text-white">
      <header>
        <h2 className="text-xl font-medium ">Help</h2>
        <p className="font-base text-neutral-500 dark:text-neutral-400">
          Report issues, and find the answers to the most frequently asked
          questions.
        </p>
      </header>
      <section className="pt-2">
        <h3 className="text-lg font-medium">Issues and Changes</h3>
        <p>
          If you want to report an problem, or suggest an improvement or
          change,&nbsp;
          <a
            href="https://github.com/s3943811/timetable/issues/new"
            className="font-medium underline underline-offset-4 after:content-['_↗']"
          >
            create an issue on Github
          </a>
          .
        </p>
      </section>
      <section className="pt-2 ">
        <h3 className="text-lg font-medium">How to use</h3>
        <p>
          First add a class following the steps&nbsp;
          <a
            href="/classes/add"
            className="font-medium underline underline-offset-4"
          >
            on the add page
          </a>
          ,&nbsp;
          <a
            href="/classes/add/manual"
            className="font-medium underline underline-offset-4"
          >
            or manually.
          </a>
        </p>
        <p>
          Then drag the class for the sidebar into a preview slot on the
          calendar - these represent the available sessions for that class. You
          can move events from the calendar or sidebar to change the events
          place (time and day) on the calendar.
        </p>
      </section>
      <section className="space-y-2 pt-2">
        <div>
          <h3 className="text-lg font-medium">Friend timetable comparison</h3>
          <p className="whitespace-pre-line text-sm text-neutral-500 dark:text-neutral-400">
            Friend data is stored in local storage, meaning it persists across
            tabs and remains everytime you visit PlanMyTimetable until it is
            removed.
            <br />A friend&apos;s must create their timetable with
            PlanMyTimetable for the friend comparison features to work properly.
          </p>
        </div>
        <div>
          <h3 className="font-medium">Add a friend</h3>
          <p className="">
            You can add a friend by clicking the add friend icon{" "}
            <span className="inline-flex items-center">
              (<HiOutlineUserAdd />)
            </span>
            on the toolbar below the calendar and filling out the details in the
            modal.
          </p>
        </div>
        <div>
          <h3 className="font-medium">Manage friends</h3>
          <p className="">
            You can remove friends individually or all together, by clicking the
            &quot;Friends&quot; button to show a popover. The popover, allows
            users to remove friends by dismissing them through the minus icon{" "}
            <span className="inline-flex items-center">
              (<HiMinus />)
            </span>
            or users can hide and show friends through the checkbox.
          </p>
        </div>
        <div>
          <h3 className="font-medium">Share your timetable</h3>
          <p>
            To share your timetable with a friend use the share button on
            toolbar below the calendar or copy the url when you&apos;ve created
            your timetable.
          </p>
        </div>
      </section>
      <section className="space-y-1 pt-2">
        <h3 className="text-lg font-medium">Block (fixed) times</h3>
        <p>
          Blocked/fixed times are useful when attempting to plan around a fixed
          event in your calendar, for example, a work day. Blocked times will
          hide preferences that overlap with that time, meaning you cannot drop
          that event onto that time slot if it overlaps with a blocked event.
        </p>
        <p className="inline-flex items-center">
          To edit, or delete a blocked out time, you can click the inbox icon (
          <HiInbox />) to see all your blocked out times.
        </p>
      </section>
    </article>
  );
}

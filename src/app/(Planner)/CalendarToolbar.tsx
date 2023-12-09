import { AddFriend, FriendPopover, Share } from "~/components";

export default function CalendarToolbar() {
  return (
    <div className="sticky bottom-0 z-50 inline-flex h-16 w-full gap-3 border-t border-t-neutral-50 bg-white px-3 py-4 dark:border-t-neutral-700 dark:bg-neutral-900 dark:text-white">
      <AddFriend />
      <FriendPopover />
      <div className="ml-auto gap-1">
        <Share />
      </div>
    </div>
  );
}

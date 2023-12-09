import { AddFriend, FriendPopover, Share } from "~/components";

export default function CalendarToolbar() {
  return (
    <div className="sticky bottom-0 z-50 inline-flex h-16 w-full gap-3 border-t border-b-neutral-50 bg-white px-3 py-4">
      <AddFriend />
      <FriendPopover />
      <div className="ml-auto gap-1">
        <Share />
      </div>
    </div>
  );
}

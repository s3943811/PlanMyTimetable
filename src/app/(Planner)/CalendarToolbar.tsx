import { Button, AddFriend, FriendPopover } from "~/components";
import { IoIosShareAlt } from "react-icons/io";

export default function CalendarToolbar() {
  return (
    <div className="sticky bottom-0 z-50 inline-flex h-16 w-full gap-3 border-t border-b-neutral-50 bg-white px-3 py-4">
      <AddFriend />
      <FriendPopover />
      <div className="ml-auto gap-1">
        <Button>
          <IoIosShareAlt />
          Share
        </Button>
      </div>
    </div>
  );
}

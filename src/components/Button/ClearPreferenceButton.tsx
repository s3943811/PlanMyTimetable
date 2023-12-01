"use client";
import { SetStateAction } from "react";
import { HiXMark } from "react-icons/hi2";
import { useUrlState } from "~/hooks/useUrlState";

export default function ClearPreferencesButton({
  setIsOpen,
}: {
  setIsOpen: (value: SetStateAction<boolean>) => void;
}) {
  const { replaceState } = useUrlState();
  //   const searchParams = useSearchParams();
  return (
    <button
      className="ring-offset-background mt-1.5 inline-flex h-[1.4rem] w-fit items-center justify-center whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-neutral-50 hover:bg-neutral-700"
      onClick={() => {
        replaceState([], "pref");
        setIsOpen(false);
      }}
    >
      <HiXMark size={15} /> Clear All
    </button>
  );
}

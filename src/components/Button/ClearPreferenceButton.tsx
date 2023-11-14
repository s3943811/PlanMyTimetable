"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SetStateAction } from "react";
import { HiOutlineX } from "react-icons/hi";

export default function ClearPreferencesButton({
  setIsOpen,
}: {
  setIsOpen: (value: SetStateAction<boolean>) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  //   const searchParams = useSearchParams();
  return (
    <button
      className="ring-offset-background mt-1.5 inline-flex h-[1.4rem] w-fit items-center justify-center whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-neutral-50 hover:bg-neutral-800"
      onClick={() => {
        router.push(`${pathname}`, { scroll: false });
        setIsOpen(false);
      }}
    >
      <HiOutlineX size={15} /> Clear All
    </button>
  );
}

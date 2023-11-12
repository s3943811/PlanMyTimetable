"use client";
import Button from "./Button";
import { MdClear } from "react-icons/md";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function ClearPreferencesButton() {
  const router = useRouter();
  const pathname = usePathname();
  //   const searchParams = useSearchParams();
  return (
    <Button
      onClick={() => {
        router.push(`${pathname}`);
      }}
    >
      <MdClear /> Clear
    </Button>
  );
}

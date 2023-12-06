"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { HiSun, HiMoon, HiComputerDesktop } from "react-icons/hi2";
import { Popover } from "react-tiny-popover";
import { Button } from "~/components";

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      containerClassName="z-[999]"
      isOpen={isOpen}
      positions={["right"]}
      padding={5}
      onClickOutside={() => setIsOpen(false)}
      content={<ThemePopover setIsOpen={setIsOpen} />}
    >
      <Button variant="outlineIcon" onClick={() => setIsOpen(true)}>
        <HiSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <HiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </Popover>
  );
}

function ThemePopover({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { setTheme } = useTheme();
  return (
    <ul className="space-y-1 rounded-md border bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900">
      <li>
        <Button
          variant="ghost"
          onClick={() => {
            setTheme("light");
            setIsOpen(false);
          }}
        >
          <HiSun />
          Light
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          onClick={() => {
            setTheme("dark");
            setIsOpen(false);
          }}
        >
          <HiMoon />
          Dark
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          onClick={() => {
            setTheme("system");
            setIsOpen(false);
          }}
        >
          <HiComputerDesktop /> System
        </Button>
      </li>
    </ul>
  );
}

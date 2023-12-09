"use client";
import { useTheme } from "next-themes";

export default function ThemeOptions() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex flex-row text-center text-sm leading-loose">
      {/* <p>Light / Dark / System</p> */}
      <div className="">
        <button
          onClick={() => setTheme("light")}
          className={`inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md px-1 py-2 text-sm ${
            theme === "light" ? "font-medium" : "font-normal"
          } transition-all hover:bg-neutral-50 hover:font-medium active:bg-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-800`}
        >
          Light
        </button>
        /
        <button
          onClick={() => setTheme("dark")}
          className={`inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md px-1 py-2 text-sm ${
            theme === "dark" ? "font-medium dark:font-semibold" : "font-normal"
          } transition-all hover:bg-neutral-50 hover:font-medium active:bg-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-800`}
        >
          Dark
        </button>
        /
        <button
          onClick={() => setTheme("system")}
          className={`inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md px-1 py-2 text-sm ${
            theme === "system"
              ? "font-medium dark:font-semibold"
              : "font-normal"
          } transition-all hover:bg-neutral-50 hover:font-medium active:bg-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-800`}
        >
          System
        </button>
      </div>
    </div>
  );
}

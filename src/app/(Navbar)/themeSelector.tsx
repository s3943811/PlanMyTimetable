"use client";
import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi2";
import { Button } from "~/components";

export default function ThemeSelector() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="outlineIcon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <HiSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <HiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

import { forwardRef } from "react";
import { cn } from "~/lib/utils";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "normal"
    | "normalIcon"
    | "normalLarge"
    | "secondary"
    | "secondaryIcon"
    | "outline"
    | "outlineLarge"
    | "outlineIcon"
    | "ghostIcon"
    | "ghost"
    | undefined;
}
export const buttonVariants = {
  normal:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-neutral-900 shadow px-4 py-2 text-sm text-neutral-50 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-800 dark:hover:bg-neutral-100 dark:shadow-neutral-600",
  secondary:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-neutral-100/80 shadow-sm px-4 py-2 text-sm hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700 dark:shadow-neutral-600",
  outline:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800",
  ghost:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md px-4 py-2 text-sm hover:bg-neutral-50 active:bg-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-800",

  normalIcon:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-neutral-900 shadow px-2.5 py-2 text-sm text-neutral-50 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-800 dark:hover:bg-neutral-100 dark:shadow-neutral-600",
  secondaryIcon:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-neutral-100/80 shadow-sm px-2.5 py-2 text-sm hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700 dark:shadow-neutral-600",
  outlineIcon:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md border border-neutral-200 px-2.5 py-2 text-sm hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800",
  ghostIcon:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm hover:bg-neutral-50 active:bg-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-800",

  normalLarge:
    "inline-flex h-10 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-neutral-900 shadow px-4 py-2 text-base text-neutral-50 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-800 dark:hover:bg-neutral-100 dark:shadow-neutral-600",
  outlineLarge:
    "inline-flex h-10 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md border border-neutral-200 px-4 py-2 text-base hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants[variant ?? "normal"], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "button";

export default Button;

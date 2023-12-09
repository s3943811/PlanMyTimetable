import { forwardRef } from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "normal"
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
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-neutral-900 shadow px-4 py-2 text-sm text-neutral-50 hover:bg-neutral-700 ",
  secondary:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-neutral-100/80 shadow-sm px-4 py-2 text-sm hover:bg-neutral-100 ",
  secondaryIcon:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-neutral-100/80 shadow-sm px-2.5 py-2 text-sm hover:bg-neutral-100 ",
  outline:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50 ",
  outlineIcon:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md border border-neutral-200 px-2.5 py-2 text-sm hover:bg-neutral-50 ",
  ghostIcon:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm hover:bg-neutral-50 active:bg-neutral-100",
  ghost:
    "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md px-4 py-2 text-sm hover:bg-neutral-50 active:bg-neutral-100",
  normalLarge:
    "inline-flex h-10 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-neutral-900 shadow px-4 py-2 text-base text-neutral-50 hover:bg-neutral-700 ",
  outlineLarge:
    "inline-flex h-10 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md border border-neutral-200 px-4 py-2 text-base hover:bg-neutral-50 ",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, ...props }, ref) => {
    {
      /* focus:ring-2 focus:ring-neutral-400/50 focus:ring-offset-2 focus:ring-offset-neutral-50 */
    }
    return (
      <button
        ref={ref}
        className={buttonVariants[variant ?? "normal"]}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "button";

export default Button;

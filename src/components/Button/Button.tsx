import { forwardRef } from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "normal" | "outline" | undefined;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, ...props }, ref) => {
    {
      /* focus:ring-2 focus:ring-neutral-400/50 focus:ring-offset-2 focus:ring-offset-neutral-50 */
    }
    const buttonVariants = {
      normal:
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background bg-neutral-900 text-neutral-50 hover:bg-neutral-800 h-8 px-4 py-2 w-fit",
      outline:
        "inline-flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50 ",
    };
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

export default Button;

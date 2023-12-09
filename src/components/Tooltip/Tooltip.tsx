import { cn } from "~/lib/utils";

interface ToolTipProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  message: React.ReactNode;
  children: React.ReactNode;
  position: "top" | "left" | "right" | "bottom";
}

export default function Tooltip({
  message,
  children,
  position,
  className,
  ...props
}: ToolTipProps) {
  const positionClass = {
    bottom: "top-10",
    top: "bottom-10",
    left: "right-10",
    right: "left-10",
  };
  return (
    <div className="group relative flex" {...props}>
      {children}
      <span
        className={cn(
          `absolute z-[999] scale-0 whitespace-nowrap rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 dark:bg-neutral-200 dark:text-neutral-950`,
          positionClass[position],
          className,
        )}
      >
        {message}
      </span>
    </div>
  );
}

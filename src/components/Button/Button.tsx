import { MouseEventHandler } from "react";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "submit" | "reset" | "button" | undefined;
}

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background bg-neutral-900 text-neutral-50 hover:bg-neutral-800 h-8 px-4 py-2 w-fit" onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;

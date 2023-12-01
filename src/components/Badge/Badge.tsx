interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={
        "inline-flex w-fit items-center justify-center rounded-md px-2.5 py-0.5 text-xs " +
        className
      }
    >
      {children}
    </div>
  );
}

export default Badge;

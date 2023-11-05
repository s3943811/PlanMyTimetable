interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={
        "inline-flex w-fit items-center justify-center rounded-lg px-1.5 py-0.5 " +
        className
      }
    >
      {children}
    </div>
  );
}

export default Badge;

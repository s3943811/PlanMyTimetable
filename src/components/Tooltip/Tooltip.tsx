export default function Tooltip({
  message,
  children,
  position,
}: {
  message: React.ReactNode;
  children: React.ReactNode;
  position: "top" | "left" | "right" | "bottom";
}) {
  const positionClass = {
    bottom: "top-10",
    top: "bottom-10",
    left: "right-10",
    right: "left-10",
  };
  return (
    <div className="group relative flex">
      {children}
      <span
        className={`absolute ${positionClass[position]} z-[999] scale-0 whitespace-nowrap rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100`}
      >
        {message}
      </span>
    </div>
  );
}

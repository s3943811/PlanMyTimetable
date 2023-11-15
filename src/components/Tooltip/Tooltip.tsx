export default function Tooltip({
  message,
  children,
}: {
  message: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-10 z-[999] scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}

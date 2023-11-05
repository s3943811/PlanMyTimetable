export default function Day(
    {day, children,}: {day: string; children: React.ReactNode}
) {
  return (
    <div className="flex flex-col items-center">
      <div className="sticky top-0 w-full border-b bg-stone-50 pb-2">
        <h3 className="text-center text-lg font-semibold">{day}</h3>
      </div>
      {children}
    </div>
  );
}

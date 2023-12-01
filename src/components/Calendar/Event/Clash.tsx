export default function Clash({
  col,
  row,
  span,
  children,
}: {
  col: string;
  row: string;
  span: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${col} ${row} ${span} m-0.5 flex flex-row space-x-0.5 overflow-clip`}
    >
      {children}
    </div>
  );
}

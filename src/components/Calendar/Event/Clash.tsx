export default function Clash({
  col,
  row,
  span,
  children,
}: {
  col: number;
  row: number;
  span: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        gridRowEnd: `span ${span}`,
        gridColumnStart: `${col}`,
        gridRowStart: `${row}`,
      }}
      className={`flex flex-row gap-1 p-1`}
    >
      {children}
    </div>
  );
}

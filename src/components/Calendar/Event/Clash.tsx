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
      className={`m-0.5 flex flex-row space-x-0.5 overflow-clip`}
    >
      {children}
    </div>
  );
}

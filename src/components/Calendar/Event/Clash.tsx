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
    <div className={`${col} ${row} ${span} flex w-full flex-row`}>
      {children}
    </div>
  );
}

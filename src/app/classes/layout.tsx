import { PreviewProvider } from "~/contexts/PreviewContext";
export default function ClassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PreviewProvider>{children}</PreviewProvider>;
}

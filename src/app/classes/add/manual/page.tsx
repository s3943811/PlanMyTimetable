import ClassForm from "../../(ClassesComponents)/ClassForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manual class add",
};
export default function Page() {
  return <ClassForm></ClassForm>;
}

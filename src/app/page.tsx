import Link from "next/link";
import ClassListSidebar from "./(Planner)/ClassListSidebar";
import Calendar from "./(Planner)/Calendar";

export default function HomePage() {
  return (
    <main className="flex w-screen flex-row">
      <ClassListSidebar />
      <Calendar />
    </main>
  );
}

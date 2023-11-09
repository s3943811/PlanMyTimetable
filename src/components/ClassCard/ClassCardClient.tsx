import { Course } from "~/lib/definitions";

function ClassCardClient({
  children,
  course,
}: {
  children: React.ReactNode;
  course: Course;
}) {
  const showCorrespondingEvents = () => {};
  return (
    <div
      className={`flex w-72 flex-col gap-1 rounded-md border-r-8 p-5 py-2.5 shadow-sm hover:bg-stone-100 ${course.colour}`}
    >
      {children}
    </div>
  );
}

export default ClassCardClient;

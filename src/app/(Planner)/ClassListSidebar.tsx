import { ClassCard } from "~/components";
import { CourseType } from "~/lib/definitions";
import { ClassListData } from "~/data/data";

function ClassListSidebar() {
  return (
    <aside className="flex min-h-screen w-64 min-w-fit flex-col gap-3 border-r p-3">
      {ClassListData.map((item) => (
        <ClassCard
          key={item.courseCode + CourseType[item.type]}
          title={item.title}
          courseCode={item.courseCode}
          type={item.type}
          colour={item.colour}
          options={item.options}
        />
      ))}
    </aside>
  );
}

export default ClassListSidebar;

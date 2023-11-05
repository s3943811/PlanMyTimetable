import { ClassCard } from "~/components"
import { CourseType } from "~/lib/definitions"
import { ClassListData } from "~/data/data"

function ClassListSidebar() {
    return (
        <aside className="flex flex-col gap-3 min-w-fit w-64 min-h-screen p-3 border-r">
            {
                ClassListData.map((item) => (
                    <ClassCard key={item.courseCode + CourseType[item.type]} title={item.title} courseCode={item.courseCode} type={item.type} colour={item.colour}/>
                ))
            }
        </aside>
    )
}

export default ClassListSidebar
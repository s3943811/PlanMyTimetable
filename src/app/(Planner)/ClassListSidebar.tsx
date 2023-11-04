import { ClassCard } from "~/components"
import { CourseType } from "~/lib/definitions"
const data = [
    {
        title: "Full Stack Development",
        courseCode: "COSC2758_2350_1354_AUSCY",
        type: CourseType.Lecture,
        colour: "border-r-purple-400"
    },
    {
        title: "Full Stack Development",
        courseCode: "COSC2758_2350_1354_AUSCY",
        type: CourseType.Tutorial,
        colour: "border-r-purple-400"
    },
    {
        title: "Software Eng: Process & Tools ",
        courseCode: "COSC2299_2350_1332_AUSCY",
        type: CourseType.Lecture,
        colour: "border-r-yellow-400"
    },
    {
        title: "Software Eng: Process & Tools ",
        courseCode: "COSC2299_2350_1332_AUSCY",
        type: CourseType.Tutorial,
        colour: "border-r-yellow-400"
    },
    {
        title: "Operating System Principles",
        courseCode: "COSC1114_2350_1322_AUSCY",
        type: CourseType.Lecture,
        colour: "border-r-green-400"
    },
    {
        title: "Operating System Principles",
        courseCode: "COSC1114_2350_1322_AUSCY",
        type: CourseType.Tutorial,
        colour: "border-r-green-400"
    },
    {
        title: "Computing Theory",
        courseCode: "COSC1107_2350_1321_AUSCY",
        type: CourseType.Lecture,
        colour: "border-r-red-400"
    },
    {
        title: "Computing Theory",
        courseCode: "COSC1107_2350_1321_AUSCY",
        type: CourseType.Tutorial,
        colour: "border-r-red-400"
    },
]
function ClassListSidebar() {
    return (
        <aside className="flex flex-col gap-3 min-w-fit w-64 min-h-screen p-3 border-r">
            {
                data.map((item) => (
                    <ClassCard key={item.courseCode + CourseType[item.type]} title={item.title} courseCode={item.courseCode} type={item.type} colour={item.colour}/>
                ))
            }
        </aside>
    )
}

export default ClassListSidebar
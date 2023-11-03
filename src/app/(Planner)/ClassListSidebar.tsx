import { ClassCard } from "~/components"
import { CourseType } from "~/lib/definitions"
const data = [
    {
        title: "Full Stack Development",
        courseCode: "COSC2758_2350_1354_AUSCY",
        type: CourseType.Lecture,
        colour: "purple"
    },
    {
        title: "Full Stack Development",
        courseCode: "COSC2758_2350_1354_AUSCY",
        type: CourseType.Tutorial,
        colour: "purple"
    },
    {
        title: "Software Eng: Process & Tools ",
        courseCode: "COSC2299_2350_1332_AUSCY",
        type: CourseType.Lecture,
        colour: "yellow"
    },
    {
        title: "Software Eng: Process & Tools ",
        courseCode: "COSC2299_2350_1332_AUSCY",
        type: CourseType.Tutorial,
        colour: "yellow"
    },
    {
        title: "Operating System Principles",
        courseCode: "COSC1114_2350_1322_AUSCY",
        type: CourseType.Lecture,
        colour: "green"
    },
    {
        title: "Operating System Principles",
        courseCode: "COSC1114_2350_1322_AUSCY",
        type: CourseType.Tutorial,
        colour: "green"
    },
    {
        title: "Computing Theory",
        courseCode: "COSC1107_2350_1321_AUSCY",
        type: CourseType.Lecture,
        colour: "red"
    },
    {
        title: "Computing Theory",
        courseCode: "COSC1107_2350_1321_AUSCY",
        type: CourseType.Tutorial,
        colour: "red"
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
export type Course = {
    title: string,
    courseCode: string,
    type: CourseType,
    colour: string,
    options: Array<Time>
}

export type Time = {
    day: string,
    start: string,
    duration: number,
    location: string,
    campus_description: string,
}
export enum CourseType {
    Lecture,
    Tutorial,
}
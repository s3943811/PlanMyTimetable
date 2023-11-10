export type Course = {
    title: string,
    courseCode: string,
    type: CourseType,
    colour: ColourPalette,
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

export enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}

export enum ColourPalette {
    purple,
    yellow,
    orange,
    red
}
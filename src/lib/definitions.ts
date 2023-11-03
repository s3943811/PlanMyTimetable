export type Course = {
    id: string,
    name: string,
    times: [Time]
}

export type Time = {
    day: string,
    time: string,
    location: string,
    Campus: string,
    Duration: string
}
export enum CourseType {
    Lecture,
    Tutorial,
}
export type Course = {
  id: string;
  title: string;
  courseCode: string;
  type: CourseType;
  colour: ColourPalette;
  options: Array<Time>;
};

export type Time = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  start: string;
  duration: number;
  location: string;
  campus_description: string;
};

export type Preference = {
  title: string;
  courseCode: string;
  type: CourseType;
  colour: ColourPalette;
  time: Time;
};
export enum CourseType {
  Lecture,
  Tutorial,
  Workshop,
  Practical,
  Other,
}

export enum Days {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
}

export enum ColourPalette {
  Purple,
  Yellow,
  Orange,
  Red,
  Green,
  Teal,
  Blue,
  Fuchsia,
  Pink,
}

export const colourVariants = {
  0: "border-l-purple-400",
  1: "border-l-yellow-400",
  2: "border-l-orange-400",
  3: "border-l-red-400",
  4: "border-l-green-400",
  5: "border-l-teal-400",
  6: "border-l-blue-400",
  7: "border-l-fuchsia-400",
  8: "border-l-pink-400",
};

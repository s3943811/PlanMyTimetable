export type Course = {
  id: string;
  title: string;
  courseCode: string;
  type: CourseType;
  colour: ColourPalette;
  options: Array<Time>;
};

export type Time =
  | {
      day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
      start: string;
      duration: number;
      location: string;
      campus_description: string;
      grouped: true;
      grouped_code: string;
    }
  | {
      day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
      start: string;
      duration: number;
      location: string;
      campus_description: string;
      grouped: false;
    };

export type Preference =
  | {
      id: string;
      title: string;
      courseCode: string;
      type: CourseType;
      colour: ColourPalette;
      grouped: false;
      time: Time;
    }
  | {
      id: string;
      title: string;
      courseCode: string;
      type: CourseType;
      colour: ColourPalette;
      grouped: true;
      grouped_code: string;
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

export type BlockedEvent = {
  id: string;
  name: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  start: string;
  duration: number;
};

export const colourVariants = {
  0: "border-l-purple-400 dark:border-l-purple-700",
  1: "border-l-yellow-400 dark:border-l-yellow-700",
  2: "border-l-orange-400 dark:border-l-orange-700",
  3: "border-l-red-400 dark:border-l-red-700",
  4: "border-l-green-400 dark:border-l-green-700",
  5: "border-l-teal-400 dark:border-l-teal-700",
  6: "border-l-blue-400 dark:border-l-blue-700",
  7: "border-l-fuchsia-400 dark:border-l-fuchsia-700",
  8: "border-l-pink-400 dark:border-l-pink-700",
};

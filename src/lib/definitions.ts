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

export const colStart: Record<number, string> = {
  1: "col-start-[1]",
  2: "col-start-[2]",
  3: "col-start-[3]",
  4: "col-start-[4]",
  5: "col-start-[5]",
  6: "col-start-[6]",
};
export const rowStart: Record<number, string> = {
  1: "row-start-[1]",
  2: "row-start-[2]",
  3: "row-start-[3]",
  4: "row-start-[4]",
  5: "row-start-[5]",
  6: "row-start-[6]",
  7: "row-start-[7]",
  8: "row-start-[8]",
  9: "row-start-[9]",
  10: "row-start-[10]",
  11: "row-start-[11]",
  12: "row-start-[12]",
  13: "row-start-[13]",
  14: "row-start-[14]",
  15: "row-start-[15]",
  16: "row-start-[16]",
  17: "row-start-[17]",
  18: "row-start-[18]",
  19: "row-start-[19]",
  20: "row-start-[20]",
  21: "row-start-[21]",
  22: "row-start-[22]",
  23: "row-start-[23]",
  24: "row-start-[24]",
  25: "row-start-[25]",
  26: "row-start-[26]",
  27: "row-start-[27]",
  28: "row-start-[28]",
  29: "row-start-[29]",
  30: "row-start-[30]",
  31: "row-start-[31]",
  32: "row-start-[32]",
  33: "row-start-[33]",
  34: "row-start-[34]",
  35: "row-start-[35]",
  36: "row-start-[36]",
  37: "row-start-[37]",
  38: "row-start-[38]",
  39: "row-start-[39]",
};
export const rowSpans: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
};
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

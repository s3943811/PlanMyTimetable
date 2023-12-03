import { ColourPalette, CourseType, Days } from "./definitions";
import type { Preference, Time } from "./definitions";

export function getTimes(): Array<string> {
  const times = [];
  const time = new Date();
  time.setHours(0, 0, 0, 0);
  while (time.getDate() === new Date().getDate()) {
    times.push(
      new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    );
    time.setMinutes(time.getMinutes() + 60);
  }
  return times;
}

export function convertTimeToIndex(
  time: string,
  duration: number,
): Array<number> {
  const indexes: Array<number> = [];
  const delimiterIndex = time.indexOf(":");
  let hour = Number(time.substring(0, delimiterIndex));
  const minute = Number(time.substring(delimiterIndex + 1)) / 60;
  if (minute !== 0) {
    hour += minute;
  }
  const startIndex = Math.ceil(hour * 2);
  indexes.push(startIndex);
  duration /= 30;
  if (duration !== 0) {
    for (let index = startIndex + 1; index < startIndex + duration; index++) {
      indexes.push(index);
    }
  }
  return indexes;
}

export function compareDays(day1: string, day2: Days) {
  switch (day2) {
    case Days.Monday:
      return day1 === "Mon";
    case Days.Tuesday:
      return day1 === "Tue";
    case Days.Wednesday:
      return day1 === "Wed";
    case Days.Thursday:
      return day1 === "Thu";
    case Days.Friday:
      return day1 === "Fri";
  }
}
export function getDayEnum(day: string): Days {
  switch (day) {
    case "Mon":
      return Days.Monday;
    case "Tue":
      return Days.Tuesday;
    case "Wed":
      return Days.Wednesday;
    case "Thu":
      return Days.Thursday;
    case "Fri":
      return Days.Friday;
    default:
      return Days.Monday;
  }
}
export function getRowIndex(time: string) {
  const delimiterIndex = time.indexOf(":");
  const hour = Number(time.substring(0, delimiterIndex));
  return 3 + Math.ceil(hour * 2) - 10;
}

export function addMinutesToTimeString(
  time: string,
  minutesToAdd: number,
): string {
  // Split the time string into hours and minutes
  const timeParts = time.split(":");
  const hours = parseInt(timeParts[0] ?? "0", 10);
  const minutes = parseInt(timeParts[1] ?? "0", 10);

  // Create a new Date object at the specified time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // Add the desired number of minutes
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // Format the new time into a string
  const updatedHours = date.getHours();
  const updatedMinutes = date.getMinutes();
  const updatedTimeString = `${updatedHours
    .toString()
    .padStart(2, "0")}:${updatedMinutes.toString().padStart(2, "0")}`;

  return updatedTimeString;
}

export function getCourseTypeString(
  type: CourseType,
): "Lecture" | "Tutorial" | "Workshop" | "Practical" | "Other" {
  switch (type) {
    case CourseType.Lecture:
      return "Lecture";
    case CourseType.Tutorial:
      return "Tutorial";
    case CourseType.Workshop:
      return "Workshop";
    case CourseType.Practical:
      return "Practical";
    default:
      return "Other";
  }
}

// export function getCourseType(type: string): CourseType {
//   switch (type) {
//     case "Lecture":
//       return CourseType.Lecture;
//     case "Tutorial":
//       return CourseType.Tutorial;
//     case "Workshop":
//       return CourseType.Workshop;
//     case "Practical":
//       return CourseType.Practical;
//     default:
//       return CourseType.Other;
//   }
// }

export function getColourString(
  colour: ColourPalette,
):
  | "Purple"
  | "Yellow"
  | "Red"
  | "Orange"
  | "Green"
  | "Teal"
  | "Blue"
  | "Fuchsia"
  | "Pink" {
  switch (colour) {
    case ColourPalette.Purple:
      return "Purple";
    case ColourPalette.Yellow:
      return "Yellow";
    case ColourPalette.Orange:
      return "Orange";
    case ColourPalette.Red:
      return "Red";
    case ColourPalette.Green:
      return "Green";
    case ColourPalette.Teal:
      return "Teal";
    case ColourPalette.Blue:
      return "Blue";
    case ColourPalette.Fuchsia:
      return "Fuchsia";
    case ColourPalette.Pink:
      return "Pink";
  }
}

export function groupPreferencesByStartAndDay(
  items: undefined | (Preference & { originalType: string })[],
): (Preference & { originalType: string })[][] {
  const groups: Record<string, (Preference & { originalType: string })[]> = {};

  items?.forEach((item) => {
    const key = `${item.time.start}-${item.time.day}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key]?.push(item);
  });

  return Object.values(groups);
}
export function groupTimesByStartAndDay(items: Time[] | undefined): Time[][] {
  const groups: Record<string, Time[]> = {};

  items?.forEach((item) => {
    const key = `${item.start}-${item.day}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key]?.push(item);
  });

  return Object.values(groups);
}

import { Days } from "./definitions";

export function getTimes(): Array<string> {
    let times = [];
    let time = new Date();
    time.setHours(0,0,0,0);
    while(time.getDate() === new Date().getDate()) {
        times.push(new Date(time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));
        time.setMinutes(time.getMinutes() + 60);
    }
    return times;
}

export function convertTimeToIndex(time: string, duration: number): Array<number> {
    const indexes: Array<number> = [];
    const delimiterIndex = time.indexOf(":");
    let hour = Number(time.substring(0, delimiterIndex));
    const minute = Number(time.substring(delimiterIndex +1)) / 60;
    let startIndex;
    if (minute !== 0) {
        hour += minute;
    }
    startIndex = Math.ceil(hour * 2);
    indexes.push(startIndex);
    duration /= 30;
    if (duration !== 0) {
        for (let index = startIndex+1; index < startIndex + duration; index++) {
            indexes.push(index);
        }
    }
    return indexes
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
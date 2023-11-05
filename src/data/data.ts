import { CourseType } from "~/lib/definitions";

const ClassListData = [
  {
    title: "Full Stack Development",
    courseCode: "COSC2758_2350_1354_AUSCY",
    type: CourseType.Lecture,
    colour: "border-r-purple-400",
    options: [
      {
        day: "Thu",
        start: "14:30",
        duration: 120,
        location: "080.04.011",
        campus_description: "Melbourne City",
      },
    ],
  },
  {
    title: "Full Stack Development",
    courseCode: "COSC2758_2350_1354_AUSCY",
    type: CourseType.Tutorial,
    colour: "border-r-purple-400",
    options: [
      {
        day: "Tue",
        start: "14:30",
        duration: 120,
        location: "056.07.098",
        campus_description: "Melbourne City",
      },
      {
        day: "Fri",
        start: "14:30",
        duration: 120,
        location: "056.07.098",
        campus_description: "Melbourne City",
      },
      {
        day: "Fri",
        start: "10:30",
        duration: 120,
        location: "056.07.098",
        campus_description: "Melbourne City",
      },
      {
        day: "Tue",
        start: "10:30",
        duration: 120,
        location: "057.03.002",
        campus_description: "Melbourne City",
      },
      {
        day: "Mon",
        start: "18:30",
        duration: 120,
        location: "-",
        campus_description: "Canvas",
      },
      {
        day: "Thu",
        start: "15:30",
        duration: 120,
        location: "013.03.005",
        campus_description: "Melbourne City",
      },
    ],
  },
  {
    title: "Software Eng: Process & Tools ",
    courseCode: "COSC2299_2350_1332_AUSCY",
    type: CourseType.Lecture,
    colour: "border-r-yellow-400",
    options: [
      {
        day: "Tue",
        start: "18:30",
        duration: 120,
        location: "080.07.001",
        campus_description: "Melbourne City",
      },
      {
        day: "Tue",
        start: "18:30",
        duration: 120,
        location: "-",
        campus_description: "Canvas",
      },
    ],
  },
  {
    title: "Software Eng: Process & Tools ",
    courseCode: "COSC2299_2350_1332_AUSCY",
    type: CourseType.Tutorial,
    colour: "border-r-yellow-400",
    options: [
      {
        day: "Fri",
        start: "16:30",
        duration: 120,
        location: "010.08.024",
        campus_description: "Melbourne City",
      },
      {
        day: "Wed",
        start: "19:30",
        duration: 120,
        location: "014.11.037",
        campus_description: "Melbourne City",
      },
      {
        day: "Thu",
        start: "16:30",
        duration: 120,
        location: "014.10.030",
        campus_description: "Melbourne City",
      },
      {
        day: "Mon",
        start: "17:30",
        duration: 120,
        location: "014.10.030",
        campus_description: "Melbourne City",
      },
      {
        day: "Mon",
        start: "16:30",
        duration: 120,
        location: "014.10.031",
        campus_description: "Melbourne City",
      },
      {
        day: "Thu",
        start: "19:30",
        duration: 120,
        location: "-",
        campus_description: "Canvas",
      },
      {
        day: "Wed",
        start: "18:30",
        duration: 120,
        location: "010.08.026",
        campus_description: "Melbourne City",
      },
      {
        day: "Wed",
        start: "19:30",
        duration: 120,
        location: "-",
        campus_description: "Canvas",
      },
    ],
  },
  {
    title: "Operating System Principles",
    courseCode: "COSC1114_2350_1322_AUSCY",
    type: CourseType.Lecture,
    colour: "border-r-orange-400",
    options: [
      {
        day: "Wed",
        start: "09:30",
        duration: 120,
        location: "012.12.002",
        campus_description: "Melbourne City",
      },
      {
        day: "Wed",
        start: "09:30",
        duration: 120,
        location: "-",
        campus_description: "Canvas",
      },
    ],
  },
  {
    title: "Operating System Principles",
    courseCode: "COSC1114_2350_1322_AUSCY",
    type: CourseType.Tutorial,
    colour: "border-r-orange-400",
    options: [
      {
        day: "Fri",
        start: "14:30",
        duration: 60,
        location: "010.08.024",
        campus_description: "Melbourne City",
      },
      {
        day: "Wed",
        start: "13:30",
        duration: 60,
        location: "014.10.030",
        campus_description: "Melbourne City",
      },
      {
        day: "Wed",
        start: "14:30",
        duration: 60,
        location: "056.04.087",
        campus_description: "Melbourne City",
      },
      {
        day: "Fri",
        start: "15:30",
        duration: 60,
        location: "010.08.024",
        campus_description: "Melbourne City",
      },
      {
        day: "Thu",
        start: "17:30",
        duration: 60,
        location: "-",
        campus_description: "Canvas",
      },
      {
        day: "Thu",
        start: "16:30",
        duration: 60,
        location: "-",
        campus_description: "Canvas",
      },
    ],
  },
  {
    title: "Computing Theory",
    courseCode: "COSC1107_2350_1321_AUSCY",
    type: CourseType.Lecture,
    colour: "border-r-red-400",
    options: [
      {
        day: "Mon",
        start: "12:30",
        duration: "120",
        location: "080.04.006",
        campus_description: "Melbourne City",
      },
      {
        day: "Wed",
        start: "14:30",
        duration: "120",
        location: "-",
        campus_description: "Canvas",
      },
    ],
  },
  {
    title: "Computing Theory",
    courseCode: "COSC1107_2350_1321_AUSCY",
    type: CourseType.Tutorial,
    colour: "border-r-red-400",
    options: [
      {
        day: "Tue",
        start: "14:30",
        duration: "120",
        location: "056.07.098",
        campus_description: "Melbourne City",
      },
      {
        day: "Fri",
        start: "14:30",
        duration: "120",
        location: "056.07.098",
        campus_description: "Melbourne City",
      },
      {
        day: "Fri",
        start: "10:30",
        duration: "120",
        location: "056.07.098",
        campus_description: "Melbourne City",
      },
      {
        day: "Tue",
        start: "10:30",
        duration: "120",
        location: "057.03.002",
        campus_description: "Melbourne City",
      },
      {
        day: "Mon",
        start: "18:30",
        duration: "120",
        location: "-",
        campus_description: "Canvas",
      },
      {
        day: "Thu",
        start: "15:30",
        duration: "120",
        location: "013.03.005",
        campus_description: "Melbourne City",
      },
    ],
  },
];

export { ClassListData };

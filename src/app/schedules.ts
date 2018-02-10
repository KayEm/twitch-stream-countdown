import { Schedule } from "./schedule";

export const SCHEDULES: Schedule[] = [
  {
    id: 1,
    channelName: "csharpfritz",
    dayOfWeek: 2,
    timeOfDay: 10,
    timezone: "EST"
  }, // Tuesday, 10:00
  {
    id: 2,
    channelName: "csharpfritz",
    dayOfWeek: 4,
    timeOfDay: 10,
    timezone: "EST"
  }, // Thursday, 10:00
  {
    id: 3,
    channelName: "csharpfritz",
    dayOfWeek: 6,
    timeOfDay: 10,
    timezone: "EST"
  }, // Saturday, 10:00
  {
    id: 4,
    channelName: "noopkat",
    dayOfWeek: 2,
    timeOfDay: 13,
    timezone: "EST"
  }, // Tuesday 13:00
  {
    id: 5,
    channelName: "noopkat",
    dayOfWeek: 7,
    timeOfDay: 11,
    timezone: "EST"
  }, // Sunday 11:00
  {
    id: 6,
    channelName: "John_Papa",
    dayOfWeek: 3,
    timeOfDay: 14,
    timezone: "EST"
  } // Sunday 11:00
];

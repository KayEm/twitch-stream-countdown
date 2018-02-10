import { Injectable } from "@angular/core";

import { SCHEDULES } from "./schedules";
import { Schedule } from "./schedule";

import * as moment from "moment";

@Injectable()
export class ScheduleService {
  constructor() {}

  getNextStreamDateMoment(channelName: string): moment.Moment {
    let now = new Date();
    let schedule = this.getNextSchedule(channelName, now);

    if (schedule) {
      let scheduledDate = this.getDateFromSchedule(schedule, now);
      return moment.tz(scheduledDate, schedule.timezone);
    }

    return null;
  }

  getNextSchedule(channelName: string, now: Date): Schedule {
    let nextSchedule;
    for (const schedule of SCHEDULES) {
      if (schedule.channelName === channelName) {
        let scheduledDate = moment(this.getDateFromSchedule(schedule, now));
        let duration = moment(scheduledDate.diff(now));
        if (duration.days() >= 0 && duration.hours() >= 0) {
          if (!nextSchedule) {
            nextSchedule = schedule;
          } else if (nextSchedule.dayOfWeek >= schedule.dayOfWeek) {
            nextSchedule = schedule;
          }
        }
      }
    }
    return nextSchedule;
  }

  getDateFromSchedule(schedule: Schedule, now: Date): Date {
    let scheduledDate = new Date();
    scheduledDate.setDate(
      now.getDate() + (schedule.dayOfWeek + (7 - now.getDay())) % 7
    );
    scheduledDate.setHours(schedule.timeOfDay, 0);

    return scheduledDate;
  }
}

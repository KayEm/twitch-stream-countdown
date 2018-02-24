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
    let nextScheduleDuration;
    for (const currentSchedule of SCHEDULES) {
      if (currentSchedule.channelName === channelName) {
        let currentScheduledDate = moment(
          this.getDateFromSchedule(currentSchedule, now)
        );
        let localDateTime = moment(new Date(), moment.tz.guess());
        let currentScheduleDuration = moment(
          currentScheduledDate.diff(localDateTime)
        );
        if (
          currentScheduleDuration.days() >= 0 &&
          currentScheduleDuration.hours() >= 0 &&
          (!nextSchedule || nextScheduleDuration > currentScheduleDuration)
        ) {
          nextSchedule = currentSchedule;
          nextScheduleDuration = currentScheduleDuration;
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

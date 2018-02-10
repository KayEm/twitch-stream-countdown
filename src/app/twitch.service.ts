import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { environment } from "../environments/environment";

import { Channel } from "./channel";
import { User } from "./user";
import { Schedule } from "./schedule";
import { ScheduleService } from "./schedule.service";

import * as moment from "moment";
import "moment-timezone";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Client-ID": environment.twitchClientID
  })
};

@Injectable()
export class TwitchService {
  constructor(
    private http: HttpClient,
    private scheduleService: ScheduleService
  ) {}

  getUserChannels(user: User): Observable<Channel[]> {
    const url = `https://api.twitch.tv/kraken/users/${
      user.name
    }/follows/channels`;
    return this.http.get(url, httpOptions).pipe(
      tap(_ => console.log(`fetched user id=${user.name}`)),
      catchError(this.handleError<User>(`getUser id=${user.name}`)),
      map((response: any) => {
        const channels: Channel[] = [];
        response.follows.forEach(f => {
          channels.push({
            name: f.channel.display_name,
            url: f.channel.url,
            upcomingStreamDate: this.getNextStreamDate(f.channel.display_name),
            countdown: this.getCountdown(f.channel.display_name)
          });
        });
        return channels;
      })
    );
  }

  getNextStreamDate(channelName: string): string {
    let nextStreamDateMoment = this.scheduleService.getNextStreamDateMoment(
      channelName
    );
    if (nextStreamDateMoment) {
      return nextStreamDateMoment.format("YYYY-MMM-DD hh:mm");
    }

    return "";
  }

  getCountdown(channelName: string): string {
    let now = new Date();
    console.log(now);
    let localScheduledDate = this.scheduleService.getNextStreamDateMoment(
      channelName
    );

    if (localScheduledDate) {
      let duration = moment(localScheduledDate.diff(now));
      console.log("Days:", duration.days());
      console.log("Hours:", duration.hours());
      console.log("Minutes:", duration.minutes());

      return duration.format("D[ day(s)] H[ hour(s)] m[ minute(s)]");
    }

    return "";
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

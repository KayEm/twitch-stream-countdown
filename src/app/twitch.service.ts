import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Channel } from './channel';
import { User } from './user';
import { SCHEDULES } from './schedules';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as moment from 'moment';
import 'moment-timezone';

const httpOptions = {
  headers:
    new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Client-ID': '2rexbvlien4qdwv36868ie6vg6gt3k'
      }
    )
};

@Injectable()
export class TwitchService {
  private userUrl = 'https://api.twitch.tv/kraken/user';

  constructor(private http: HttpClient) { }

  getUserFollowsUrl(userId): string {
    let url = `https://api.twitch.tv/kraken/users/${userId}/follows/channels`;
    return url;
  }

  getUserChannels(user: User): Observable<Channel[]> {

    return this.http.get(this.getUserFollowsUrl(user.name), httpOptions)
      .pipe(
        map((response: any) => {
          const channels: Channel[] = [];
          response.follows.forEach(f => {
            channels.push({ 
            name: f.channel.display_name, 
            url: f.channel.url, 
            upcomingStreamDate: this.getNextStreamDate(f.channel.display_name) 
          });
        });
        return channels;
      }));
  }

  getNextStreamDate(channelName: string): string {
    var now = new Date();
    var dayOfWeek = now.getDay();
    for (let schedule of SCHEDULES) {
      var name = schedule.channelName == channelName;
      var next = schedule.dayOfWeek >= dayOfWeek;
      if (schedule.channelName === channelName && schedule.dayOfWeek >= dayOfWeek) {
        var scheduledDate = new Date();
        scheduledDate.setDate(now.getDate() + (schedule.dayOfWeek + (7 - now.getDay())) % 7);
        scheduledDate.setHours(schedule.timeOfDay, 0);

        return moment.tz(scheduledDate, schedule.timezone).format('YYYY-MMM-DD hh:mm');
      }
    }

    return null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.warn('TwitchService: ' + message);
  }

}

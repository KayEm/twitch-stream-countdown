import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Channel } from './channel';
import { User } from './user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: 
    new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Client-ID' : '2rexbvlien4qdwv36868ie6vg6gt3k'
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

  getFollowedChannels(token: string): Promise<Channel[]> {
    httpOptions.headers.append('Authorization', token);
    
    return this.http.get<User>(this.userUrl, httpOptions)
      .pipe(
        tap(user => this.log(`fetched user`)),
        catchError(this.handleError('getFollowedChannels', []))
      )
      .toPromise()
      .then(this.getUserChannels);
  }

  getUserChannels(user: User): Promise<Channel[]> {
    return this.http.get(this.getUserFollowsUrl(user.name), httpOptions)
      .pipe(
        tap(channels => this.log(`fetched channels`)),
        catchError(this.handleError('getChannels', []))
      )
      .toPromise().then(function(data) {
        return (<any>data).follows.map(
          followee => ({ 
            name: followee.channel.display_name,
            url: followee.channel.url
          }));
      });
  }

  private handleError<T> (operation = 'operation', result?: T) {
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

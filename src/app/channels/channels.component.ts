import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Channel } from '../channel';
import { TwitchService } from '../twitch.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  
  followedChannels: Channel[];

  constructor(private twitchService: TwitchService) { }

  ngOnInit() {
    // if (location.hash) {
    //   const parsedHash = queryString.parse(location.hash);
    //   this.getFollowedChannels(parsedHash['access_token']);
    // }
    // else {
      var me = new User();
      me.name = 'fitgeekgirl';    
      this.getUserChannels(me);
    // }
  }

  getUserChannels(user: User): void {
    this.twitchService.getUserChannels(user)
      .then(followedChannels => this.followedChannels = followedChannels);
  }

  getFollowedChannels(token: string): void {
    this.twitchService.getFollowedChannels(token)
      .then(followedChannels => this.followedChannels = followedChannels);
  }

  getTwitterUrl(handle: string): string {
    let url = `http://twitter.com/${handle}`;
    return url;
  }

}

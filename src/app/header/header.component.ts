import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getLoginUrl(): string {
    const clientId = '2rexbvlien4qdwv36868ie6vg6gt3k'; // your client ID, are public and can be shared (for example, embedded in the source of a Web page).
    const redirectUri = 'http://localhost:4200/'; // your registered redirect URI
    const responseType = 'token';
    const scope = 'user_read'; // space-separated list of scopes
    
    let url = `https://api.twitch.tv/kraken/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    return url;
  }
}

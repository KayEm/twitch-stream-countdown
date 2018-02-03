import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChannelsComponent } from './channels/channels.component';

import { TwitchService } from './twitch.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChannelsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ TwitchService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

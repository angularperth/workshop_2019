import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TimerService} from './timer.service';
import {AlarmService} from './alarm.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimerService, AlarmService],
  bootstrap: [AppComponent]
})
export class AppModule { }

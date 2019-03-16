import { Component } from '@angular/core';
import {TimerService} from './timer.service';
import {AlarmService} from './alarm.service';

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular App';

  constructor(public timer: TimerService, public alarm: AlarmService) {
  }

  timerStart() {
    this.timer.timerRunning$.subscribe((value) => {
      this.alarm.play();
    });
    this.timer.start();
  }

}

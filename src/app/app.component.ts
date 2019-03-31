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
    this.timer.taskInterval = 1500;
    this.timer.timerRunning$.subscribe((value) => {
      this.alarm.play();
    });
    this.timer.start();
  }
 timerPause() {
    this.timer.pause();
 }

 timeFormated(value) {
    let time = '';
    const hours = parseInt((value / 3600).toFixed(0), 10);
    const minutes = parseInt(((value - hours * 3600) / 60).toFixed(), 10);
    const seconds = value - (hours * 3600) - (minutes * 60);
    console.log('timeFormated:', hours, minutes, seconds);
    if (hours > 0) {
      time = hours + ':';
    }
    time = time + minutes + ':';
    if (seconds <= 9) {
      time = time + '0';
    }
    time = time + seconds;
    return time;
 }
}

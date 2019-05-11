import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { AlarmService } from '../../services/alarm.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(public timer: TimerService, public alarm: AlarmService) { }

  timerStart() {
    this.timer.stateChanged$.subscribe((value) => {
      this.alarm.play();
    });
    this.timer.start();
  }
  timerPause() {
    this.timer.pause();
  }


  ngOnInit() {
  }

}

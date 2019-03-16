import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timerName = 'First Timer';
  taskInterval = 10;
  isRunning = false;
  timerRunning$ = new Subject();
  timeLeft = 0;
  private theTimer;

  constructor() { }

  start() {
    this.timeLeft = this.taskInterval;
    this.timerRunning = true;
    this.theTimer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timerRunning = false;
        clearInterval(this.theTimer);
      }
    }, 1000);
  }

  set timerRunning(value: boolean) {
    if (this.isRunning && !value) { // only when the timer stops
      this.timerRunning$.next(false);
    }
    this.isRunning = value;
  }

  get timerRunning() {
    return this.isRunning;
  }
}

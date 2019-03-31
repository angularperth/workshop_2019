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
  timerPaused = false;
  private theTimer;

  constructor() { }

  start() {
    if (this.timerPaused) {
      this.timerPaused = false;
      this.timeLeft--;
    } else {
      this.timeLeft = this.taskInterval;
    }
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

  pause() {
    this.timerPaused = true;
    this.timerRunning = false;
    clearInterval(this.theTimer);
  }

  set timerRunning(value: boolean) {
    if (!this.timerPaused && this.isRunning && !value) { // only when the timer stops
      this.timerRunning$.next(false);
    }
    this.isRunning = value;
  }

  get timerRunning() {
    return this.isRunning;
  }
}

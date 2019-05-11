import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TimerState } from '../model/timer-state.enum';
import { Settings } from '../model/settings';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  state = TimerState.TASK;
  stateChanged$ = new Subject();
  taskCount = 0;
  timerName = 'First Timer';
  isRunning = false;
  timerRunning$ = new Subject();
  timeLeft = 0;
  clockPaused = false;
  private theTimer;

  constructor(private settings: Settings) { }

  start() {
    if (this.clockPaused) {
      this.clockPaused = false;
      this.timeLeft--;
    } else {
      this.timeLeft = this.settings.workIntervalSeconds;
    }
    this.timerRunning = true;
    this.theTimer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.timerRunning = false;
        // clearInterval(this.theTimer);
        this.stateChanged$.next(true);
        if (this.state === TimerState.TASK) {
          this.taskCount++;
        }
        this.state = this.nextState(this.state);
        this.timeLeft = this.stateDuration(this.state);
      }
    }, 1000);
  }

  nextState(currentState) {
    switch (currentState) {
      case TimerState.TASK:
        if (this.taskCount % this.settings.longBreakInterval === 0) {
          return TimerState.LONG_BREAK;
        } else {
          return TimerState.BREAK;
        }
        break;
      case TimerState.BREAK:
      case TimerState.LONG_BREAK:
        return TimerState.TASK;
        break;
    }
  }

  pause() {
    this.clockPaused = true;
    this.timerRunning = false;
    clearInterval(this.theTimer);
  }

  stateDuration(currentState) {
    switch (currentState) {
      case TimerState.TASK:
        return this.settings.workIntervalSeconds;
        break;
      case TimerState.BREAK:
        return this.settings.shortBreakSeconds;
        break;
      case TimerState.LONG_BREAK:
        return this.settings.longBreakSeconds;
        break;
    }
  }

  formatted(value) {
    let time = '';
    const hours = Math.floor((value / 3600));
    const minutes = Math.floor(((value - hours * 3600.0) / 60.0));
    const seconds = value - (hours * 3600) - (minutes * 60);
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

  set timerRunning(value: boolean) {
    if (!this.clockPaused && this.isRunning && !value) { // only when the timer stops
      this.timerRunning$.next(false);
    }
    this.isRunning = value;
  }

  get timerRunning() {
    return this.isRunning;
  }
}

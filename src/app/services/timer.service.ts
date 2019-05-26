import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TimerState } from '../model/timer-state.enum';
import { Settings } from '../model/settings';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  _state = TimerState.TASK;
  stateChanged$ = new Subject();
  taskCount = 0;
  timerName = 'First Timer';
  isRunning = false;
  timerRunning$ = new Subject();
  timeLeft = this.stateDuration(this.state);
  clockPaused = false;
  private theTimer;

  constructor(private settings: Settings) {
    this.refresh();
  }

  start() {
    if (this.clockPaused) {
      this.clockPaused = false;
      this.timeLeft--;
    } else {
      this.timeLeft = this.stateDuration(this.state);
    }
    this.timerRunning = true;
    this.theTimer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if (this.taskCount === this.settings.targetIntervals) {
          this.timerRunning = false;
          this.taskCount = 0;
          this.state = TimerState.TASK;
          clearInterval(this.theTimer);
        } else {
          this.stateChanged$.next(true);
          if (this.state === TimerState.TASK) {
            this.taskCount++;
          }
          this.state = this.nextState(this.state);
          this.timeLeft = this.stateDuration(this.state);
        }
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

  refresh() {
    if (!this.isRunning) {
      this.timeLeft = this.stateDuration(this.state);
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

  nameOfState(currentState): string {
    switch (currentState) {
      case TimerState.BREAK:
        return 'Taking a Break';
        break;
      case TimerState.LONG_BREAK:
        return 'Taking a Long Break';
        break;
      case TimerState.TASK:
        return 'Working on a Task';
        break;
    }
  }

  set state(value) {
    this._state = value;
  }

  get state() {
    return this._state;
  }

  stateDuration(currentState) {
    if (isNaN(this.timeLeft)) {
      this.timeLeft = 0;
    }
    let result = 0;
    switch (currentState) {
      case TimerState.TASK:
        result = (this.timeLeft === 0) ? this.settings.workIntervalSeconds : this.timeLeft;
        break;
      case TimerState.BREAK:
        result = (this.timeLeft === 0) ? this.settings.shortBreakSeconds : this.timeLeft;
        break;
      case TimerState.LONG_BREAK:
        result = (this.timeLeft === 0) ? this.settings.longBreakSeconds : this.timeLeft;
        break;
    }
    return result;
  }

  get stateName(): string {
    return this.nameOfState(this.state);
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

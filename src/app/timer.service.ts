import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timerName = "First Timer";
  taskInterval = 10;
  timerRunning = false;
  timeLeft = 0;
  private theTimer;

  constructor() { }

  start()
  {
    this.timeLeft = this.taskInterval;
    this.timerRunning = true;
    this.theTimer = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timerRunning = false;
        clearInterval(this.theTimer);
      }
    },1000);
  }
}

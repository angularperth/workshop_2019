import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  taskInterval : number = 10;
  breakInterval : number = 5;
  longBreakCount : number = 4;
  theTimer;
  timeLeft;
  timerRunning = false;

  myObservable : any;

  phase = '';

  constructor() {
    this.myObservable = Observable.create(observer => {
      observer.next('foo');
      setTimeout(() => observer.next('bar'), 1000);
    });
  }

  startTimer() {
    this.timeLeft = this.taskInterval;
    this.timerRunning = true;
    this.theTimer = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timerRunning = false;
        clearInterval(this.theTimer);
      }
    },1000)
  }
}

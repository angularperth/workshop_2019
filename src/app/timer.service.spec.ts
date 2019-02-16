import {discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimerService = TestBed.get(TimerService);
    expect(service).toBeTruthy();
  });

  it('task interval be 10', () => {
    const service: TimerService = TestBed.get(TimerService);
    expect(service.taskInterval).toEqual(10);
  });

  it('break interval be 5', () => {
    const service: TimerService = TestBed.get(TimerService);
    expect(service.breakInterval).toEqual(5);
  });

  it('break count be 4', () => {
    const service: TimerService = TestBed.get(TimerService);
    expect(service.longBreakCount).toEqual(4);
  });

  it('setInterval called', () => {
    spyOn(window, 'setInterval');
    const service: TimerService = TestBed.get(TimerService);
    service.startTimer();
    expect(setInterval).toHaveBeenCalled();
  });

  it('runs the timer', () => {
    const service: TimerService = TestBed.get(TimerService);
    service.startTimer();
    expect(service.timerRunning).toBeTruthy();
  });

  it('the timer counted', () => {
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 1;
    service.startTimer();
    expect(service.timerRunning).toBeTruthy();
  });

  it('the timer run and finished', () => {
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 1;
    service.startTimer();
    setTimeout(
    x=>{expect(service.timerRunning).toBeFalsy();}
    ,service.taskInterval+1000
    );
  });

  it('the timer run at least once', fakeAsync(() => {
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 10;
    service.startTimer();
    tick(1000);
    expect(service.timeLeft).toEqual(9);
    discardPeriodicTasks();
  }));

  it('the timer run 10 times', fakeAsync(() => {
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 10;
    service.startTimer();
    tick(1000);
    expect(service.timeLeft).toEqual(9);
    tick(1000);
    expect(service.timeLeft).toEqual(8);
    tick(1000);
    expect(service.timeLeft).toEqual(7);
    tick(1000);
    expect(service.timeLeft).toEqual(6);
    tick(1000);
    expect(service.timeLeft).toEqual(5);
    tick(1000);
    expect(service.timeLeft).toEqual(4);
    tick(1000);
    expect(service.timeLeft).toEqual(3);
    tick(1000);
    expect(service.timeLeft).toEqual(2);
    tick(1000);
    expect(service.timeLeft).toEqual(1);
    tick(1000);
    expect(service.timeLeft).toEqual(0);
    discardPeriodicTasks();
  }));

  it('is observable', fakeAsync(() => {
    const service :TimerService = TestBed.get(TimerService);
    expect(service.myObservable).toEqual('foo');
  }))
});

import {TestBed} from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterEach(()  => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    const service: TimerService = TestBed.get(TimerService);
    expect(service).toBeTruthy();
  });

  it('should be named "First Timer"', () => {
    const service: TimerService = TestBed.get(TimerService);
    expect(service.timerName).toEqual('First Timer');
  });

  it('task interval should be 10', () => {
    const service: TimerService = TestBed.get(TimerService);
    expect(service.taskInterval).toEqual(10);
  });

  it('setInterval called', () => {
    spyOn(window, 'setInterval');
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 1;
    service.start();
    expect(setInterval).toHaveBeenCalled();
  });

  it('timer is running', () => {
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 1;
    service.start();
    expect(service.timerRunning).toBeTruthy();
  });

  it('the timer counted', () => {
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 0;
    service.start();
    jasmine.clock().tick(1001);
    expect(service.timerRunning).toBeFalsy();
  });

  it('the timer counted and played alarm', () => {
    const service: TimerService = TestBed.get(TimerService);
    let alarmSounded = false;
    service.timerRunning$.subscribe((value) => {
      alarmSounded = true;
    });
    service.taskInterval = 0;
    service.start();
    jasmine.clock().tick(1001);
    expect(alarmSounded).toBeTruthy();
  });

  it('clearInterval called', () => {
    spyOn(window, 'clearInterval');
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 0;
    service.start();
    jasmine.clock().tick(1001);
    expect(clearInterval).toHaveBeenCalled();
  });

  it('paused set', () => {
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 1;
    service.start();
    service.pause();
    expect(service.timerPaused).toBeTruthy();
  });

  it('paused resumed', () => {
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 4;
    service.start();
    jasmine.clock().tick(1001);
    service.pause();
    expect(service.timerPaused).toBeTruthy();
    jasmine.clock().tick(1001);
    service.start();
    expect(service.timeLeft).toBeLessThan(4);
  });

  it('paused resumed one second later', () => {
    const service: TimerService = TestBed.get(TimerService);
    service.taskInterval = 4;
    service.start();
    jasmine.clock().tick(1001);
    service.pause();
    expect(service.timerPaused).toBeTruthy();
    service.start();
    expect(service.timeLeft).toBe(2);
  });

  it('pause without sounding alarm', () => {
    const service: TimerService = TestBed.get(TimerService);
    let alarmSounded = false;
    service.timerRunning$.subscribe((value) => {
      alarmSounded = true;
    });
    service.taskInterval = 4;
    service.start();
    jasmine.clock().tick(1001);
    service.pause();
    jasmine.clock().tick(1001);
    expect(alarmSounded).toBeFalsy();
  });
});

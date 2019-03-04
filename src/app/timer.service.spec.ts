import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterEach(function() {
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
});

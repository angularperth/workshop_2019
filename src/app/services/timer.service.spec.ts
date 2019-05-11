import { TestBed } from '@angular/core/testing';
import * as fc from 'fast-check';

import { TimerService } from './timer.service';
import { TimerState } from '../model/timer-state.enum';
import { Settings } from '../model/settings';

describe('TimerService', () => {
  const settings: Settings = new Settings();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {provide: Settings, useValue: settings} ]
    });
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

  it('setInterval called', () => {
    spyOn(window, 'setInterval');
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(1);
    service.start();
    expect(setInterval).toHaveBeenCalled();
  });

  it('timer is running', () => {
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(1);
    service.start();
    expect(service.timerRunning).toBeTruthy();
  });

  it('the timer task count increased', () => {
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(0);
    const oldTaskCount = service.taskCount;
    service.start();
    jasmine.clock().tick(1001);
    expect(service.taskCount).toBeGreaterThan(oldTaskCount);
    service.pause();
  });

  it('the alarm sounded', () => {
    const service: TimerService = TestBed.get(TimerService);
    let alarmSounded = false;
    service.stateChanged$.subscribe((value) => {
      alarmSounded = true;
    });
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(0);
    service.start();
    jasmine.clock().tick(1001);
    service.pause();
    expect(alarmSounded).toBeTruthy();
  });

  it('clearInterval called', () => {
    spyOn(window, 'clearInterval');
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(0);
    service.start();
    jasmine.clock().tick(1001);
    service.pause();
    expect(clearInterval).toHaveBeenCalled();
  });

  it('paused set', () => {
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(1);
    service.start();
    service.pause();
    expect(service.clockPaused).toBeTruthy();
  });

  it('paused resumed', () => {
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(4);

    service.start();
    jasmine.clock().tick(1001);
    service.pause();
    expect(service.clockPaused).toBeTruthy();
    jasmine.clock().tick(1001);
    service.start();
    expect(service.timeLeft).toBeLessThan(4);
  });

  it('paused resumed one second later', () => {
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(4);
    service.start();
    jasmine.clock().tick(1001);
    service.pause();
    expect(service.clockPaused).toBeTruthy();
    service.start();
    expect(service.timeLeft).toBe(2);
  });

  it('pause without sounding alarm', () => {
    const service: TimerService = TestBed.get(TimerService);
    let alarmSounded = false;
    service.timerRunning$.subscribe((value) => {
      alarmSounded = true;
    });
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(4);
    service.start();
    jasmine.clock().tick(1001);
    service.pause();
    jasmine.clock().tick(1001);
    expect(alarmSounded).toBeFalsy();
  });

  it('should display the current timer value', () => {
    const service: TimerService = TestBed.get(TimerService);
    let newT0: number = null;
    fc.assert(
      fc.property(fc.integer(0, 3600), (t0: number) => {
        const formattedTime = service.formatted(t0);
        const split = formattedTime.split(':');
        if (split.length === 3) {
          newT0 = parseInt(split[0], 10) * 60 * 60 + parseInt(split[1], 10) * 60 + parseInt(split[2], 10);
        } else {
          newT0 = parseInt(split[0], 10) * 60 + parseInt(split[1], 10);
        }
        return (t0 === newT0);
      })
    );
    expect(true).toBeTruthy();
  });

  it('should change state from TASK to BREAK', () => {
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(0);
    service.start();
    expect(service.state).toEqual(TimerState.TASK);
    jasmine.clock().tick(1001);
    service.pause();
    expect(service.state).toEqual(TimerState.BREAK);
  });

  it('should change state from BREAK to TASK', () => {
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(0);
    spyOnProperty(settings, 'shortBreakSeconds', 'get').and.returnValue(0);
    service.start();
    expect(service.state).toEqual(TimerState.TASK);
    jasmine.clock().tick(1001);
    expect(service.state).toEqual(TimerState.BREAK);
    jasmine.clock().tick(1001);
    service.pause();
    expect(service.state).toEqual(TimerState.TASK);
  });

  it('should change state from TASK to LONG BREAK', () => {
    const service: TimerService = TestBed.get(TimerService);
    spyOnProperty(settings, 'workIntervalSeconds', 'get').and.returnValue(0);
    spyOnProperty(settings, 'shortBreakSeconds', 'get').and.returnValue(0);
    spyOnProperty(settings, 'longBreakSeconds', 'get').and.returnValue(0);
    settings.longBreakInterval = 2;
    service.start();
    expect(service.state).toEqual(TimerState.TASK);
    jasmine.clock().tick(1001);
    expect(service.state).toEqual(TimerState.BREAK);
    jasmine.clock().tick(1001);
    expect(service.state).toEqual(TimerState.TASK);
    jasmine.clock().tick(1001);
    expect(service.state).toEqual(TimerState.LONG_BREAK);
  });
});

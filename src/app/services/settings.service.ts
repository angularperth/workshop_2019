import { Injectable } from '@angular/core';
import { Settings } from '../model/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(public settings: Settings) { }

  update(value: Settings) {
    console.log('SettingsService.update: a: ', value);
    this.settings.workIntervalDuration = value.workIntervalDuration;
    this.settings.shortBreakDuration = value.shortBreakDuration;
    this.settings.longBreakDuration = value.longBreakDuration;
    this.settings.longBreakInterval = value.longBreakInterval;
    this.settings.targetIntervals = value.targetIntervals;
    console.log('SettingsService.update: b:', this.settings);
  }

  retreive(): Settings {
    return new Settings();
  }
}

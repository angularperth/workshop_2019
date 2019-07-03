import { Injectable } from '@angular/core';
import { Settings } from '../model/settings';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  static storageKey = 'angularPerth.workshop2019.settings';
  myStorage: Storage;
  retreivedFlag = false;
  settingsChanged$ = new Subject();

  constructor(public settings: Settings) {
    settings.update(this.retrieve());
    this.retreivedFlag = true;
  }

  update(value: Settings) {
    this.settings.update(value);
    this.myStorage.setItem(SettingsService.storageKey, JSON.stringify(this.settings));
    this.settingsChanged$.next(true);
  }

  retrieve(): Settings {
    if (this.myStorage == null) {
      this.myStorage = window.localStorage;
    }
    const resultString = this.myStorage.getItem(SettingsService.storageKey);
    let result = this.settings;
    if (resultString != null) {
      result = JSON.parse(resultString);
    }
    return result;
  }

}

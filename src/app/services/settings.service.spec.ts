import { async, TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { Settings } from '../model/settings';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SettingsService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ Settings ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });

  it('key does\'t exist', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    const myStorage = window.localStorage;
    const result = myStorage.getItem(SettingsService.storageKey);
    expect(result).toBeNull();
  });

  it('key created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    const myStorage = window.localStorage;
    service.update(service.settings);
    const result = myStorage.getItem(SettingsService.storageKey);
    expect(result).not.toBeNull();
  });

  it('retrieved called', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service.retreivedFlag).toBeTruthy();
  });

  it('key retrieved', () => {
    const myStorage = window.localStorage;
    const mySettings: Settings = new Settings();
    myStorage.setItem(SettingsService.storageKey, JSON.stringify(mySettings));
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service.settings.workIntervalDuration).toEqual(25);
  });

  it('key updated', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    const myStorage = window.localStorage;
    service.update(service.settings);
    service.settings.workIntervalDuration = 30;
    service.update(service.settings);
    const result = service.retrieve();
    expect(result.workIntervalDuration).toEqual(30);
  });

});

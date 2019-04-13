import { async, TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { Settings } from '../model/settings';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SettingsService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ Settings ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });
});

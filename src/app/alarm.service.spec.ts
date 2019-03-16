import { TestBed } from '@angular/core/testing';

import { AlarmService } from './alarm.service';

describe('AlarmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
  it('should be created', () => {
    const service: AlarmService = TestBed.get(AlarmService);
    expect(service).toBeTruthy();
  });

  it('audio played', () => {
    const service: AlarmService = TestBed.get(AlarmService);
    const mySpy = spyOn(service, 'play');
    service.play();
    expect(mySpy).toHaveBeenCalled();
  });

});

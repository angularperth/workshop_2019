import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Settings } from '../../model/settings';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  settingsForm = new FormGroup({
    workIntervalDuration: new FormControl(''),
    shortBreakDuration: new FormControl(''),
    longBreakDuration: new FormControl(''),
    longBreakInterval: new FormControl(''),
    targetIntervals: new FormControl(''),
  });

  constructor(public settings: Settings, public settingsService: SettingsService) {
    this.settingsForm.setValue(settings);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key >= '0' && event.key <= '9'
        || event.key === 'Backspace'
        || event.key === 'ArrowLeft'
        || event.key === 'ArrowRight'
        || event.key === 'Tab') {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.settingsService.update(this.settingsForm.getRawValue());
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Settings } from '../../model/settings';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

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

  onSubmit() {
    this.settingsService.update(this.settingsForm.getRawValue());
  }

  ngOnInit() {
  }

}

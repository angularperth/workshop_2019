import { Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { AlarmService } from '../../services/alarm.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {

  constructor(public timer: TimerService, public alarm: AlarmService, public settingsService: SettingsService) {
    this.settingsService.settingsChanged$.subscribe((value) => {
      this.timer.reset();
    });
  }

  timerStart() {
    this.timer.stateChanged$.subscribe((value) => {
      this.alarm.play();
    });
    this.timer.start();
  }
  timerPause() {
    this.timer.pause();
  }

  destroy() {
    this.settingsService.settingsChanged$.unsubscribe();
    this.timer.stateChanged$.unsubscribe();
  }
}

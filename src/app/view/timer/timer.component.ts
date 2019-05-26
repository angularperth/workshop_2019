import { AfterViewChecked, Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { AlarmService } from '../../services/alarm.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements AfterViewChecked {

  constructor(public timer: TimerService, public alarm: AlarmService, public settingsService: SettingsService) { }

  timerStart() {
    this.timer.stateChanged$.subscribe((value) => {
      this.alarm.play();
    });
    this.timer.start();
  }
  timerPause() {
    this.timer.pause();
  }

  ngAfterViewChecked(): void {
    this.timer.refresh();
  }
}

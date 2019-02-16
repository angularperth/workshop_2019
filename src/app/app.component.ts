import { Component } from '@angular/core';
import { TimerService} from "./timer.service";
import { AlarmService} from "./alarm.service";
import { observe } from "rxjs-observe";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First App';

  constructor (public myTimer : TimerService) {
    const { observables, proxy } = observe(this.myTimer);
    observables.timerRunning.subscribe(value => console.log('isRunning:', value));
  }


}

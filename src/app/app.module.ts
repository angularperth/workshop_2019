import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AlarmService } from './services/alarm.service';
import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';
import { SettingsComponent } from './view/settings/settings.component';
import { SettingsService } from './services/settings.service';
import { Settings } from './model/settings';
import { TimerComponent } from './view/timer/timer.component';
import { TimerService } from './services/timer.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/timer', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent },
  { path: 'timer', component: TimerComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SettingsComponent,
    TimerComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [TimerService, AlarmService, Settings, SettingsService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

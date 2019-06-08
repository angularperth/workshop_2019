import { TestBed, async } from '@angular/core/testing';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';
import { SettingsComponent } from './view/settings/settings.component';
import { TimerComponent } from './view/timer/timer.component';
import { Settings } from './model/settings';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PageNotFoundComponent,
        SettingsComponent,
        TimerComponent
      ],
      imports: [
        RouterModule.forRoot([]),
        MatIconModule,
        MatToolbarModule,
        ReactiveFormsModule
      ],
      providers: [
        Settings
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // xit(`should have as title 'My First Angular App'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('My First Angular App');
  // });

  // xit('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to My First Angular App!');
  // });
});

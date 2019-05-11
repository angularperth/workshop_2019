export class Settings {
  workIntervalDuration = 25;
  shortBreakDuration = 5;
  longBreakDuration = 15;
  longBreakInterval = 4;
  targetIntervals = 16;

  update(value: Settings) {
    this.workIntervalDuration = value.workIntervalDuration;
    this.shortBreakDuration = value.shortBreakDuration;
    this.longBreakDuration = value.longBreakDuration;
    this.longBreakInterval = value.longBreakInterval;
    this.targetIntervals = value.targetIntervals;
  }

  get workIntervalSeconds() {
    return this.workIntervalDuration * 60;
  }

  get shortBreakSeconds() {
    return this.shortBreakDuration * 60;
  }

  get longBreakSeconds() {
    return this.longBreakDuration * 60;
  }
}

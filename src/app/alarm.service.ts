import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  context;
  oscillator;
  gain;

  constructor() {
    this.context = new AudioContext();
  }

  play() {
    this.oscillator = this.context.createOscillator();
    this.gain = this.context.createGain();
    this.oscillator.connect(this.gain);
    this.oscillator.type = 'triangle';
    this.gain.connect(this.context.destination);
    this.oscillator.start();
    this.gain.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + 1.5);
  }
}

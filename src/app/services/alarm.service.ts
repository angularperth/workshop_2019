import { Injectable } from '@angular/core';
import { AudioContext } from 'angular-audio-context';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  context;
  oscillator;
  gain;
  counter;

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
    const delay = setTimeout(() => {
        this.gain.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + .025);
        clearTimeout(delay);
      }, 250);

  }
}

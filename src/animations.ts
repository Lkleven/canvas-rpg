export class Animations {
  patterns: any;
  activeKey: string;

  constructor(patterns) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns).at(0);
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  play(key: string, startAtTime = 0) {
    if (this.activeKey === key) {
      return;
    }
    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  step(delta: number) {
    this.patterns[this.activeKey].step(delta);
  }
}

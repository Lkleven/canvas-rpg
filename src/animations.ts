import type { FrameIndexPattern } from "./frameIndexPattern";

export type AnimationPattern = {
  frame: number;
};

export class Animations {
  patterns: Record<string, FrameIndexPattern>;
  activeKey?: string;

  constructor(patterns: Record<string, FrameIndexPattern>) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns).at(0);
  }

  get frame() {
    if (!this.activeKey) {
      return undefined;
    }
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
    if (!this.activeKey) {
      return;
    }
    this.patterns[this.activeKey].step(delta);
  }
}

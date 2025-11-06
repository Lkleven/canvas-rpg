export class GameLoop {
  update: (deltaTime: number) => void;
  render: () => void;
  lastFrameTime: number;
  accumulatedTime: number;
  timeStep: number;
  rafId: number | null;
  isRunning: boolean;

  constructor(update: (deltaTime: number) => void, render: () => void) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60; // 60 FPS

    this.update = update;
    this.render = render;

    // requestAnimationFrame ID
    this.rafId = null;
    this.isRunning = false;
  }

  mainLoop = (timestamp: number) => {
    if (!this.isRunning) {
      return;
    }
    let deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    this.accumulatedTime += deltaTime;

    // Fixed time step updates
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();
    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      // this.lastFrameTime = performance.now();
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}

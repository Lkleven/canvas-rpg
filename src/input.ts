export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

const controls = {
  ArrowUp: UP,
  ArrowDown: DOWN,
  ArrowLeft: LEFT,
  ArrowRight: RIGHT,
  KeyW: UP,
  KeyS: DOWN,
  KeyA: LEFT,
  KeyD: RIGHT,
};

export class Input {
  heldDirections: string[];
  constructor() {
    this.heldDirections = [];

    document.addEventListener("keydown", (e) => {
      if (e.code in controls) {
        this.onArrowPressed(controls[e.code as keyof typeof controls]);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code in controls) {
        this.onArrowReleased(controls[e.code as keyof typeof controls]);
      }
    });
  }

  get direction() {
    return this.heldDirections.at(0);
  }

  onArrowPressed(direction: string) {
    if (!this.heldDirections.includes(direction)) {
      this.heldDirections.unshift(direction); // add to front
    }
  }

  onArrowReleased(direction: string) {
    const index = this.heldDirections.indexOf(direction);
    if (index === -1) {
      return;
    }
    this.heldDirections.splice(index, 1);
  }
}

import { GameObject } from "../../gameObject";

export class Level extends GameObject {
  background: GameObject | null;
  walls: Set<string>;
  constructor() {
    super({});
    this.background = null;
    this.walls = new Set<string>();
  }
}

import { GameObject } from "../../gameObject";
import type { Vector2 } from "../../vector2";

export class Level extends GameObject {
  background: GameObject | null;
  walls: Set<string>;
  heroStartPos: Vector2 | null;

  constructor() {
    super({});
    this.background = null;
    this.walls = new Set<string>();
    this.heroStartPos = null;
  }
}

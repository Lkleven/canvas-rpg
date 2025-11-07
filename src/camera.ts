import { events } from "./events";
import { GameObject } from "./gameObject";
import type { Level } from "./objects/level/level";
import { Vector2 } from "./vector2";

export class Camera extends GameObject {
  constructor() {
    super({});

    events.on("HERO_POSITION", this, (heroPosition: Vector2) => {
      this.centerPositionOnTarget(heroPosition);
    });

    // Camera knows when a new level starts
    events.on("CHANGE_LEVEL", this, (level: Level) => {
      console.log("::", level.heroStartPos);
      if (level.heroStartPos) {
        this.centerPositionOnTarget(level.heroStartPos);
      }
    });
  }

  centerPositionOnTarget(pos: Vector2) {
    const personHalf = 8;
    const canvasWidth = 320;
    const canvasHeight = 180;
    const halfWidth = -personHalf + canvasWidth / 2;
    const halfHeight = -personHalf + canvasHeight / 2;

    this.position = new Vector2(-pos.x + halfWidth, -pos.y + halfHeight);
  }
}

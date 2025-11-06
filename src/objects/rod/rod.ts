import { events } from "../../events";
import { GameObject } from "../../gameObject";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";

export class Rod extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    const sprite = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0, -5),
    });

    this.addChild(sprite);
  }

  ready() {
    events.on("HERO_POSITION", this, (pos: Vector2) => {
      const heroPos = positionRounded(pos);

      if (positionsOverlapping(this.position, heroPos)) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    // Remove instance
    this.destroy();
    // Alert other things that we have picked up the rod
    events.emit("ROD_PICKED_UP_BY_HERO", {
      image: resources.images.rod,
      position: this.position,
    });
  }
}

const positionRounded = (pos: Vector2) =>
  new Vector2(Math.round(pos.x), Math.round(pos.y));

const positionsOverlapping = (pos1: Vector2, pos2: Vector2) =>
  pos1.x === pos2.x && pos1.y === pos2.y;

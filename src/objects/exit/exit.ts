import { events } from "../../events";
import { GameObject } from "../../gameObject";
import { positionRounded, positionsOverlapping } from "../../helpers/position";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";

export class Exit extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    this.addChild(
      new Sprite({
        resource: resources.images.exit,
      }),
    );
    this.drawLayer = 0;
  }

  ready() {
    events.on("HERO_POSITION", this, (pos: Vector2) => {
      const heroPos = positionRounded(pos);

      if (positionsOverlapping(this.position, heroPos)) {
        events.emit("HERO_EXIT");
      }
    });
  }
}

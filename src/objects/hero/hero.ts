import { Animations } from "../../animations";
import { events } from "../../events";
import { FrameIndexPattern } from "../../frameIndexPattern";
import { GameObject } from "../../gameObject";
import { isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { DOWN } from "../../input";
import { walls } from "../../levels/level1";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";
import {
  WALK_UP,
  WALK_RIGHT,
  WALK_DOWN,
  WALK_LEFT,
  STAND_UP,
  STAND_RIGHT,
  STAND_DOWN,
  STAND_LEFT,
  PICK_UP,
} from "./animations";

export class Hero extends GameObject {
  facingDirection: string;
  destinationPos: Vector2;
  body: Sprite;
  lastX: number;
  lastY: number;
  itemPickupTime: number;
  itemPickupShell: GameObject | null;

  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });

    this.addChild(shadow);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 2,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkUp: new FrameIndexPattern(WALK_UP),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        standUp: new FrameIndexPattern(STAND_UP),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        pickUpDown: new FrameIndexPattern(PICK_UP),
      }),
    });

    this.addChild(this.body);

    this.facingDirection = DOWN;
    this.destinationPos = this.position.duplicate();
    this.lastX = 0;
    this.lastY = 0;
    this.itemPickupTime = 0;
    this.itemPickupShell = null;

    events.on("ROD_PICKED_UP_BY_HERO", this, (data) => {
      this.onPickUpItem(data);
    });

    console.log("Pos", this.position);
    console.log("Dest", this.destinationPos);
  }

  step(delta: number, root: GameObject) {
    // Locks movement on item pickup
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }

    const distance = moveTowards(this, this.destinationPos, 1);
    const hasArrived = distance <= 1;
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      return;
    }
    this.lastX = this.position.x;
    this.lastY = this.position.y;
    events.emit("HERO_POSITION", this.position);
  }

  tryMove(root: GameObject) {
    const gridSize = 16;
    const moveMap = {
      UP: {
        move: { x: 0, y: -gridSize },
        anim: "walkUp",
      },
      DOWN: {
        move: { x: 0, y: gridSize },
        anim: "walkDown",
      },
      LEFT: {
        move: { x: -gridSize, y: 0 },
        anim: "walkLeft",
      },
      RIGHT: {
        move: { x: gridSize, y: 0 },
        anim: "walkRight",
      },
    };
    const { input } = root;
    const dir = input.direction;
    if (!dir) {
      if (this.facingDirection === "UP") {
        this.body.animations.play("standUp");
      }
      if (this.facingDirection === "RIGHT") {
        this.body.animations.play("standRight");
      }
      if (this.facingDirection === "DOWN") {
        this.body.animations.play("standDown");
      }
      if (this.facingDirection === "LEFT") {
        this.body.animations.play("standLeft");
      }
      return;
    }

    if (!["UP", "DOWN", "LEFT", "RIGHT"].includes(dir)) {
      return;
    }

    let nextX = this.destinationPos.x;
    let nextY = this.destinationPos.y;

    type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
    const { move, anim } = moveMap[dir as Direction];
    if (move && anim) {
      nextX += move.x;
      nextY += move.y;
      this.body.animations.play(anim);

      this.facingDirection = input.direction ?? this.facingDirection;

      if (isSpaceFree(walls, nextX, nextY)) {
        this.destinationPos.x = nextX;
        this.destinationPos.y = nextY;
      }
    }
  }

  onPickUpItem(data) {
    const { image, position } = data;
    this.destinationPos = position;

    this.itemPickupTime = 500;
    this.itemPickupShell = new GameObject({});
    this.itemPickupShell = new Sprite({
      resource: image,
      position: new Vector2(0, -18),
    });
    this.addChild(this.itemPickupShell);
  }

  workOnItemPickup(delta: number) {
    this.itemPickupTime -= delta;
    this.body.animations.play("pickUpDown");

    if (this.itemPickupTime <= 0) {
      this.itemPickupShell?.destroy();
    }
  }
}

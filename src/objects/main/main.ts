import { Camera } from "../../camera";
import { events } from "../../events";
import { GameObject } from "../../gameObject";
import { Input } from "../../input";
import { Inventory } from "../inventory/inventory";
import { Level } from "../level/level";
import { SpriteTextString } from "../spriteTextString/spriteTextString";

export class Main extends GameObject {
  level: Level | null;
  input: Input;
  camera: Camera;

  constructor() {
    super({});
    this.level = null;
    this.input = new Input();
    this.camera = new Camera();
  }

  ready() {
    const inventory = new Inventory();
    this.addChild(inventory);

    const textBox = new SpriteTextString(
      "Hello! This is a very long text that should probably wrap around to multiple lines.",
    );
    this.addChild(textBox);
    events.on("CHANGE_LEVEL", this, (newLevel: Level) => {
      this.setLevel(newLevel);
    });
  }

  setLevel(level: Level) {
    if (this.level) {
      this.level.destroy();
    }

    this.level = level;
    this.addChild(this.level);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.level?.background?.drawImage(ctx, 0, 0);
  }

  drawObjects(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer !== "HUD") {
        child.draw(ctx, 0, 0);
      }
    });
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer === "HUD") {
        child.draw(ctx, 0, 0);
      }
    });
  }
}

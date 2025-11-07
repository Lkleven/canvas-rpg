import { Camera } from "../../camera";
import { events } from "../../events";
import { GameObject } from "../../gameObject";
import { Input } from "../../input";
import { Inventory } from "../inventory/inventory";
import { Level } from "../level/level";
import { SpriteTextString } from "../spriteTextString/spriteTextString";
import { TextBox } from "../textbox/textbox";

export class Main extends GameObject {
  level: Level | null;
  input: Input;
  camera: Camera;
  inventory: Inventory;
  textBox: SpriteTextString;

  constructor() {
    super({});
    this.level = null;
    this.input = new Input();
    this.camera = new Camera();
    this.inventory = new Inventory();
    this.textBox = new SpriteTextString(
      "Hello my friends! This is a very long text that should probably wrap around to multiple lines.",
    );
  }

  ready() {
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

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.inventory.draw(
      ctx,
      this.inventory.position.x,
      this.inventory.position.y,
    );

    this.textBox.draw(ctx, this.textBox.position.x, this.textBox.position.y);
  }
}

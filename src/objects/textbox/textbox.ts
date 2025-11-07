import { GameObject } from "../../gameObject";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";

export class TextBox extends GameObject {
  content: string;
  backdrop: Sprite;

  constructor() {
    super({
      position: new Vector2(16, 54),
    });
    this.content =
      "Hi, I'm a text box! It is true that i am mad being to son of my mother";
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.backdrop.draw(ctx, x, y);

    ctx.font = "12px fontRetroGaming";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";

    const MAX_WIDTH = 250;
    const LINE_HEIGHT = 20;
    const PADDING_LEFT = 10;
    const PADDING_TOP = 12;

    let words = this.content.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > MAX_WIDTH && n > 0) {
        ctx.fillText(line, x + PADDING_LEFT, y + PADDING_TOP, MAX_WIDTH);
        line = words[n] + " ";
        y += LINE_HEIGHT;
      } else {
        line = testLine;
      }
    }

    ctx.fillText(line, x + PADDING_LEFT, y + PADDING_TOP, MAX_WIDTH);
  }
}

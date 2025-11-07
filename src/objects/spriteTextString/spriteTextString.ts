import { GameObject } from "../../gameObject";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";
import { getCharFrame, getCharWidth } from "./spriteFontMap";

export class SpriteTextString extends GameObject {
  backdrop: Sprite;
  words: {
    wordWidth: number;
    chars: {
      width: number;
      sprite: Sprite;
    }[];
  }[];

  constructor(str: string) {
    super({
      position: new Vector2(16, 54),
    });

    const content = str ?? "Default text";

    this.words = content.split(" ").map((word) => {
      let wordWidth = 0;
      const chars = word.split("").map((char) => {
        const charWidth = getCharWidth(char);
        wordWidth += charWidth;
        return {
          width: charWidth,
          sprite: new Sprite({
            resource: resources.images.spriteFont,
            hFrames: 13,
            vFrames: 6,
            frame: getCharFrame(char),
          }),
        };
      });

      return {
        wordWidth,
        chars,
      };
    });

    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.backdrop.draw(ctx, x, y);

    // Config
    const PAD_LEFT = 7;
    const PAD_TOP = 7;
    const LINE_WIDTH_MAX = 240;
    const LINE_HEIGHT = 12;

    let cursorX = x + PAD_LEFT;
    let cursorY = y + PAD_TOP;

    this.words.forEach((word) => {
      // Decide if we can fit word on next line
      const spaceRemaining = x + LINE_WIDTH_MAX - cursorX;
      if (spaceRemaining < word.wordWidth) {
        cursorY += LINE_HEIGHT;
        cursorX = x + PAD_LEFT;
      }

      word.chars.forEach((char) => {
        const { sprite, width } = char;

        const withCharOffset = cursorX - 5; // 5 is about what is left of a character in sprite sheet
        sprite.draw(ctx, withCharOffset, cursorY);

        // Add width of the character we just printed to cursor pos, add 1px space
        cursorX += width + 1;
      });

      // After each word, add space
      cursorX += 3;
    });
  }
}

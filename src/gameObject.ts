import { events } from "./events";
import type { Input } from "./input";
import { Vector2 } from "./vector2";

export class GameObject {
  position: Vector2;
  children: GameObject[];
  parent: GameObject | null;
  hasReadyBeenCalled: boolean;
  input: Input | undefined;

  constructor({ position, input }: { position?: Vector2; input?: Input }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
    this.input = input;
  }

  // First entry point of the loop
  stepEntry(delta: number, root: any) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call ready on the first frame
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Call any implemented step code
    this.step(delta, root);
  }

  ready() {
    // ... exists here to be overridden by subclasses for now
  }

  // Called once every frame
  step(_delta: number, _root?: GameObject) {
    // ... exists here to be overridden by subclasses for now
  }

  // Draw entry
  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;
    // Do the actual rendering for Images
    this.drawImage(ctx, drawPosX, drawPosY);

    // Pass onto children
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(_ctx: CanvasRenderingContext2D, _x: number, _y: number) {
    // ... exists here to be overridden by subclasses for now
  }

  destroy() {
    this.children.forEach((child) => child.destroy());
    this.parent?.removeChild(this);
  }

  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((child) => child !== gameObject);
  }
}

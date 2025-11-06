import { Camera } from "./camera";
import { events } from "./events";
import { GameLoop } from "./gameloop";
import { GameObject } from "./gameObject";
import { gridCells } from "./helpers/grid";
import { Input } from "./input";
import { walls } from "./levels/level1";

import { Hero } from "./objects/hero/hero";
import { Inventory } from "./objects/inventory/inventory";
import { Rod } from "./objects/rod/rod";
import { resources } from "./resource";
import { Sprite } from "./sprite";
import "./style.css";
import { Vector2 } from "./vector2";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const mainScene = new GameObject({
  position: new Vector2(0, 0),
});

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

const rod = new Rod(gridCells(10), gridCells(6));
mainScene.addChild(rod);

const inventory = new Inventory();

mainScene.input = new Input();

const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

function drawWallBorders(ctx: CanvasRenderingContext2D, walls: Set<string>) {
  ctx.save();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  for (const pos of walls) {
    const [x, y] = pos.split(",").map(Number);
    ctx.strokeRect(x, y, 16, 16);
  }
  ctx.restore();
}

const draw = () => {
  // Clear stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  skySprite.draw(ctx, 0, 0);

  // Save the current state (for camera offset)
  ctx.save();

  // Offset by campera position
  ctx.translate(camera.position.x, camera.position.y);

  mainScene.draw(ctx, 0, 0);
  drawWallBorders(ctx, walls);

  // Restore to original state
  ctx.restore();

  // Draw anything above game world
  inventory.draw(ctx, 0, 0);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();

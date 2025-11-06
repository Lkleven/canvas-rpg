import { GameLoop } from "./gameloop";
import { Input } from "./input";
import { CaveLvl1 } from "./levels/caveLvl1";
import { OutdoorLvl1 } from "./levels/outdoorLvl1";

import { Main } from "./objects/main/main";
import "./style.css";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const mainScene = new Main();
// mainScene.setLevel(new OutdoorLvl1());
mainScene.setLevel(new CaveLvl1());
mainScene.input = new Input();

const update = (delta: number) => {
  // hero.step(delta, input);
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

  mainScene.drawBackground(ctx);

  // Save the current state (for camera offset)
  ctx.save();

  // Offset by campera position
  if (mainScene.camera) {
    ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
  }

  mainScene.draw(ctx, 0, 0);
  if (mainScene.level) {
    drawWallBorders(ctx, mainScene.level.walls);
  }
  // drawNumberedGrid(ctx, canvas.width, canvas.height, 16);

  // Restore to original state
  ctx.restore();

  // Draw anything above game world
  mainScene.drawForeground(ctx);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();

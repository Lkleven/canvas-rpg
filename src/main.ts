import { GameLoop } from "./gameloop";
// import { drawNumberedGrid } from "./helpers/grid";
import { Input } from "./input";
import { OutdoorLvl1 } from "./levels/outdoorLvl1";

import { Main } from "./objects/main/main";
import "./style.css";

// CONTINUE HERE https://youtu.be/yTFIciZKG0M?si=i6CWWeMys8PlwwTZ&t=1582
// TODO: Sound Effects
// TODO: Music
// TODO: Interaction
// TODO: Replace walls with instantiated objects with their own sprites and properties
// TODO: Fix Picked up items removed from level if going back (maybe a non-issue if not going backwards)
// TODO: Menu / Sound settings
// TODO: Island borders/walls

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const mainScene = new Main();
mainScene.setLevel(new OutdoorLvl1());
mainScene.input = new Input();

const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

// function drawWallBorders(ctx: CanvasRenderingContext2D, walls: Set<string>) {
//   ctx.save();
//   ctx.strokeStyle = "red";
//   ctx.lineWidth = 2;
//   for (const pos of walls) {
//     const [x, y] = pos.split(",").map(Number);
//     ctx.strokeRect(x, y, 16, 16);
//   }
//   ctx.restore();
// }

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

  mainScene.drawObjects(ctx);
  if (mainScene.level) {
    // drawWallBorders(ctx, mainScene.level.walls);
  }
  // drawNumberedGrid(ctx, canvas.width, canvas.height, 16);

  // Restore to original state
  ctx.restore();

  // Draw anything above game world
  mainScene.drawForeground(ctx);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();

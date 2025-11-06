import { events } from "../events";
import { gridCells } from "../helpers/grid";
import { buildWalls } from "../helpers/level";
import { Exit } from "../objects/exit/exit";
import { Hero } from "../objects/hero/hero";
import { Level } from "../objects/level/level";
import { Rod } from "../objects/rod/rod";
import { resources } from "../resource";
import { Sprite } from "../sprite";
import { Vector2 } from "../vector2";
import { OutdoorLvl1 } from "./outdoorLvl1";

export class CaveLvl1 extends Level {
  constructor() {
    super();

    this.background = new Sprite({
      resource: resources.images.cave,
      frameSize: new Vector2(320, 180),
    });

    const ground = new Sprite({
      resource: resources.images.caveGround,
      frameSize: new Vector2(320, 180),
    });

    this.addChild(ground);

    const exit = new Exit(gridCells(6), gridCells(1));
    this.addChild(exit);

    const hero = new Hero(gridCells(6), gridCells(5));
    this.addChild(hero);

    const rod = new Rod(gridCells(10), gridCells(6));
    this.addChild(rod);

    this.walls = buildWalls([...squares, ...water, ...rock]);
  }

  ready() {
    events.on("HERO_EXIT", this, () => {
      events.emit("CHANGE_LEVEL", new OutdoorLvl1());
    });
  }
}

const squares = [
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 3 },
  { x: 6, y: 3 },
  { x: 6, y: 4 },
  { x: 7, y: 4 },
  { x: 8, y: 3 },
  { x: 12, y: 5 },
  { x: 13, y: 5 },
  { x: 14, y: 6 },
];
const water = [
  { x: 6, y: 6 },
  { x: 7, y: 6 },
  { x: 8, y: 6 },
  { x: 11, y: 6 },
  { x: 12, y: 6 },
  { x: 13, y: 6 },
  { x: 15, y: 2 },
  { x: 16, y: 2 },
];
const rock = [
  { x: 2, y: 4 },
  { x: 3, y: 4 },
  { x: 3, y: 5 },
  { x: 9, y: 1 },
  { x: 12, y: 2 },
  { x: 13, y: 2 },
  { x: 13, y: 3 },
  { x: 16, y: 5 },
];

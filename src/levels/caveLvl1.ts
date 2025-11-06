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

    this.walls = buildWalls([...trees, ...squares, ...water, ...rock]);
  }

  ready() {
    events.on("HERO_EXIT", this, () => {
      events.emit("CHANGE_LEVEL", new OutdoorLvl1());
    });
  }
}

const trees = [
  { x: 4, y: 3 },
  { x: 14, y: 2 },
  { x: 13, y: 4 },
];
const squares = [
  { x: 4, y: 4 },
  { x: 4, y: 5 },
  { x: 5, y: 4 },
  { x: 5, y: 5 },
  { x: 8, y: 3 },
  { x: 9, y: 3 },
];
const water = [
  { x: 7, y: 5 },
  { x: 8, y: 5 },
  { x: 9, y: 5 },
  { x: 10, y: 5 },
];
const rock = [
  { x: 12, y: 6 },
  { x: 13, y: 6 },
  { x: 14, y: 6 },
];

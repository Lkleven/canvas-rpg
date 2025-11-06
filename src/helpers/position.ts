import { Vector2 } from "../vector2";

export const positionRounded = (pos: Vector2) =>
  new Vector2(Math.round(pos.x), Math.round(pos.y));

export const positionsOverlapping = (pos1: Vector2, pos2: Vector2) =>
  pos1.x === pos2.x && pos1.y === pos2.y;

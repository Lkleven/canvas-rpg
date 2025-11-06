import { posToPixels } from "./position";

export const buildWalls = (arrs: { x: number; y: number }[]) =>
  arrs.reduce((set, pos) => {
    set.add(posToPixels(pos.x, pos.y));
    return set;
  }, new Set<string>());

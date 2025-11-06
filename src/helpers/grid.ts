export const gridCells = (n: number) => n * 16;

export const isSpaceFree = (walls: Set<string>, x: number, y: number) =>
  !walls.has(`${x},${y}`);

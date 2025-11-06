export const walls: Set<string> = new Set();

const posToPixels = (x: number, y: number) => `${x * 16},${y * 16}`;

walls.add(posToPixels(4, 3)); // tree
walls.add(posToPixels(14, 2));
walls.add(posToPixels(13, 4));

walls.add(posToPixels(4, 4)); // squares
walls.add(posToPixels(4, 5));
walls.add(posToPixels(5, 4));
walls.add(posToPixels(5, 5));
walls.add(posToPixels(8, 3));
walls.add(posToPixels(9, 3));

walls.add(posToPixels(7, 5)); // water
walls.add(posToPixels(8, 5));
walls.add(posToPixels(9, 5));
walls.add(posToPixels(10, 5));

walls.add(posToPixels(12, 6)); // rock
walls.add(posToPixels(13, 6));
walls.add(posToPixels(14, 6));

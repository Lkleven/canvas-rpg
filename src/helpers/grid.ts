export const gridCells = (n: number) => n * 16;

export const isSpaceFree = (walls: Set<string>, x: number, y: number) =>
  !walls.has(`${x},${y}`);

export function drawNumberedGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridSize: number,
) {
  ctx.save();
  ctx.strokeStyle = "#ccc";
  ctx.font = "6px monospace";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const cols = Math.floor(width / gridSize);
  const rows = Math.floor(height / gridSize);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const px = x * gridSize;
      const py = y * gridSize;
      ctx.strokeRect(px, py, gridSize, gridSize);
      ctx.fillText(`${x},${y}`, px + gridSize / 2, py + gridSize / 2);
    }
  }

  ctx.restore();
}

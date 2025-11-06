import type { GameObject } from "../gameObject";
// import type { Sprite } from "../sprite";
import type { Vector2 } from "../vector2";

export const moveTowards = (
  movingSprite: GameObject,
  destinationPos: Vector2,
  speed: number,
) => {
  let distanceToTravelX = destinationPos.x - movingSprite.position.x;
  let distanceToTravelY = destinationPos.y - movingSprite.position.y;
  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

  if (distance <= speed) {
    // close enough to snap to destination
    movingSprite.position.x = destinationPos.x;
    movingSprite.position.y = destinationPos.y;
  } else {
    // move towards destination
    let normalizedX = distanceToTravelX / distance;
    let normalizedY = distanceToTravelY / distance;

    movingSprite.position.x += normalizedX * speed;
    movingSprite.position.y += normalizedY * speed;

    // recalculate remaining distance after moving
    distanceToTravelX = destinationPos.x - movingSprite.position.x;
    distanceToTravelY = destinationPos.y - movingSprite.position.y;
    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }

  return distance;
};

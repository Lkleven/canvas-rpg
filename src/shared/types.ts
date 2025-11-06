import type { Vector2 } from "../vector2";

export type Resource = {
  isLoaded: boolean;
  image: CanvasImageSource;
};

export type PickupEvent = {
  image: Resource;
  position: Vector2;
};

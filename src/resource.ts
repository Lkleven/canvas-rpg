import type { Resource } from "./shared/types";

const imageKeys = [
  "sky",
  "ground",
  "hero",
  "shadow",
  "rod",
  "exit",
  "cave",
  "caveGround",
] as const;
type ImageKey = (typeof imageKeys)[number];

type Images = {
  [key in ImageKey]: Resource;
};

class Resources {
  toLoad: Record<ImageKey, string>;
  images: Images;

  constructor() {
    // Everything we plan to download
    this.toLoad = {
      hero: "/sprites/hero-sheet.png",
      shadow: "/sprites/shadow.png",
      rod: "/sprites/rod.png",
      exit: "/sprites/exit.png",
      // Outdoors
      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",
      // Cave
      cave: "/sprites/cave.png",
      caveGround: "/sprites/cave-ground.png",
    };

    // A bucket to keep all our images
    this.images = {} as Images;

    imageKeys.forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = { image: img, isLoaded: false };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

// Export a singleton instance
export const resources = new Resources();

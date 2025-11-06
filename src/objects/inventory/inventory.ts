import { events } from "../../events";
import { GameObject } from "../../gameObject";
import { resources } from "../../resource";
import type { Resource } from "../../shared/types";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";

export class Inventory extends GameObject {
  items: { id: number; image: Resource }[];
  nextId: number = 0;

  constructor() {
    super({
      position: new Vector2(5, 5),
    });

    this.items = [
      { id: -1, image: resources.images.rod },
      { id: -2, image: resources.images.rod },
    ];

    // React to hero picking up item
    events.on("ROD_PICKED_UP_BY_HERO", this, (data) => {
      this.items.push({
        id: this.nextId++,
        image: resources.images.rod,
      });
      this.renderInventory();
    });

    this.renderInventory();
  }

  renderInventory() {
    // Remove stale drawings
    this.children.forEach((child) => child.destroy());

    // Update with existing items
    this.items.forEach((item, index) => {
      const sprite = new Sprite({
        resource: item.image,
        position: new Vector2(index * 16, 0),
      });

      this.addChild(sprite);
    });
  }

  removeFromInventory(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }
}

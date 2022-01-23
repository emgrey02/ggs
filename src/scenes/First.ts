import { Sprite, /* filters, */ Graphics } from 'pixi.js';
import { Group, Tween } from 'tweedle.js';
import { Manager } from '../Manager';
import { GameScene } from './GameScene';

export class First extends GameScene {
  private crown: Sprite;
  private bg: Sprite;
  private circle: Graphics;

  constructor() {
    super();

    this.bg = Sprite.from('bg');
    this.bg.width = Manager.width;
    this.bg.height = Manager.height;
    this.bg.zIndex = -1;
    this.addChild(this.bg);

    this.circle = new Graphics()
      .beginFill(0xff0000)
      .drawCircle(0, 0, 100)
      .endFill();
    // this.circle.filters = [new filters.BlurFilter()];
    this.addChild(this.circle);
    this.bg.mask = this.circle;

    this.crown = Sprite.from('crown');
    this.crown.anchor.set(0.5);
    this.crown.scale.set(0.1);
    this.crown.x = 100;
    this.crown.y = 100;
    this.addChild(this.crown);

    new Tween(this.crown)
      .to({ y: 105 }, 1000)
      .repeat(Infinity)
      .yoyo(true)
      .start();
  }

  override update(framesPassed: number): void {
    super.update(framesPassed);

    Group.shared.update();

    if (this.checkCollision(this.player, this.crown)) {
      Manager.changeScene(new GameScene());
    }

    this.updateCirclePosition(this.player.x, this.player.y);
  }

  updateCirclePosition(x: number, y: number) {
    this.circle.x = x;
    this.circle.y = y;
  }
}

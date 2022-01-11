import { Sprite } from 'pixi.js';
import { Group, Tween } from 'tweedle.js';
import { Manager } from '../Manager';
import { GameScene } from './GameScene';

export class First extends GameScene {
  private crown: Sprite;
  private bg: Sprite;

  constructor() {
    super();

    this.bg = Sprite.from('bg');
    this.bg.width = Manager.width;
    this.bg.height = Manager.height;
    this.bg.zIndex = -1;
    this.addChild(this.bg);

    this.crown = Sprite.from('crown');
    this.crown.anchor.set(0.5);
    this.crown.scale.set(0.2);
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
  }
}

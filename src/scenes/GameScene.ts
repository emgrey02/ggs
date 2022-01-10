import { Container, DisplayObject, Sprite } from 'pixi.js';
import { Manager } from '../Manager';
import { Keyboard } from '../Keyboard';
import { Tween, Group } from 'tweedle.js';
import { IScene } from './IScene';

export class GameScene extends Container implements IScene {
  private player: Sprite;
  playerVelocity: number;

  //portals
  private crown: Sprite;

  constructor() {
    super();

    this.player = Sprite.from('char');
    this.player.anchor.set(0.5);
    this.player.scale.set(0.7);
    this.player.x = Manager.width / 2;
    this.player.y = Manager.height / 2;
    this.addChild(this.player);

    this.crown = Sprite.from('crown');
    this.crown.anchor.set(0.5);
    this.crown.scale.set(0.05);
    this.crown.x = 100;
    this.crown.y = 100;
    this.addChild(this.crown);

    this.playerVelocity = 2;

    new Tween(this.crown)
      .to({ y: 105 }, 1000)
      .repeat(Infinity)
      .yoyo(true)
      .start();
  }

  checkCollision(objA: DisplayObject, objB: DisplayObject): boolean {
    const a = objA.getBounds();
    const b = objB.getBounds();

    const rightmostLeft = a.left < b.left ? b.left : a.left;
    const leftmostRight = a.right > b.right ? b.right : a.right;

    if (leftmostRight <= rightmostLeft) {
      return false;
    }

    const bottommostTop = a.top < b.top ? b.top : a.top;
    const topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;

    return topmostBottom > bottommostTop;
  }

  public update(framesPassed: number): void {
    Group.shared.update();

    if (this.checkCollision(this.player, this.crown)) {
      Manager.changeScene(new GameScene());
    }

    if (Keyboard.state.get('ArrowRight')) {
      this.player.x += this.playerVelocity * framesPassed;
    }

    if (Keyboard.state.get('ArrowUp')) {
      this.player.y -= this.playerVelocity * framesPassed;
    }

    if (Keyboard.state.get('ArrowDown')) {
      this.player.y += this.playerVelocity * framesPassed;
    }

    if (Keyboard.state.get('ArrowLeft')) {
      this.player.x -= this.playerVelocity * framesPassed;
    }

    if (this.player.x > Manager.width) {
      this.player.x = Manager.width;
    }

    if (this.player.x < 0) {
      this.player.x = 0;
    }

    if (this.player.y > Manager.height) {
      this.player.y = Manager.height;
    }

    if (this.player.y < 0) {
      this.player.y = 0;
    }
  }
}

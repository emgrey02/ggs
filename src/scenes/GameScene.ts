import { Container, DisplayObject, Sprite } from 'pixi.js';
import { Manager } from '../Manager';
import { Keyboard } from '../Keyboard';
import { IScene } from './IScene';
import { Intro } from './Intro';

export class GameScene extends Container implements IScene {
  public player: Sprite;
  playerVelocity: number;
  public mainMenuButton: Sprite;

  constructor() {
    super();

    this.player = Sprite.from('char');
    this.player.anchor.set(0.5);
    this.player.scale.set(0.7);
    this.player.x = 30;
    this.player.y = Manager.height / 2;
    this.addChild(this.player);

    this.playerVelocity = 2;

    this.mainMenuButton = Sprite.from('main-menu');
    this.mainMenuButton.anchor.set(0.5);
    this.mainMenuButton.x = 100;
    this.mainMenuButton.y = 30;
    this.addChild(this.mainMenuButton);
    this.mainMenuButton.interactive = true;

    this.mainMenuButton.on('pointertap', () => {
      Manager.changeScene(new Intro());
      document.body.style.cursor = 'inherit';
    });

    this.mainMenuButton.on('pointerover', () => {
      document.body.style.cursor = 'pointer';
      this.mainMenuButton.tint = 0x555555;
    });

    this.mainMenuButton.on('pointerout', () => {
      this.mainMenuButton.tint = 0xffffff;
      document.body.style.cursor = 'inherit';
    });
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

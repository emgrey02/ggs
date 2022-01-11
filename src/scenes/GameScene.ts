import {
  BLEND_MODES,
  Container,
  DisplayObject,
  Point,
  SimpleRope,
  Sprite,
  Texture,
} from 'pixi.js';
import { Manager } from '../Manager';
import { Keyboard } from '../Keyboard';
import { IScene } from './IScene';
import { Intro } from './Intro';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export class GameScene extends Container implements IScene {
  public player: Sprite;
  playerVelocity: number;
  public mainMenuButton: Sprite;

  //player movement trail
  private trailTexture: Texture;
  private historyX: number[] = [];
  private historyY: number[] = [];
  private historySize: number = 50;
  private ropeSize: number = 300;
  private points: Point[] = [];
  private rope: SimpleRope;

  constructor() {
    super();

    //cool trail!
    this.trailTexture = Texture.from('trail');
    //create history array
    for (let i = 0; i < this.historySize; i++) {
      this.historyX.push(0);
      this.historyY.push(0);
    }
    //create rope points
    for (let i = 0; i < this.ropeSize; i++) {
      this.points.push(new Point(30, Manager.height / 2));
    }
    //create the rope
    this.rope = new SimpleRope(this.trailTexture, this.points);
    //set the blendmode
    this.rope.blendMode = BLEND_MODES.ADD;
    this.rope.alpha = 0;
    this.addChild(this.rope);

    //make the player
    this.player = Sprite.from('char');
    this.player.anchor.set(0.5);
    this.player.scale.set(0.7);
    this.player.x = 30;
    this.player.y = 30;
    this.addChild(this.player);

    //set the player's velocity
    this.playerVelocity = 2;

    //player shadow
    this.player.filters = [
      new DropShadowFilter({
        blur: 0.5,
        quality: 1,
        pixelSize: 0.5,
        resolution: 2,
        distance: 7,
        rotation: 200,
      }),
    ];

    //create main menu button
    this.mainMenuButton = Sprite.from('main-menu');
    this.mainMenuButton.anchor.set(0.5);
    this.mainMenuButton.x = 100;
    this.mainMenuButton.y = Manager.height - 60;
    this.addChild(this.mainMenuButton);
    this.mainMenuButton.interactive = true;

    //event listeners for main menu button
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
    this.updatePlayerPosition(this.player.x, this.player.y);
    this.rope.alpha = 1;
  }

  updatePlayerPosition(x: number, y: number): void {
    const playerPosition = [x, y];

    this.historyX.pop();
    this.historyX.unshift(playerPosition[0]);
    this.historyY.pop();
    this.historyY.unshift(playerPosition[1]);

    //update points to correspond with history
    for (let i = 0; i < this.ropeSize; i++) {
      const p: Point = this.points[i];

      //smooth the curve w/ cubic interpolation to prevent sharp edges
      const ix = this.cubicInterpolation(
        this.historyX,
        (i / this.ropeSize) * this.historySize
      );
      const iy = this.cubicInterpolation(
        this.historyY,
        (i / this.ropeSize) * this.historySize
      );

      p.x = ix;
      p.y = iy;
    }
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
  /**
   * Cubic interpolation based on https://github.com/osuushi/Smooth.js
   */
  clipInput(k: number, arr: number[]) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
  }

  getTangent(k: number, factor: number, array: number[]): number {
    return (
      (factor * (this.clipInput(k + 1, array) - this.clipInput(k - 1, array))) /
      2
    );
  }

  cubicInterpolation(array: number[], t: number, tangentFactor?: number) {
    if (tangentFactor == null) tangentFactor = 1;

    const k = Math.floor(t);
    const m = [
      this.getTangent(k, tangentFactor, array),
      this.getTangent(k + 1, tangentFactor, array),
    ];
    const p: number[] = [
      this.clipInput(k, array),
      this.clipInput(k + 1, array),
    ];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (
      (2 * t3 - 3 * t2 + 1) * p[0] +
      (t3 - 2 * t2 + t) * m[0] +
      (-2 * t3 + 3 * t2) * p[1] +
      (t3 - t2) * m[1]
    );
  }
}

import { Container, TextStyle, Text, Sprite } from 'pixi.js';
import { Group, Tween } from 'tweedle.js';
import { Manager } from '../Manager';
import { First } from './First';
import { IScene } from './IScene';

export class Intro extends Container implements IScene {
  private title: Text;
  private style: TextStyle;
  private startButton: Sprite;
  private instrButton: Sprite;

  constructor() {
    super();

    this.style = new TextStyle({
      fontFamily: 'Single Day',
      fontSize: 60,
      fill: '#000000',
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      lineJoin: 'round',
    });

    this.title = new Text('Game Title', this.style);
    this.title.anchor.set(0.5);
    this.title.x = Manager.width / 2;
    this.title.y = 100;
    this.addChild(this.title);

    this.startButton = Sprite.from('start');
    this.startButton.anchor.set(0.5);
    this.startButton.scale.set(0.5);
    this.startButton.x = Manager.width / 2;
    this.startButton.y = Manager.height / 2;
    this.addChild(this.startButton);

    this.startButton.interactive = true;
    this.startButton.on('pointerover', () => {
      document.body.style.cursor = 'pointer';
    });
    this.startButton.on('pointerout', () => {
      document.body.style.cursor = 'default';
    });

    this.startButton.on('pointertap', this.onClick, this);

    this.instrButton = Sprite.from('inst-primary');
    this.instrButton.anchor.set(0.5);
    this.instrButton.scale.set(0.5);
    this.instrButton.x = Manager.width / 5;
    this.instrButton.y = Manager.height - 100;
    this.addChild(this.instrButton);

    new Tween(this.startButton)
      .to({ y: 228 }, 1000)
      .repeat(Infinity)
      .yoyo(true)
      .start();
  }

  public update(framesPassed: number): void {
    Group.shared.update();
    this.startButton.x += 0.1 * framesPassed;
    if (this.startButton.x >= Manager.width / 2 + 1) {
      this.startButton.x = Manager.width / 2 + 1;
    }
  }

  private onClick(): void {
    document.body.style.cursor = 'default';
    Manager.changeScene(new First());
  }
}

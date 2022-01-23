import { Container, TextStyle, Text  } from 'pixi.js';
import { Group } from 'tweedle.js';
import { Manager } from '../Manager';
import { First } from './First';
import { IScene } from './IScene';

export class Intro extends Container implements IScene {
  private titleStyle: TextStyle;
  private linkHeavy: TextStyle;
  private link: TextStyle;
  private focus: TextStyle;

  constructor() {
    super();

    this.titleStyle = new TextStyle({
      fontFamily: 'Bungee',
      fontSize: 96,
      fill: '#000000',
    });

    this.linkHeavy = new TextStyle({
      fontFamily: 'Urbanist',
      fontSize: 48,
      fontWeight: '600',
      fill: '#238390  ',
    });

    this.link = new TextStyle({
      fontFamily: 'Urbanist',
      fontSize: 48,
      fontWeight: '400',
      fill: '#000000',
    });

    this.focus = new TextStyle({
      fontFamily: 'Urbanist',
      fontSize: 48,
      fontWeight: '600',
      fill: '#000000',
      dropShadow: true,
      dropShadowAlpha: 0.8,
      dropShadowAngle: -4.2,
      dropShadowBlur: 8,
      dropShadowDistance: 3,
    })

    let title = new Text('Game Title', this.titleStyle);
    title.anchor.set(0.5);
    title.x = Manager.width / 2;
    title.y = 100;
    this.addChild(title);

    let start = new Text('start', this.linkHeavy);
    start.anchor.set(0.5);
    start.scale.set(0.5);
    start.x = Manager.width / 2;
    start.y = Manager.height / 2;
    this.addChild(start);

    let controls = new Text('controls', this.link);
    controls.anchor.set(0.5);
    controls.scale.set(0.5);
    controls.x = Manager.width / 2;
    controls.y = Manager.height / 2 + 30;
    this.addChild(controls);

    let settings = new Text('settings', this.link);
    settings.anchor.set(0.5);
    settings.scale.set(0.5);
    settings.x = Manager.width / 2;
    settings.y = Manager.height / 2 + 60;
    this.addChild(settings);

    let credits = new Text('credits', this.link);
    credits.anchor.set(0.5);
    credits.scale.set(0.5);
    credits.x = Manager.width / 2;
    credits.y = Manager.height / 2 + 90;
    this.addChild(credits);

    start.interactive = true;
    controls.interactive = true;
    settings.interactive = true;
    credits.interactive = true;

    start.on('pointerover', () => {
      document.body.style.cursor = 'pointer';
      start.style = this.focus;
    });
    start.on('pointerout', () => {
      document.body.style.cursor = 'default';
      start.style = this.linkHeavy;
    });
    start.on('pointertap', this.onClick, this);


    controls.on('pointerover', () => {
      document.body.style.cursor = 'pointer';
      controls.style = this.focus;
    });
    controls.on('pointerout', () => {
      document.body.style.cursor = 'default';
      controls.style = this.link;
    });

    settings.on('pointerover', () => {
      document.body.style.cursor = 'pointer';
      settings.style = this.focus;
    });
    settings.on('pointerout', () => {
      document.body.style.cursor = 'default';
      settings.style = this.link;
    });

    credits.on('pointerover', () => {
      document.body.style.cursor = 'pointer';
      credits.style = this.focus;
    });
    credits.on('pointerout', () => {
      document.body.style.cursor = 'default';
      credits.style = this.link;
    });
    

    start.accessible = true;
    controls.accessible = true;
    settings.accessible = true;
    credits.accessible = true;  

  }

  public update(framesPassed: number): void {
    Group.shared.update();
    console.log(framesPassed);
  }

  private onClick(): void {
    document.body.style.cursor = 'default';
    Manager.changeScene(new First());
  }
}

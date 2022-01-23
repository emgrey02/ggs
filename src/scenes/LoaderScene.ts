import { Container, Graphics, Loader } from 'pixi.js';
import { assets } from '../assets';
import { Manager } from '../Manager';
import { Intro } from './Intro';
import { WebfontLoaderPlugin } from 'pixi-webfont-loader';

export class LoaderScene extends Container {
  // for making our loader graphics...
  private loaderBar: Container;
  private loaderBarBorder: Graphics;
  private loaderBarFill: Graphics;

  constructor() {
    super();

    // lets make a loader graphic:
    const loaderBarWidth = Manager.width * 0.8; // just an auxiliar variable
    // the fill of the bar.
    this.loaderBarFill = new Graphics();
    this.loaderBarFill.beginFill(0x008800, 1);
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
    this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0; // we draw the filled bar and with scale we set the %

    // The border of the bar.
    this.loaderBarBorder = new Graphics();
    this.loaderBarBorder.lineStyle(10, 0x0, 1);
    this.loaderBarBorder.drawRect(0, 0, loaderBarWidth, 50);

    // Now we keep the border and the fill in a container so we can move them together.
    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBorder);
    //Looks complex but this just centers the bar on screen.
    this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
    this.addChild(this.loaderBar);

    //allow for web fonts
    Loader.registerPlugin(new WebfontLoaderPlugin);

    // Now the actual asset loader:
    // we add the asset manifest
    Loader.shared.add(assets);

    // connect the events
    Loader.shared.onProgress.add(this.downloadProgress, this);
    Loader.shared.onComplete.once(this.gameLoaded, this);

    // Start loading!
    Loader.shared.load();
  }

  private downloadProgress(loader: Loader): void {
    // Progress goes from 0 to 100 but we are going to use 0 to 1 to set it to scale
    const progressRatio = loader.progress / 100;
    this.loaderBarFill.scale.x = progressRatio;
  }

  private gameLoaded(): void {
    // Our game finished loading!

    // Let's remove our loading bar
    this.removeChild(this.loaderBar);
    Manager.changeScene(new Intro());
    // all your assets are ready! I would probably change to another scene
    // ...but you could build your entire game here if you want
    // (pls don't)
  }

  public update(framesPassed: number): void {
    console.log(framesPassed);
  }
}

import { Manager } from './Manager';
import { LoaderScene } from './scenes/LoaderScene';

Manager.initialize(960, 540, 0xc4c4c4);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

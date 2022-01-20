import { Manager } from './Manager';
import { LoaderScene } from './scenes/LoaderScene';

Manager.initialize(960, 540, 0x3f5579);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

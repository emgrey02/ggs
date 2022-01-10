import { Manager } from './Manager';
import { LoaderScene } from './scenes/LoaderScene';

Manager.initialize(640, 480, 0x333333);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

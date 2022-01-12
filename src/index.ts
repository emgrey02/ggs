import { Manager } from './Manager';
import { LoaderScene } from './scenes/LoaderScene';

Manager.initialize(640, 480, 0x111111);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

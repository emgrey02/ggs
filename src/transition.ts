import { Container, Graphics } from 'pixi.js';
import { Manager } from './Manager';

export const transition = async (currentScene: Container): Promise<any> => {
  let square = new Graphics();
  square.beginFill(0x000000);
  square.drawRect(0, 0, Manager.width, Manager.height);
  square.endFill();

  square.alpha = 1;
  currentScene.addChild(square);

  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (square.alpha <= 0) {
        resolve('done');
        clearInterval(interval);
      }
      square.alpha -= 0.05;
    }, 50);
  });
};

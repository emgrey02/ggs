import { DisplayObject } from 'pixi.js';

export interface IScene extends DisplayObject {
  update(framesPassed: number): void;
}

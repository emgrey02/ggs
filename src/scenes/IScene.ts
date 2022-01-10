import { Container } from 'pixi.js';

export interface IScene extends Container {
  update(framesPassed: number): void;
}

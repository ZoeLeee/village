import { Water } from 'three/examples/jsm/objects/Water2.js';
import { PlaneBufferGeometry, Vector2 } from 'three';
import { textureLoader } from './loaders';
import { IMG_CDN_HOST } from '../utils/host';

export class WaterObject {
  static GetWater(width, height, position, params = {
    color: '#257f6f',
    scale: 10,
    flowX: 1,
    flowY: 1
  }) {
    let waterGeometry = new PlaneBufferGeometry(width, height);
    let w = new Water(waterGeometry, {
      color: params.color,
      scale: params.scale,
      flowDirection: new Vector2(params.flowX, params.flowY),
      textureWidth: 1024,
      textureHeight: 1024,
      normalMap0: textureLoader.load(IMG_CDN_HOST + "Water_1_M_Normal.jpg"),
      normalMap1: textureLoader.load(IMG_CDN_HOST + "Water_2_M_Normal.jpg"),
    });
    w.position.copy(position);
    return w;
  }
}
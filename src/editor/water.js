import { Water } from 'three/examples/jsm/objects/Water2.js';
import { PlaneBufferGeometry, Vector2 } from 'three';
import { textureLoader } from './loaders';

export class WaterObject{
  static GetWater(width,height,position,params = {
    color: '#257f6f',
    scale: 10,
    flowX: 1,
    flowY: 1
  }){
    let waterGeometry = new PlaneBufferGeometry( width, height );
    let w= new Water( waterGeometry, {
      color: params.color,
      scale: params.scale,
      flowDirection: new Vector2( params.flowX, params.flowY ),
      textureWidth: 1024,
      textureHeight: 1024,
      normalMap0:textureLoader.load("http://cdn2.dodream.top/Water_1_M_Normal.jpg?key=joelee"),
      normalMap1:textureLoader.load("http://cdn2.dodream.top/Water_2_M_Normal.jpg?key=joelee"),
    } );
    w.position.copy(position);
    return w;
  }
}
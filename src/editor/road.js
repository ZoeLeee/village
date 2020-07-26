import { extrudePolygon } from 'geometry-extrude';
import * as THREE from 'three';
import { Vector2, Shape, Mesh, ShapeBufferGeometry } from 'three';
import { MeshBasicMaterial } from 'three';

export function getRoadGeo(squareWithHole) {
  console.log('squareWithHole: ', squareWithHole);
  const { indices, position,  normal } = extrudePolygon(squareWithHole, {
    depth: 0.5,
  });
  console.log('position: ', position);
  console.log('indices: ', indices);
  const geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.Float32BufferAttribute(position, 3));
  geometry.addAttribute('normal', new THREE.Float32BufferAttribute(normal, 3));
  geometry.setIndex(new THREE.Uint16BufferAttribute(indices, 1));
  return geometry;
}

const ROAD_MATIAL=new MeshBasicMaterial({color:0x66676B});

class Road{
  constructor(sp,ep,width){
    this._width=width||4;
    this.startPoint=sp;
    this.endPoint=ep;
    this.init();
  }
  init(){
    let dir=this.endPoint.clone().sub(this.startPoint).normalize();
    dir.rotateAround(new Vector2(),Math.PI/2).multiplyScalar(this._width);

    let dir2=dir.clone().negate();

    let pts=[
      this.startPoint.clone().add(dir),
      this.startPoint.clone().add(dir2),
      this.endPoint.clone().add(dir2),
      this.endPoint.clone().add(dir)
    ];
    this._shape=new Shape(pts);
    this.intance= new Mesh(new ShapeBufferGeometry(this._shape),ROAD_MATIAL);
  }
}

export class RoadFactroy{
  static GetRoad(sp,ep,width){
    return new Road(sp,ep,width)
  }
}

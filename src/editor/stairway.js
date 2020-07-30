import { Mesh, MeshLambertMaterial, Shape } from "three";
import { ExtrudeGeometry } from "three/build/three.module";
import { StairwayHeihgt } from "./enums";

export class Stairway {
  constructor(){
    this.init();
  }
  init() {
    const height =StairwayHeihgt;
    const width = 6;
    const count = 5;
    const width2 =1

    let shape = new Shape();

    shape.moveTo(0, 0);
    shape.lineTo(width,0);

    let h = height / count;

    for (let i = 1; i <= count; i++) {
      shape.lineTo(width - width2 * (i - 1), h * i);
      if (i < count)
        shape.lineTo(width - width2 * i, h * i);
    }
    shape.lineTo(0,height);
    shape.lineTo(0,0);

    var extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1
    };
    
    var geometry = new ExtrudeGeometry( shape, extrudeSettings );
    var material = new MeshLambertMaterial( { color: 0x66676B } );
    this.intance=new Mesh( geometry, material ) ;
    this.intance.rotation.x=Math.PI/2
  }
}
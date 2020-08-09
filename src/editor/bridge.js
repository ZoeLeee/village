import { ExtrudeBufferGeometry, Group, Mesh, MeshLambertMaterial, Shape, TubeBufferGeometry, Vector2 } from "three";
import { RIVER_WIDTH } from "./enums";
import { Shape3 } from './Shape3';

export class Bridge {
  constructor() {
    this.init();
  }
  init() {
    const Height = 4;

    let group = new Group();
    let shape = new Shape([
      new Vector2(),
      new Vector2(4),
      new Vector2(4, Height / 2),
      new Vector2(4, Height / 2),
      new Vector2(8.5, Height / 2),
      new Vector2(8.5, 0),
      new Vector2(11.5, 0),
      new Vector2(11.5, Height / 2),
      new Vector2(16, Height / 2),
      new Vector2(16, 0),
      new Vector2(RIVER_WIDTH, 0),
      new Vector2(RIVER_WIDTH - 2, Height),
      new Vector2(2, Height),
      new Vector2(),
    ])

    var extrudeSettings = {
      steps: 2,
      depth: 4,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1
    };

    let geo = new ExtrudeBufferGeometry(shape, extrudeSettings);
    let mesh = new Mesh(geo, new MeshLambertMaterial({ color: 0xffffff }));
    mesh.rotation.x = Math.PI / 2;

    shape = new Shape([
      new Vector2(2, Height),
      new Vector2(RIVER_WIDTH - 2, Height),
      new Vector2(RIVER_WIDTH - 2, Height + 2),
      new Vector2(2, Height + 2),
    ])

    //栏杆
    const LANGAN_HEIGHT=2;
    const LANGAN_RAD=1;
    var path = new Shape3();
    path.moveTo(2,Height);
    path.lineTo(2,Height+LANGAN_HEIGHT-2);
    path.absarc (2+LANGAN_RAD,Height+LANGAN_HEIGHT-LANGAN_RAD,LANGAN_RAD,Math.PI,Math.PI/2,true);
    path.lineTo(RIVER_WIDTH-2-LANGAN_RAD,Height+LANGAN_HEIGHT);
    path.absarc (RIVER_WIDTH-2-LANGAN_RAD,Height+LANGAN_HEIGHT-LANGAN_RAD,LANGAN_RAD,Math.PI/2,0,true);
    path.lineTo(RIVER_WIDTH-2,Height);
    
    var geometry = new TubeBufferGeometry(path,32,0.1,20);
    var material = new MeshLambertMaterial({ color: 0xffffff });
    var langan = new Mesh(geometry, material);
    langan.rotation.x = Math.PI / 2;
    langan.position.setY(1);

    let langan2=langan.clone();
    langan2.position.setY(-5);
    group.add(langan,langan2)

    group.add(mesh)
    this.intance = group;

  }
}
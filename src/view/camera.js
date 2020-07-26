import { PerspectiveCamera } from "three/build/three.module";

export class Camera {
  constructor() {
    this.init();
  }
  init() {
    let camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.set(0,0,300);
    this.intance=camera;
  }
}
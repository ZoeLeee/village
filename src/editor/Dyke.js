import { Shape, MeshPhongMaterial, Mesh, ExtrudeBufferGeometry } from "three";
import { textureLoader } from "./loaders";
import { IMG_CDN_HOST } from "../utils/host";

export class Dyke {
  constructor(height) {
    this.length = height;
    this.init();
  }
  static GetDyke(length) {
    return new Dyke(length);
  }
  init() {
    const downWidth = 6;
    const upWidth = 3;
    const height = 14;

    const t = (downWidth - upWidth) / 2;

    let contour = new Shape();
    contour.moveTo(0, 0);
    contour.lineTo(downWidth, 0);
    contour.lineTo(downWidth - t, height);
    contour.lineTo(t, height);
    contour.lineTo(0, 0);


    var extrudeSettings = {
      steps: 1,
      depth: this.length,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0,
    };

    var geometry = new ExtrudeBufferGeometry(contour, extrudeSettings);
    const texture = textureLoader.load(IMG_CDN_HOST + "caodi.jpg");

    var material = new MeshPhongMaterial({ map: texture });
    let mesh = this.intance = new Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
  }
}
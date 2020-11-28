import { Dyke } from "./Dyke";
import { PLANE_HEIGHT, PLANE_WIDTH, RIVER_WIDTH, StairwayHeight as StairwayHeight } from './enums';
import { WaterObject } from './water';
import { Vector3 } from "three";
import { objLoader, textureLoader } from './loaders';
import { Roadster } from './../objects/car';
import { IMG_CDN_HOST, D3_CDN_HOST } from "../utils/host";

export class BuildVillage {
  constructor(view) {
    this.viewer = view;
  }
  init() {
    this._initGround();
    this._initRoad();
    this._initHouse();
    this._initBridge();
    this._initRiver();
    this._initDyke();
    this._initObjcts();
    this._initCars();
  }
  _initGround() {

  }
  _initRoad() {

  }
  _initHouse() {

  }
  _initBridge() {

  }
  _initRiver() {
    let water = WaterObject.GetWater(RIVER_WIDTH - 8, PLANE_HEIGHT, new Vector3(PLANE_WIDTH / 2 + 16, 0, -StairwayHeight));
    this.viewer.scene.add(water);

    let water2 = WaterObject.GetWater(50, PLANE_HEIGHT, new Vector3(-PLANE_WIDTH / 2 - 25, 0, -2));
    this.viewer.scene.add(water2);

  }
  _initDyke() {
    let dyke1 = Dyke.GetDyke(PLANE_HEIGHT / 2 - 6);
    dyke1.intance.position.set(PLANE_WIDTH / 2 + RIVER_WIDTH - 6, -5, -StairwayHeight);
    this.viewer.scene.add(dyke1.intance);

    let dyke2 = Dyke.GetDyke(PLANE_HEIGHT / 2 - 10);
    dyke2.intance.position.set(PLANE_WIDTH / 2 + RIVER_WIDTH - 6, PLANE_HEIGHT / 2 - 5, -StairwayHeight);
    this.viewer.scene.add(dyke2.intance);
  }
  _initCars() {
    let pts = [
      new Vector3(PLANE_WIDTH / 2 + RIVER_WIDTH + 4 + 1, -PLANE_HEIGHT / 2 + 1, 0.1),
      new Vector3(PLANE_WIDTH / 2 + RIVER_WIDTH + 4 + 1, 1, 0.1),
      new Vector3(-1, 1, 0.1),
      new Vector3(-1, -PLANE_HEIGHT / 2 + 10 + 1, 0.1),
      new Vector3(-PLANE_WIDTH / 2 + 5 + 1, -PLANE_HEIGHT / 2 + 10 + 1, 0.1),
      new Vector3(-PLANE_WIDTH / 2 + 5 + 1, -PLANE_HEIGHT / 2 + 25, 0.1),
    ];
    const car = new Roadster();
    car.init(pts).then(object => {
      this.viewer.scene.add(object);
      this.car = car;
    });
  }
  _initObjcts() {

    let texture = textureLoader.load(IMG_CDN_HOST + "20111208032646806585.jpg");

    objLoader
      .setPath(D3_CDN_HOST)
      .load('zhuzi.obj', (object) => {
        object.scale.set(0.01, 0.01, 0.01);
        object.rotation.x = Math.PI / 2;
        for (let i = 3; i < object.children.length; i++) {
          object.children[i].material.map = texture;
        }
        object.position.set(-PLANE_WIDTH / 2 + 2, -PLANE_HEIGHT / 2, 0);
        this.viewer.scene.add(object);

        const count = 20;
        let dist = (PLANE_HEIGHT - 5) / (count - 1);

        for (let i = 1; i <= (count - 1); i++) {
          let o = object.clone();
          o.position.setY(object.position.y + (i * dist));
          this.viewer.scene.add(o);
        }
      });
  }
  update() {
    if (this.car)
      this.car.update();
  }
}
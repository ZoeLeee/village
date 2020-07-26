import { AnimationMixer, AxesHelper, Clock, Color, DirectionalLight, Fog, Group, HemisphereLight, Mesh, MeshLambertMaterial, PlaneBufferGeometry, RepeatWrapping, Scene, sRGBEncoding, TextureLoader, Vector2, WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import { House } from "../editor/House.js";
import { RoadFactroy } from "../editor/road.js";
import { Car } from './../objects/car';
import { Camera } from "./camera.js";

export const PLANE_HEIGHT = 200;
export const PLANE_WIDTH = 100;
export const ROAD_WIDTH = 8;
export const RIVER_WIDTH=20;

var clock = new Clock();

export class Viewer {
  constructor(container) {
    this.container = container;
    this.init();
  }
  init() {
    this.roadGroup = new Group();
    this.camera = new Camera();
    this.initScene();
    this.initRender();
    this.initControl();
    this.initHelper();
    this.initPlane();
    this.initLight();
    // this.initObjects();
    this.initRoad();
    this.stats = new Stats();
    this.container.appendChild(this.stats.dom);

    this.scene.add(this.roadGroup);

    this.render();
  }
  initHelper() {
    var axesHelper = new AxesHelper(5);
    this.scene.add(axesHelper);
  }
  initScene() {
    this.scene = new Scene();
    this.scene.background = new Color(0xeeeeee);
    this.scene.add(new HemisphereLight(0xffffff, 0x000000, 0.4));
    this.scene.fog = new Fog(0xeeeeee, 100, 1000);
  }
  initLight() {
    var light = new DirectionalLight(0xdfebff, 1);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    var d = 300;

    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.shadow.camera.far = 1000;

    this.scene.add(light);
  }
  initRender() {
    let renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = sRGBEncoding;
    this.renderer = renderer;
    this.container.appendChild(renderer.domElement);
  }
  initControl() {
    let controls = new OrbitControls(this.camera.intance, this.renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.enablePan = true;
    controls.enableDamping = true;
    // controls.minDistance = 1000;
    // controls.maxDistance = 1000;
    controls.update();
    this.controls = controls;
  }
  initmixer(model) {
    let mixer = new AnimationMixer(model);
    this.mixer = mixer;
  }
  initPlane() {
    var loader = new TextureLoader();
    let url = require('../assets/grasslight-big.jpg').default;
    var groundTexture = loader.load(url);
    groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = sRGBEncoding;

    var groundMaterial = new MeshLambertMaterial({ map: groundTexture });

    var mesh = new Mesh(new PlaneBufferGeometry(PLANE_WIDTH, PLANE_HEIGHT), groundMaterial);
    mesh.position.y = 0;
    // mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }
  initObjects() {
    const car = new Car();
    car.init(this.scene);
    this.car = car;

    const house = new House(this);
    house.init()

  }
  initRoad() {
    const ptss = [
      [new Vector2(PLANE_WIDTH / 2 + RIVER_WIDTH, -PLANE_HEIGHT / 2), new Vector2(PLANE_WIDTH / 2 + RIVER_WIDTH, PLANE_HEIGHT / 2)],
      [new Vector2(PLANE_WIDTH / 2 + RIVER_WIDTH, 0), new Vector2(0, 0), 2],
      [new Vector2(PLANE_WIDTH / 4, PLANE_HEIGHT / 4), new Vector2(PLANE_WIDTH / 4, -PLANE_HEIGHT / 4), 2],
      [new Vector2(PLANE_WIDTH / 4, -PLANE_HEIGHT / 4+2), new Vector2(-PLANE_WIDTH / 2+5, -PLANE_HEIGHT / 4+2), 2],
      [ new Vector2(0, PLANE_HEIGHT / 2), new Vector2(0, -PLANE_HEIGHT / 2), 2],
      [ new Vector2(-PLANE_WIDTH / 2, PLANE_HEIGHT / 2-2), new Vector2(PLANE_WIDTH / 2+RIVER_WIDTH, PLANE_HEIGHT / 2-2), 2],
      [ new Vector2(0, -PLANE_HEIGHT / 2+10), new Vector2(-PLANE_WIDTH / 2+5,-PLANE_HEIGHT / 2+10), 2],
      [ new Vector2(-PLANE_WIDTH / 2+5, -PLANE_HEIGHT / 2+8), new Vector2(-PLANE_WIDTH / 2+5,PLANE_HEIGHT / 2), 2],
      [ new Vector2(-PLANE_WIDTH / 4, -PLANE_HEIGHT / 2), new Vector2(-PLANE_WIDTH / 4,-PLANE_HEIGHT / 4), 2],
      [ new Vector2(PLANE_WIDTH / 2-2, -PLANE_HEIGHT / 4), new Vector2(PLANE_WIDTH / 2-2,3*PLANE_HEIGHT / 8), 2],
      [ new Vector2(PLANE_WIDTH / 2-2, PLANE_HEIGHT / 4), new Vector2(-PLANE_WIDTH/4,PLANE_HEIGHT / 4), 2],
    ]

    for (let pts of ptss) {
      let road = RoadFactroy.GetRoad(pts[0], pts[1], pts[2]);
      road.intance.position.setZ(0.1)
      this.roadGroup.add(road.intance);
    }
  }
  initHouses(){

  }
  render() {
    requestAnimationFrame(() => this.render());
    if (this.mixer) {
      var delta = clock.getDelta();
      this.mixer.update(delta);
    }
    let time = - performance.now() / 1000;
    if (this.car) {
      this.car.wheels.forEach(w => w.rotation.x = time * Math.PI);
      const carIntance = this.car.intance;
      if (carIntance) {
        let currentZ = carIntance.position.y;
        if (currentZ > -50)
          carIntance.position.setY(currentZ - 0.1);
      }
    }

    this.controls.update();
    this.stats.update();
    this.renderer.render(this.scene, this.camera.intance);
  }
}

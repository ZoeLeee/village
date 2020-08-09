import { AnimationMixer, AxesHelper, Clock, Color, DirectionalLight, Fog, Group, HemisphereLight, Mesh, MeshLambertMaterial, PlaneBufferGeometry, RepeatWrapping, Scene, sRGBEncoding, TextureLoader, Vector2, WebGLRenderer, Vector3, BufferGeometry } from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import { PLANE_HEIGHT, PLANE_WIDTH, RIVER_WIDTH, ROAD_WIDTH, StairwayHeight } from "../editor/enums";
import { RoadFactroy } from "../editor/road.js";
import { Bridge } from './../editor/bridge';
import { WRLHouse, ObjHouse } from './../editor/House';
import { Stairway } from './../editor/stairway';
import { Camera } from "./camera.js";
import { ROAD_MATIAL } from "../editor/materials";
import { BuildVillage } from "../editor/buildVillage";

let clock = new Clock();

export class Viewer {
  constructor(container) {
    this.container = container;
    this.vrmlHouse = new WRLHouse();
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
    this.initObjects();
    this.initRoad();
    this.initBridge();
    this.initHouses()
    this.tool=new BuildVillage(this);
    this.tool.init();

    this.stats = new Stats();
    this.container.appendChild(this.stats.dom);

    this.scene.add(this.roadGroup);

    this.render();
  }
  initHelper() {
    let axesHelper = new AxesHelper(5);
    this.scene.add(axesHelper);
  }
  initScene() {
    this.scene = new Scene();
    this.scene.background = new Color(0xeeeeee);
    this.scene.add(new HemisphereLight(0xffffff, 0x000000, 0.4));
    this.scene.fog = new Fog(0xeeeeee, 100, 1000);
  }
  initLight() {
    let light = new DirectionalLight(0xdfebff, 1);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    let d = 300;

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
    let loader = new TextureLoader();
    let url = require('../assets/grasslight-big.jpg').default;
    let groundTexture = loader.load(url);
    groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = sRGBEncoding;

    //主地板
    let groundMaterial = new MeshLambertMaterial({ map: groundTexture });

    let mesh = new Mesh(new PlaneBufferGeometry(PLANE_WIDTH, PLANE_HEIGHT), groundMaterial);
    mesh.position.y = 0;
    // mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    //主地板樯
    let wallGeo = new BufferGeometry().setFromPoints([
      new Vector3(PLANE_WIDTH / 2, -PLANE_HEIGHT / 2, 0),
      new Vector3(PLANE_WIDTH / 2, -PLANE_HEIGHT / 2, -StairwayHeight),
      new Vector3(PLANE_WIDTH / 2, PLANE_HEIGHT / 2, -StairwayHeight),
      new Vector3(PLANE_WIDTH / 2, PLANE_HEIGHT / 2, -StairwayHeight),
      new Vector3(PLANE_WIDTH / 2, PLANE_HEIGHT / 2, 0),
      new Vector3(PLANE_WIDTH / 2, -PLANE_HEIGHT / 2, 0),
    ]);
    let m = new Mesh(wallGeo, ROAD_MATIAL)
    this.scene.add(m);
    //河边地板
    let ground2 = new Mesh(new PlaneBufferGeometry(10, PLANE_HEIGHT), groundMaterial);
    ground2.position.set(PLANE_WIDTH / 2 +5, 0, -StairwayHeight);
    this.scene.add(ground2);
  }
  initObjects() {
    // const car = new Car();
    // car.init(this.scene);
    // this.car = car;

    // const house = new HouseModel(this);
    // house.init()
    let stairway = new Stairway();
    stairway.intance.position.set(PLANE_WIDTH / 2, RIVER_WIDTH / 2 + 1, -StairwayHeight)
    this.scene.add(stairway.intance);

  }
  initRoad() {
    const ptss = [
      [new Vector2(PLANE_WIDTH / 2 + RIVER_WIDTH + 4, -PLANE_HEIGHT / 2), new Vector2(PLANE_WIDTH / 2 + RIVER_WIDTH + 4, PLANE_HEIGHT / 2)],
      [new Vector2(PLANE_WIDTH / 2, 0), new Vector2(0, 0), 2],
      [new Vector2(PLANE_WIDTH / 4, PLANE_HEIGHT / 4 + 5), new Vector2(PLANE_WIDTH / 4, -PLANE_HEIGHT / 4), ROAD_WIDTH / 2], //终点学校
      [new Vector2(PLANE_WIDTH / 4, -PLANE_HEIGHT / 4 + 2), new Vector2(-PLANE_WIDTH / 2 + 5, -PLANE_HEIGHT / 4 + 2), ROAD_WIDTH / 2],
      [new Vector2(0, PLANE_HEIGHT / 2), new Vector2(0, -PLANE_HEIGHT / 2), 2],
      [new Vector2(-PLANE_WIDTH / 2, PLANE_HEIGHT / 2 - 2), new Vector2(PLANE_WIDTH / 2 + RIVER_WIDTH, PLANE_HEIGHT / 2 - 2), ROAD_WIDTH / 2],
      [new Vector2(0, -PLANE_HEIGHT / 2 + 10), new Vector2(-PLANE_WIDTH / 2 + 5, -PLANE_HEIGHT / 2 + 10), ROAD_WIDTH / 2],
      [new Vector2(-PLANE_WIDTH / 2 + 5, -PLANE_HEIGHT / 2 + 8), new Vector2(-PLANE_WIDTH / 2 + 5, PLANE_HEIGHT / 2), ROAD_WIDTH / 2],
      [new Vector2(-PLANE_WIDTH / 4, -PLANE_HEIGHT / 2), new Vector2(-PLANE_WIDTH / 4, -PLANE_HEIGHT / 4), ROAD_WIDTH / 2],
      [new Vector2(PLANE_WIDTH / 2 - 2, -PLANE_HEIGHT / 4), new Vector2(PLANE_WIDTH / 2 - 2, 3 * PLANE_HEIGHT / 8), ROAD_WIDTH / 2],
      [new Vector2(PLANE_WIDTH / 2 - 2, PLANE_HEIGHT / 4), new Vector2(-PLANE_WIDTH / 4, PLANE_HEIGHT / 4), ROAD_WIDTH / 2],
    ]

    for (let pts of ptss) {
      let road = RoadFactroy.GetRoad(pts[0], pts[1], pts[2]);
      road.intance.position.setZ(0.1)
      this.roadGroup.add(road.intance);
    }
  }
  initHouses() {
    // let myHouse=new House(new Vector3(3,3,6));
    // const intance=myHouse.intance;
    // intance.position.set(-PLANE_WIDTH / 2+9,-PLANE_HEIGHT / 4-20,4/2+0.1)

    // this.scene.add(intance);

    let objHouse = new ObjHouse();
    objHouse.init().then(o => {
      o.position.set(-PLANE_WIDTH / 2 + 10, -PLANE_HEIGHT / 4 - 20, 4 / 2 + 0.1);
      this.scene.add(o);

      let o2 = o.clone();
      o2.position.set(-PLANE_WIDTH / 2 + 10, -PLANE_HEIGHT / 4 - 25, 4 / 2 + 0.1);
      this.scene.add(o2);
    })

    // this.vrmlHouse.init().then(()=>{
    //   this.vrmlHouse.intance.position.set(-PLANE_WIDTH / 2+8,-PLANE_HEIGHT / 4-20,4/2+0.1);
    //   this.scene.add(this.vrmlHouse.intance);
    //   this.scene.background = new Color(0xeeeeee);
    // })



  }
  initBridge() {
    let bridge = new Bridge();
    bridge.intance.position.set(PLANE_WIDTH / 2, 2, 0.1)
    this.scene.add(bridge.intance);
  }
  render() {
    requestAnimationFrame(() => this.render());
    if (this.mixer) {
      let delta = clock.getDelta();
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

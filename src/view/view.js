import { Scene, HemisphereLight, WebGLRenderer, Color, sRGBEncoding, Fog, Clock, AnimationMixer, AxesHelper, TextureLoader, RepeatWrapping, MeshLambertMaterial, PlaneBufferGeometry, Mesh, DirectionalLight } from "three";
import { Camera } from "./camera.js";
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import Stats from "three/examples/jsm/libs/stats.module";


var clock = new Clock();

export class Viewer {
  constructor(container) {
    this.container = container;
    this.init();
  }
  init() {
    this.camera = new Camera();
    this.initScene();
    this.initRender();
    this.initControl();
    this.initHelper();
    this.initPlane();
    this.initLight();
    this.stats = new Stats();
    this.container.appendChild(this.stats.dom);

    this.render();
  }
  initHelper() {
    var axesHelper = new AxesHelper(5);
    this.scene.add(axesHelper);
  }
  initScene() {
    this.scene = new Scene();
    this.scene.background = new Color(0xbfe3dd);
    this.scene.add(new HemisphereLight(0xffffff, 0x000000, 0.4));
    this.scene.fog = new Fog(0xcce0ff, 500, 10000);
  }
  initLight(){
    var light = new DirectionalLight( 0xdfebff, 1 );
    light.position.set( 50, 200, 100 );
    light.position.multiplyScalar( 1.3 );

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    var d = 300;

    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.shadow.camera.far = 1000;

    this.scene.add( light );
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
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.enablePan = false;
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
    let url=require('../assets/grasslight-big.jpg').default;
    var groundTexture = loader.load(url);
    groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = sRGBEncoding;

    var groundMaterial = new MeshLambertMaterial({ map: groundTexture });

    var mesh = new Mesh(new PlaneBufferGeometry(500,500), groundMaterial);
    mesh.position.y = 0;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }
  render() {
    requestAnimationFrame(() => this.render());
    if (this.mixer) {
      var delta = clock.getDelta();
      this.mixer.update(delta);
    }

    this.controls.update();
    this.stats.update();
    this.renderer.render(this.scene, this.camera.intance);
  }
}

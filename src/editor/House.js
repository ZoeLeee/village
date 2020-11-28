import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { CubeTextureLoader, BoxGeometry, Mesh, TextureLoader } from 'three';
import { DRACOLoader } from '../../node_modules/three/examples/jsm/loaders/DRACOLoader.js';
import { MeshBasicMaterial } from 'three';
import { vrmlloader, objLoader } from './loaders';
import { D3_CDN_HOST, IMG_CDN_HOST, CDNHOST } from '../utils/host.js';

export class HouseModel {
  constructor(viewer) {
    this.viewer = viewer;
  }
  init() {
    const view = this.viewer;
    var loader = new GLTFLoader();
    var path = IMG_CDN_HOST;

    var envMap = new CubeTextureLoader().load([
      path + 'posx', path + 'negx',
      path + 'posy', path + 'negy',
      path + 'posz', path + 'negz'
    ]);

    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(CDNHOST + "script/");
    loader.setDRACOLoader(dracoLoader);
    loader.load(D3_CDN_HOST + 'LittlestTokyo.glb', (gltf) => {
      var model = gltf.scene;
      model.castShadow = true;
      model.position.set(1, 0, 2);
      model.rotation.x = Math.PI / 2;
      model.scale.set(0.01, 0.01, 0.01);
      model.traverse(function (child) {

        if (child.isMesh) child.material.envMap = envMap;

      });

      view.scene.add(model);
      let m2 = model.clone();
      m2.position.set(1, 8, 2);
      view.scene.add(m2);

      view.initmixer(model);

      let mixer = view.mixer;
      mixer.clipAction(gltf.animations[0]).play();

      view.render();

      this.model = model;

    }, undefined, function (e) {

      console.error(e);

    });

  }
  get Model() {
    return this.model.clone();
  }
}


export class House {
  constructor(size) {
    this.size = size;
    this.init();
  }
  init() {
    let boxGeo = new BoxGeometry(this.size.x, this.size.y, this.size.z);
    var texture = new TextureLoader().load(IMG_CDN_HOST + 'outwall.jpg');
    var material = new MeshBasicMaterial({ map: texture });
    let mesh = new Mesh(boxGeo, material);

    this.intance = mesh;
  }
}

export class WRLHouse {
  constructor() {
  }
  init() {
    return new Promise(res => {
      vrmlloader.load(CDNHOST + "script/" + 'house.wrl', (object) => {
        this.intance = object.children[0];
        this.intance.scale.set(0.5, 0.5, 0.5);
        this.intance.rotation.x = Math.PI / 2;
        this.intance.children = this.intance.children.slice(1);
        res(true);
      });
    });
  }
}

export class ObjHouse {
  constructor() {

  }
  init() {
    return new Promise(res => {
      objLoader.load(D3_CDN_HOST + "247_House%2015_obj.obj", (o) => {
        this.intance = o;
        o.scale.set(0.01, 0.01, 0.01);
        o.rotation.x = Math.PI / 2;
        res(o);
      });
    });
  }
}
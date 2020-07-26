import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { CubeTextureLoader } from 'three';
import { DRACOLoader } from '../../node_modules/three/examples/jsm/loaders/DRACOLoader.js';

export class House{
  constructor(viewer){
    this.viewer=viewer
  }
  init(){
    const view = this.viewer;
    var loader = new GLTFLoader();
    var path = 'http://cdn.dodream.top/';
    var format = '.jpg?key=joelee';

    var envMap = new CubeTextureLoader().load([
      path + 'posx' + format, path + 'negx' + format,
      path + 'posy' + format, path + 'negy' + format,
      path + 'posz' + format, path + 'negz' + format
    ]);
  
    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://threejs.org/examples/js/libs/draco/gltf/");
    loader.setDRACOLoader(dracoLoader);
    loader.load('http://cdn.dodream.top/LittlestTokyo.glb?key=joelee',  (gltf)=> {
      var model = gltf.scene;
      model.castShadow=true;
      model.position.set(1,0, 2);
      model.rotation.x=Math.PI/2;
      model.scale.set(0.01, 0.01, 0.01);
      model.traverse(function (child) {
  
        if (child.isMesh) child.material.envMap = envMap;
  
      });
  
      view.scene.add(model);
      let m2=model.clone()
      m2.position.set(1, 8, 2);
      view.scene.add(m2);
      
      view.initmixer(model);

      let mixer = view.mixer;
      mixer.clipAction( gltf.animations[ 0 ] ).play();
  
      view.render();

      this.model=model;
      
    }, undefined, function (e) {
  
      console.error(e);
  
    });

  }
  get Model(){
    return this.model.clone();
  }
}

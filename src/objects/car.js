import * as THREE from 'three';
import { dracoLoader, gtlfLoader } from "../editor/loaders";

export class Car {
  constructor() {

  }
  init(scene) {
    let wheels = [];
    this.wheels = wheels;

    dracoLoader.setDecoderPath('https://threejs.org/examples/js/libs/draco/gltf/');

    gtlfLoader.setDRACOLoader(dracoLoader);
    var bodyMaterial = new THREE.MeshPhysicalMaterial({
       metalness: 0.6, roughness: 0.4, clearcoat: 0.05, clearcoatRoughness: 0.05
    });

    var detailsMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff, metalness: 1.0, roughness: 0.5
    });

    var glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, metalness: 0, roughness: 0.1, transparency: 0.9, transparent: true
    });

    gtlfLoader.load(' http://cdn2.dodream.top/ferrari.glb?key=joelee',  (gltf) =>{

      var carModel = gltf.scene.children[0];

      this.intance=carModel;

      carModel.position.set(100/2+10+5, 0, 0);
      carModel.rotation.x=Math.PI/2;
      carModel.getObjectByName('body').material = bodyMaterial;

      carModel.getObjectByName('rim_fl').material = detailsMaterial;
      carModel.getObjectByName('rim_fr').material = detailsMaterial;
      carModel.getObjectByName('rim_rr').material = detailsMaterial;
      carModel.getObjectByName('rim_rl').material = detailsMaterial;
      carModel.getObjectByName('trim').material = detailsMaterial;

      carModel.getObjectByName('glass').material = glassMaterial;

      wheels.push(
        carModel.getObjectByName('wheel_fl'),
        carModel.getObjectByName('wheel_fr'),
        carModel.getObjectByName('wheel_rl'),
        carModel.getObjectByName('wheel_rr')
      );

      // shadow
      // var mesh = new THREE.Mesh(
      //   new THREE.PlaneBufferGeometry( 0.655 * 4, 1.3 * 4 ),
      //   new THREE.MeshBasicMaterial( {
      //     blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
      //   } )
      // );
      // mesh.rotation.x = - Math.PI / 2;
      // mesh.renderOrder = 2;
      // carModel.add( mesh );

      scene.add(carModel);

    });

  }
}
import * as THREE from 'three';
import { dracoLoader, gtlfLoader } from "../editor/loaders";
import { AbtractCar } from './../editor/cars/abstractCar';
import { D3_CDN_HOST, CDNHOST } from '../utils/host';

export class Roadster extends AbtractCar {
  init(path) {
    super.init(path);
    let wheels = [];
    this.wheels = wheels;

    dracoLoader.setDecoderPath(CDNHOST + "script/");

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

    return new Promise(res => {
      gtlfLoader.load(D3_CDN_HOST + 'ferrari.glb', (gltf) => {

        var carModel = gltf.scene.children[0];

        this.intance = carModel;

        if (path.length > 1) {
          carModel.position.copy(path[0]);
          this.dir = path[1].clone().sub(path[0]).normalize();
        }

        carModel.rotation.x = Math.PI / 2;

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

        this.intance = carModel;
        carModel.updateMatrix();
        res(carModel);
      });
    });
  }
}
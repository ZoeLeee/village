import { Vector3 } from "three";
import { equlnPt,  } from "../../utils/utils";

export class AbtractCar {
  constructor() {
    this.wheels = [];
    this.intance = null;
    this.dir = new Vector3(0, 1);
    this.index = 1;
    this.speed=0.5;
  }
  init(path) {
    this.path = path;
  }
  get Normal() {
    if (this.intance) {
      return new Vector3().setFromMatrixColumn(this.intance.matrix, 2).negate();
    }
    return new Vector3(0, 1, 0);
  }
  go() {
    if (this.intance) {
      let time = - performance.now() / 1000;
      this.wheels.forEach(w => w.rotation.x = time * Math.PI);
      this.intance.position.add(this.Normal.multiplyScalar(this.speed));
    }
  }
  turnLeft() {
    if (this.intance) {
      this.intance.position.add(this.Normal.multiplyScalar(-this.speed))
      this.intance.rotation.y += Math.PI / 2;
    }
  }
  turnRight() {
    if (this.intance) {
      this.intance.position.add(this.Normal.multiplyScalar(-this.speed))
      this.intance.rotation.y -= Math.PI / 2;
    }
  }
  update() {
    if (equlnPt(this.Normal, this.dir) && this.index < this.path.length) {
      for (let i = this.index; i < this.path.length; i++) {
        if (equlnPt(this.path[i], this.intance.position)) {
          this.index = i + 1;
          if (i === this.path.length - 1)
            return;
          let dir = this.path[i + 1].clone().sub(this.path[i]).normalize();
          let sign = this.dir.clone().cross(dir);
          if (sign.z > 0)
            this.turnLeft();
          else if (sign.z < 0)
            this.turnRight();
          this.dir = dir;
          break;
        }
      }
      this.go();
    }
  }
}
import { Path, Vector3 } from "three";

export class Shape3 extends Path{
  getPoint(u){
    let p=super.getPoint(u);
    if(p){
      return new Vector3(p.x,p.y);
    }
    return null
  }
}
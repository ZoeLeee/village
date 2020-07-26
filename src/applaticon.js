import { Viewer } from "./view/view";

export  let app;

export class Application {
  constructor() {
    this.init();
    app=this;
    window.onresize = function () {
      let viewer = app.viewer;
      if(!viewer) return;
      let camera = viewer.camera.intance;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      viewer.renderer.setSize(window.innerWidth, window.innerHeight);
    };
  }
  init() {
    const container=document.getElementById('canvas');
    this.viewer = new Viewer(container);
  }
}


import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './applaticon';
import './style.less'


const App = () => {
  return <div id="canvas"></div>;
};
window.viewer = null;
window.onresize = function () {
  let viewer = window.viewer;
  let camera = viewer.camera.intance;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  viewer.renderer.setSize(window.innerWidth, window.innerHeight);
};

ReactDOM.render(<App />, document.getElementById('app'), () => {
  const app=new Application();


});
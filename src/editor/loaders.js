import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CubeTextureLoader, FileLoader } from 'three';

export const  gtlfLoader = new GLTFLoader();

export const dracoLoader = new DRACOLoader();

export const cubeTextureLoader=new CubeTextureLoader();


export const fileLoader = new FileLoader();

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CubeTextureLoader, FileLoader } from 'three';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader.js';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export const gtlfLoader = new GLTFLoader();

export const dracoLoader = new DRACOLoader();

export const cubeTextureLoader = new CubeTextureLoader();


export const fileLoader = new FileLoader();

export const vrmlloader = new VRMLLoader();
export const mmdLoader = new MMDLoader();

export const objLoader = new OBJLoader();
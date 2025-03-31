import { PerspectiveCamera } from 'three';
import * as THREE from 'three'

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5
 camera.tick = (delta) => {
  
 };
 
 return camera;
}
 
export { createCamera };
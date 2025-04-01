import { PerspectiveCamera } from 'three';
import * as THREE from 'three'

function createCamera(renderer, scene) {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5

 onWindowResize(camera, renderer, scene);
 window.addEventListener('resize', onWindowResize, false)
 return camera;
}

function onWindowResize(camera, renderer, scene) {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}
 
export { createCamera };
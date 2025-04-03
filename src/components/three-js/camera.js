import { PerspectiveCamera } from 'three';
import * as THREE from 'three'

function createCamera(renderer, scene, canvas) {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3
  onWindowResize(camera, renderer, scene, canvas);
  window.addEventListener('resize', onWindowResize, false)
  return camera;
}

function onWindowResize(camera, renderer, scene, canvas) {
  console.log(canvas.clientWidth);
  camera.aspect = canvas.clientWidth / canvas.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.render(scene, camera)
}
 
export { createCamera };
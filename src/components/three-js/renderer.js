import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import * as THREE from 'three'

function createRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    return renderer;
}
 
export { createRenderer };
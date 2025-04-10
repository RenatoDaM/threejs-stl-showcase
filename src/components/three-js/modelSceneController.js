import * as THREE from 'three'
import { createDefaultLights } from './lights'
import { createCamera } from './camera'
import { createRenderer } from './renderer'
import { loadModel } from './loader'
import { fitCameraToObject } from './utils/cameraUtils'
import Stats from 'three/examples/jsm/libs/stats.module'
import { createControls } from './control'

export default class ModelSceneController {
  constructor(canvas) {
    this.canvas = canvas
  }

  init(modelUrl, onLoadedCallback) {
    this.scene = new THREE.Scene()
    this.scene.add(createDefaultLights());
    this.renderer = createRenderer(this.canvas)
    this.camera = createCamera(this.renderer, this.scene, this.canvas)
    this.controls = createControls(this.camera, this.renderer.domElement)
  
    loadModel(modelUrl, this.scene, (mesh) => {
      fitCameraToObject(this.camera, mesh, this.controls)
      if (onLoadedCallback) onLoadedCallback()
    })
  
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
    this.animateScene()
  }
  

  animateScene() {
    requestAnimationFrame(() => this.animateScene())
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.stats.update()
  }
}

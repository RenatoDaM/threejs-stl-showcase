<template>
  <div id="app">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { createLights } from './components/three-js/lights'
import { createCamera } from './components/three-js/camera'
import { createRenderer } from './components/three-js/renderer'
import { createMesh } from './components/three-js/mesh'
import { createLoader } from './components/three-js/loader'
export default {
  name: 'App',
  mounted() {
    this.initThreeJS()
  },
  methods: {
    initThreeJS() {
      const scene = new THREE.Scene()
      scene.add(new THREE.AxesHelper(5))

      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      scene.add(createLights(1, 1, 1, 0xffffff, 3.5, scene))

      const camera = createCamera()
      const renderer = createRenderer(this.$refs.canvas)

      const loader = createLoader('models/capybara.stl', scene);
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      
      window.addEventListener('resize', this.onWindowResize, false)

      const stats = new Stats()
      document.body.appendChild(stats.dom)

      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        this.render(renderer, scene, camera)
        stats.update()
      }

      animate()
    },

    onWindowResize() {
      const camera = this.camera
      const renderer = this.renderer
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.render(renderer, this.scene, camera)
    },

    render(renderer, scene, camera) {
      renderer.render(scene, camera)
    },
  }
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

canvas {
  display: block;
}
</style>

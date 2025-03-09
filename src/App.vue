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

export default {
  name: 'App',
  mounted() {
    this.initThreeJS()
  },
  methods: {
    initThreeJS() {
      // Criar cena
      const scene = new THREE.Scene()
      scene.add(new THREE.AxesHelper(5))

      // Luz ambiente para iluminar a cena de forma suave
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)  // Cor e intensidade
      scene.add(ambientLight)

      // Luz direcionada (SpotLight) com intensidade maior
      const light = new THREE.SpotLight(0xffffff, 1.5)  // Aumentei a intensidade de 1 para 1.5
      light.position.set(20, 20, 20)
      light.castShadow = true  // Se quiser sombras
      scene.add(light)

      // Câmera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 3

      // Renderizador
      const renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true  // Ativar sombras se necessário

      // Controles Orbit
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true

      // Material simples sem textura (pode aumentar o brilho se necessário)
      const material = new THREE.MeshStandardMaterial({
        color: 0xb2ffc8,  // Cor do material
        roughness: 0.4,   // Menos rugosidade para uma superfície mais brilhante
        metalness: 0.3,   // Um pouco de metalicidade para reflexos
      })

      // Carregar modelo STL
      const loader = new STLLoader()
      loader.load(
        'models/capybara.stl',
        (geometry) => {
          const mesh = new THREE.Mesh(geometry, material)
          scene.add(mesh)
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.log(error)
        }
      )

      // Redimensionar janela
      window.addEventListener('resize', this.onWindowResize, false)

      // Estatísticas
      const stats = new Stats()
      document.body.appendChild(stats.dom)

      // Função de animação
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
    }
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

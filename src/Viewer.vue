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

      // Adicionar mais luzes sombreadas
      this.addShadowedLight( 1, 1, 1, 0xffffff, 3.5, scene );
      this.addShadowedLight( 0.5, 1, -1, 0xffd500, 3, scene );

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
      const material = new THREE.MeshPhongMaterial( { color: 0xd5d5d5, specular: 0x494949, shininess: 200 } )

      // Carregar modelo STL
      const loader = new STLLoader()
      loader.load(
        'models/capybara.stl',
        (geometry) => {
          let meshMaterial = material;

          if (geometry.hasColors) {
            meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: true });
          }

          const mesh = new THREE.Mesh(geometry, meshMaterial);
          mesh.position.set(0, -0.37, -0.6);
          mesh.rotation.set(-Math.PI / 2, 0, 0);
          mesh.scale.set(2, 2, 2);

          mesh.castShadow = true;
          mesh.receiveShadow = true;
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

    // Função de redimensionamento da tela
    onWindowResize() {
      const camera = this.camera
      const renderer = this.renderer
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.render(renderer, this.scene, camera)
    },

    // Função de renderização
    render(renderer, scene, camera) {
      renderer.render(scene, camera)
    },

    // Função para adicionar luz sombreadas
    addShadowedLight(x, y, z, color, intensity, scene) {
      const directionalLight = new THREE.DirectionalLight(color, intensity);
      directionalLight.position.set(x, y, z);

      directionalLight.castShadow = true;

      const d = 1;
      directionalLight.shadow.camera.left = -d;
      directionalLight.shadow.camera.right = d;
      directionalLight.shadow.camera.top = d;
      directionalLight.shadow.camera.bottom = -d;

      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 4;

      directionalLight.shadow.bias = -0.002;
      scene.add(directionalLight);
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

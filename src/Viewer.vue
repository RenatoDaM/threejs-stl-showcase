<template>
    <div ref="threeContainer" class="three-container"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
  
  export default {
    name: 'StlModelViewer',
    data() {
      return {
        scene: null,
        camera: null,
        renderer: null,
        model: null,
      };
    },
    mounted() {
      this.initThreeJS();
      this.loadStlModel();
    },
    methods: {
      initThreeJS() {
        // Configuração da cena
        this.scene = new THREE.Scene();
  
        // Câmera
        const width = this.$refs.threeContainer.clientWidth;
        const height = this.$refs.threeContainer.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 5;
  
        // Renderizador
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.$refs.threeContainer.appendChild(this.renderer.domElement);
  
        // Luz
        const light = new THREE.AmbientLight(0x404040, 1); // luz suave
        this.scene.add(light);
  
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        this.scene.add(directionalLight);
      },
      loadStlModel() {
        const loader = new STLLoader();
        loader.load(
          '/models/capybara.stl', // Coloque o caminho para o seu modelo STL aqui
          (geometry) => {
            // Criando o material e o mesh para o modelo
            const material = new THREE.MeshPhongMaterial({ color: 0x0077ff });
            this.model = new THREE.Mesh(geometry, material);
            this.scene.add(this.model);
          },
          // Função de progresso
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% carregado');
          },
          // Função de erro
          (error) => {
            console.log('Erro ao carregar o modelo STL:', error);
          }
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .three-container {
    width: 100%;
    height: 400px; /* ou qualquer tamanho desejado */
  }
  </style>
  
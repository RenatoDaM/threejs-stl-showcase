import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createLights } from '../../components/three-js/lights';
import { createCamera } from '../../components/three-js/camera';
import { createRenderer } from '../../components/three-js/renderer';
import { createLoader } from '../../components/three-js/loader';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class ThreeScene {
  constructor(canvas) {
    this.canvas = canvas;
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AxesHelper(5));
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    this.scene.add(createLights(1, 1, 1, 0xffffff, 3.5, this.scene));

    this.renderer = createRenderer(this.canvas);
    this.camera = createCamera(this.renderer, this.scene);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    createLoader('models/capybara.stl', this.scene);

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.render();
    this.stats.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
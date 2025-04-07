<template>
  <div class="model-viewer">
    <canvas id="canvas-item" ref="canvas"></canvas>
  </div>
</template>

<script>
import ThreeScene from '../components/three-js/threeScene';

export default {
  name: 'ModelViewer',
  props: {
    modelPath: { type: String, required: true }
  },
  mounted() {
    this.threeScene = new ThreeScene(this.$refs.canvas);
    console.log(this.modelPath);
    this.threeScene.init(this.modelPath);
  }
};
</script>

<style scoped>
  canvas {
    width: 50vw;
    height: 50vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>

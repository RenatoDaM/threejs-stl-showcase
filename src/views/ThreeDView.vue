<template>
  <div id="three-container">
    <canvas id="canvas-item" ref="canvas"></canvas>
  </div>
</template>
  
<script>

import ThreeScene from '../components/three-js/threeScene';
  
export default {
  name: 'ThreeDView',
  mounted() {
    this.threeScene = new ThreeScene(this.$refs.canvas);
    this.threeScene.init('models/skull.stl');
  }
};

</script>

<style scoped>
  canvas {
    width: 50vw;
    height: 75vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
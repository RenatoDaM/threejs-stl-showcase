<template>
    <div id="three-container">
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import ThreeScene from '../components/three-js/ThreeScene';
  
  export default {
    name: 'ThreeDView',
    mounted() {
      this.threeScene = new ThreeScene(this.$refs.canvas);
      this.threeScene.init();
    }
  };
  </script>
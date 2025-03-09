<script setup lang="ts">
import { ref } from 'vue'
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/pigeon.gltf')
console.log(scene)
</script>

<template>
  <primitive :object="scene" />
</template>
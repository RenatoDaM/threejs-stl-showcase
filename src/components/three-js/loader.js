import { createMesh } from './mesh'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function loadModel(filePath, scene, onLoad) {
  const loader = new STLLoader()

  loader.load(
    filePath,
    (geometry) => {
      geometry.center()
      const mesh = createMesh(geometry)
      scene.add(mesh)
      if (onLoad) onLoad(mesh)
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
      console.error(error)
    }
  )

  return loader
}

export { loadModel }

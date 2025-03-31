import { createMesh } from './mesh'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function createLoader(filePath, scene) {
    const loader = new STLLoader()

    loader.load(
        filePath,
        (geometry) => {
          scene.add(createMesh(geometry));
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
          console.log(error);
        }
    )

    return loader;
}

export { createLoader }
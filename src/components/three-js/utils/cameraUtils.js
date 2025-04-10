import * as THREE from 'three'

function fitCameraToObject(camera, object, controls, offset = 1.5) {
  const boundingBox = new THREE.Box3().setFromObject(object)
  const size = boundingBox.getSize(new THREE.Vector3())
  const center = boundingBox.getCenter(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)

  const fov = camera.fov * (Math.PI / 180)
  const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))

  camera.position.set(center.x, center.y + cameraZ * 0.2, center.z + cameraZ * offset)
  camera.lookAt(center)

  controls.target.copy(center)
}

export { fitCameraToObject }

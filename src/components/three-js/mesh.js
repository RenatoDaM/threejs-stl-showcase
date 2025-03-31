import * as THREE from 'three'

function createMesh(geometry) {
    const material = new THREE.MeshPhongMaterial( { color: 0xd5d5d5, specular: 0x494949, shininess: 200 } )
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

    return mesh;
}

export { createMesh }
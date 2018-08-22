function setUpLights() {
    var spotLight = new THREE.SpotLight('white', 1, 8.75, Math.PI / 4, 0.2, 2);

    var spotLightTarget = new THREE.Object3D();
    spotLightTarget.translateZ(-1);
    spotLightTarget.translateY(0.5);

    spotLight.target = spotLightTarget;

    firstPersonCamera.add(spotLightTarget);
    firstPersonCamera.add(spotLight);
}

// scene.add(new THREE.AmbientLight('white', 0.5));
// var directionalLight = new THREE.DirectionalLight();
// directionalLight.position.set(-1, 1, -1);
// scene.add(directionalLight);
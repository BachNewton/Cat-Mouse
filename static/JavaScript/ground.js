function getGround() {
    var geometry = new THREE.PlaneGeometry(1000, 1000);
    var texture = new THREE.TextureLoader().load('static/Textures/grass.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(500, 500);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var ground = new THREE.Mesh(geometry, material);
    ground.rotateX(-Math.PI / 2);
    scene.add(ground);

    return ground;
}
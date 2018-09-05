function makeGround() {
    var geometry = new THREE.BoxGeometry(1000, 0.1, 1000);
    var texture = new THREE.TextureLoader().load('static/Textures/grass.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(500, 500);
    var material = new THREE.MeshPhongMaterial({ map: texture, shininess: 0 });
    var ground = new THREE.Mesh(geometry, material);

    ground.translateY(-0.05);

    walls.push(ground);

    scene.add(ground);
}
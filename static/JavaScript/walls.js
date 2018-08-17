socket.on('walls', function (serverWalls) {
    var wallHeight = 3;

    var wallTexture = new THREE.TextureLoader().load('static/Textures/wall.jpg');
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(1, 2.5);

    for (var wall of serverWalls) {
        var geometry = new THREE.BoxGeometry(1, wallHeight, 1);
        var material = new THREE.MeshLambertMaterial({ map: wallTexture });
        var wallMesh = new THREE.Mesh(geometry, material);

        wallMesh.translateX(wall.x);
        wallMesh.translateY(wallHeight / 2);
        wallMesh.translateZ(wall.z);

        scene.add(wallMesh);
        walls.push(wallMesh);
    }
});
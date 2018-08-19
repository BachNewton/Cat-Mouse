socket.on('walls', function (serverWalls) {
    var wallTexture = new THREE.TextureLoader().load('static/Textures/wall.jpg');

    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(3, 2.5);

    for (var wall of serverWalls) {
        var geometry = new THREE.BoxGeometry(wall.width, wall.height, wall.depth);
        var material = new THREE.MeshLambertMaterial({ map: wallTexture });
        var wallMesh = new THREE.Mesh(geometry, material);

        wallMesh.translateX(wall.position.x);
        wallMesh.translateY(wall.position.y);
        wallMesh.translateZ(wall.position.z);

        scene.add(wallMesh);
        walls.push(wallMesh);
    }
});
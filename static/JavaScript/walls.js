socket.on('walls', function (serverWalls) {
    var textureLoader = new THREE.TextureLoader();

    for (var wall of serverWalls) {
        var wallTextureWidth = textureLoader.load('static/Textures/wall.jpg');
        var wallTextureDepth = textureLoader.load('static/Textures/wall.jpg');

        const U = 1;
        const V = 1;

        wallTextureWidth.wrapS = THREE.RepeatWrapping;
        wallTextureWidth.wrapT = THREE.RepeatWrapping;
        wallTextureWidth.repeat.set(U * wall.width, V * wall.height);

        wallTextureDepth.wrapS = THREE.RepeatWrapping;
        wallTextureDepth.wrapT = THREE.RepeatWrapping;
        wallTextureDepth.repeat.set(U * wall.depth, V * wall.height);

        var geometry = new THREE.BoxGeometry(wall.width, wall.height, wall.depth);

        var materials = [
            new THREE.MeshLambertMaterial({ map: wallTextureDepth }),
            new THREE.MeshLambertMaterial({ map: wallTextureDepth }),
            new THREE.MeshLambertMaterial({ map: wallTextureWidth }),
            new THREE.MeshLambertMaterial({ map: wallTextureWidth }),
            new THREE.MeshLambertMaterial({ map: wallTextureWidth }),
            new THREE.MeshLambertMaterial({ map: wallTextureWidth })
        ];

        var wallMesh = new THREE.Mesh(geometry, materials);

        wallMesh.translateX(wall.position.x);
        wallMesh.translateY(wall.position.y);
        wallMesh.translateZ(wall.position.z);

        scene.add(wallMesh);
        walls.push(wallMesh);
    }
});
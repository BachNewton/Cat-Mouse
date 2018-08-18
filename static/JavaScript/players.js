socket.on('player', function (data) {
    if (models.cat !== undefined) {
        if (players[data.id] === undefined) {
            newPlayer(data);
        } else {
            movePlayer(data);
        }
    }
});

function movePlayer(data) {
    var player = players[data.id];

    if (data.data.buildMode) {
        player.cameraModel.position.set(data.data.position.x, data.data.position.y, data.data.position.z);
    } else {
        var model = player.playerModel;

        var p = data.data.position;
        var r = data.data.rotation;

        model.position.set(p.x, p.y, p.z);
        model.rotation.set(r.x, r.y, r.z);

        // Adjust the model to the correct orientation and positioning
        model.translateY(-0.5);
        model.rotateY(Math.PI);
        model.translateZ(-0.4);
    }

    if (player.buildMode !== data.data.buildMode) {
        player.buildMode = data.data.buildMode;

        if (player.buildMode) {
            scene.remove(player.playerModel);
            scene.add(player.cameraModel);
        } else {
            scene.remove(player.cameraModel);
            scene.add(player.playerModel);
        }
    }
}

function newPlayer(data) {
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshBasicMaterial();
    var cameraModel = new THREE.Mesh(geometry, material);

    var playerModel = models.cat.clone();

    players[data.id] = {
        cameraModel: cameraModel,
        playerModel: playerModel,
        buildMode: data.data.buildMode
    };

    if (data.data.buildMode) {
        scene.add(cameraModel);
    } else {
        scene.add(playerModel);
    }

    movePlayer(data);
}

socket.on('bye bye player', function (id) {
    var player = players[id];

    if (player != undefined) {
        scene.remove(player.cameraModel);
        scene.remove(player.playerModel);
        delete players[id];
    }
});

function enterCivilianMode() {
    renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock || renderer.domElement.mozRequestPointerLock || renderer.domElement.webkitRequestPointerLock;
    renderer.domElement.requestPointerLock();

    if (buildMode) {
        buildMode = false;
        document.getElementById('title').innerText = 'First Person';
        sendUpdateToServer();
    }
}

function enterBuildMode() {
    document.exitPointerLock();

    if (!buildMode) {
        buildMode = true;
        document.getElementById('title').innerText = 'Third Person';
        sendUpdateToServer();
    }
}

function sendUpdateToServer() {
    if (buildMode) {
        var worldPosition = new THREE.Vector3();
        camera.getWorldPosition(worldPosition);

        var data = {
            position: {
                x: worldPosition.x,
                y: worldPosition.y,
                z: worldPosition.z
            }
        };
    } else {
        var data = {
            position: {
                x: firstPersonCameraMesh.position.x,
                y: firstPersonCameraMesh.position.y,
                z: firstPersonCameraMesh.position.z
            },
            rotation: {
                x: firstPersonCameraMesh.rotation.x,
                y: firstPersonCameraMesh.rotation.y,
                z: firstPersonCameraMesh.rotation.z
            }
        };
    }

    data.buildMode = buildMode;

    socket.emit('player', data);
}
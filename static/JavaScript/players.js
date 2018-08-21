socket.on('player', function (data) {
    if (models.cat !== undefined && models.mouse !== undefined) {
        if (players[data.id] === undefined) {
            newPlayer(data);
        } else {
            movePlayer(data);
        }
    }
});

function movePlayer(data) {
    var player = players[data.id];

    player.position = data.data.position;

    if (data.data.gameplayMode === 'third-person') {
        player.cameraModel.position.set(data.data.position.x, data.data.position.y, data.data.position.z);
    } else {
        var p = data.data.position;
        var r = data.data.rotation;

        if (data.data.gameplayMode === 'cat') {
            player.catModel.position.set(p.x, p.y, p.z);
            player.catModel.rotation.set(r.x, r.y, r.z);
            adjustCat(player.catModel);
        } else if (data.data.gameplayMode === 'mouse') {
            player.mouseModel.position.set(p.x, p.y, p.z);
            player.mouseModel.rotation.set(r.x, r.y, r.z);
            adjustMouse(player.mouseModel);
        }
    }

    if (player.gameplayMode !== data.data.gameplayMode) {
        player.gameplayMode = data.data.gameplayMode;

        removeAllModels(player);

        if (player.gameplayMode === 'third-person') {
            scene.add(player.cameraModel);
        } else if (player.gameplayMode === 'cat') {
            scene.add(player.catModel);
        } else if (player.gameplayMode === 'mouse') {
            scene.add(player.mouseModel);
        }
    }
}

function removeAllModels(player) {
    scene.remove(player.cameraModel);
    scene.remove(player.catModel);
    scene.remove(player.mouseModel);
}

function newPlayer(data) {
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshBasicMaterial();
    var cameraModel = new THREE.Mesh(geometry, material);

    var catModel = models.cat.clone();
    var mouseModel = models.mouse.clone();

    players[data.id] = {
        cameraModel: cameraModel,
        catModel: catModel,
        mouseModel: mouseModel,
        gameplayMode: data.data.gameplayMode
    };

    if (data.data.gameplayMode === 'third-person') {
        scene.add(cameraModel);
    } else if (data.data.gameplayMode === 'cat') {
        scene.add(catModel);
    } else if (data.data.gameplayMode === 'mouse') {
        scene.add(mouseModel);
    }

    movePlayer(data);
}

socket.on('bye bye player', function (id) {
    var player = players[id];

    if (player !== undefined) {
        removeAllModels(player);
        delete players[id];
    }
});

function enterCatMode() {
    lockPointer();

    if (gameplayMode !== 'cat') {
        gameplayMode = 'cat';
        document.getElementById('title').innerText = 'Cat';
        scene.remove(mouseMeshBox);
        mouseMeshBox.remove(firstPersonCamera);
        updateFirstPersonCameraPosition();
        catMeshBox.add(firstPersonCamera);
        scene.add(catMeshBox);
        sendUpdateToServer();
    }
}

function enterMouseMode() {
    lockPointer();

    if (gameplayMode !== 'mouse') {
        gameplayMode = 'mouse';
        document.getElementById('title').innerText = 'Mouse';
        scene.remove(catMeshBox);
        catMeshBox.remove(firstPersonCamera);
        updateFirstPersonCameraPosition();
        mouseMeshBox.add(firstPersonCamera);
        scene.add(mouseMeshBox);
        sendUpdateToServer();
    }
}

function lockPointer() {
    renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock || renderer.domElement.mozRequestPointerLock || renderer.domElement.webkitRequestPointerLock;
    renderer.domElement.requestPointerLock();
}

function enterThirdPersonMode() {
    document.exitPointerLock();

    if (gameplayMode !== 'third-person') {
        gameplayMode = 'third-person';
        document.getElementById('title').innerText = 'Third-Person';
        sendUpdateToServer();
    }
}

function sendUpdateToServer() {
    if (gameplayMode === 'third-person') {
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
        if (gameplayMode === 'cat') {
            var mesh = catMeshBox;
        } else if (gameplayMode === 'mouse') {
            var mesh = mouseMeshBox;
        }

        var data = {
            position: {
                x: mesh.position.x,
                y: mesh.position.y,
                z: mesh.position.z
            },
            rotation: {
                x: mesh.rotation.x,
                y: mesh.rotation.y,
                z: mesh.rotation.z
            }
        };
    }

    data.gameplayMode = gameplayMode;

    socket.emit('player', data);
}

function checkCatInRangeOfMice() {
    var catSphere = new THREE.Sphere(catMeshBox.position, 0.7);

    for (id in players) {
        var otherPlayer = players[id];

        if (otherPlayer.gameplayMode === 'mouse') {
            var otherPlayerPosition = new THREE.Vector3(otherPlayer.position.x, otherPlayer.position.y, otherPlayer.position.z);

            var intersects = catSphere.containsPoint(otherPlayerPosition);

            if (intersects) {
                document.getElementById('prompt').style.display = 'block';
            } else {
                document.getElementById('prompt').style.display = 'none';
            }
        }
    }
}

function catchMouse() {
    if (gameplayMode === 'cat') {
        // can catch
    }
}
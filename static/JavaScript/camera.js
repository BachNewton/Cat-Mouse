function setUpCameras() {
    camera.rotateX(-Math.PI / 6);
    camera.translateZ(25);
    cameraAnchor.add(camera);
    scene.add(cameraAnchor);
}

function updateFirstPersonCameraPosition() {
    if (gameplayMode === 'cat') {
        firstPersonCamera.position.set(0, 0.7, 0.5);
    } else if (gameplayMode === 'mouse') {
        firstPersonCamera.position.set(0, 0.3, 0.2);
    }
}

function updateAspects() {
    camera.aspect = window.innerWidth / window.innerHeight;
    firstPersonCamera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
    firstPersonCamera.updateProjectionMatrix();
}

function updateCamera() {
    var moved = false;

    var translateSpeed = 0.25;
    var zoomSpeed = 0.75;
    var rotateSpeed = Math.PI / 128;

    if (keysHeld['ShiftLeft']) {
        translateSpeed *= 3;
        zoomSpeed *= 3;
        rotateSpeed *= 3;
    }

    if (keysHeld['KeyW']) {
        cameraAnchor.translateZ(-translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyA']) {
        cameraAnchor.translateX(-translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyS']) {
        cameraAnchor.translateZ(translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyD']) {
        cameraAnchor.translateX(translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyQ'] || keysHeld['ArrowLeft']) {
        cameraAnchor.rotateY(-rotateSpeed);
        moved = true;
    }

    if (keysHeld['KeyE'] || keysHeld['ArrowRight']) {
        cameraAnchor.rotateY(rotateSpeed);
        moved = true;
    }

    if (keysHeld['ArrowUp']) {
        camera.rotateX(rotateSpeed);
        camera.rotation.x = Math.min(Math.PI / 2, camera.rotation.x);
        moved = true;
    }

    if (keysHeld['ArrowDown']) {
        camera.rotateX(-rotateSpeed);
        camera.rotation.x = Math.max(-Math.PI / 2, camera.rotation.x);
        moved = true;
    }

    if (mouse.wheelDelta !== 0) {
        if (mouse.wheelDelta > 0) {
            camera.translateZ(zoomSpeed);
        } else {
            camera.translateZ(-zoomSpeed);
        }

        mouse.wheelDelta = 0;
        moved = true;
    }

    if (moved) {
        sendUpdateToServer();
    }
}

function updateFirstPersonCamera() {
    var moved = false;

    var translateSpeed = 0.05;

    if (keysHeld['ShiftLeft']) {
        translateSpeed *= 2;
    }

    if (gameplayMode === 'cat') {
        var mesh = catMeshBox;
    } else if (gameplayMode === 'mouse') {
        var mesh = mouseMeshBox;
    }

    var oldPosition = mesh.position.clone();

    if (keysHeld['KeyW']) {
        mesh.translateZ(-translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyA']) {
        mesh.translateX(-translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyS']) {
        mesh.translateZ(translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyD']) {
        mesh.translateX(translateSpeed);
        moved = true;
    }

    if (moved) {
        sendUpdateToServer();

        var newPosition = mesh.position.clone();

        mesh.velocity = newPosition.sub(oldPosition);
    }
}

function rotateCamera() {
    if (gameplayMode !== 'third-person') {
        const SENSITIVITY = 0.0025;

        firstPersonCamera.rotation.x = Math.max(-Math.PI / 2, Math.min(firstPersonCamera.rotation.x + SENSITIVITY * -mouse.movementY, Math.PI / 2));

        if (gameplayMode === 'cat') {
            var mesh = catMeshBox;
        } else if (gameplayMode === 'mouse') {
            var mesh = mouseMeshBox;
        }

        mesh.rotateY(SENSITIVITY * -mouse.movementX);

        sendUpdateToServer();
    }
}
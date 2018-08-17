function setUpCameras() {
    camera.rotateX(-Math.PI / 6);
    camera.translateZ(25);
    cameraAnchor.add(camera);
    scene.add(cameraAnchor);

    firstPersonCamera.translateY(0.5);
    firstPersonCameraAnchor.add(firstPersonCamera);
    firstPersonCameraMesh.add(firstPersonCameraAnchor);
    scene.add(firstPersonCameraMesh);
}

function getFirstPersonCameraMesh() {
    var geometry = new THREE.BoxGeometry(0.4, 1, 0.4);
    var material = new THREE.MeshBasicMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    
    mesh.translateY(0.5);

    return mesh;
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

    var oldPosition = firstPersonCameraMesh.position.clone();

    if (keysHeld['KeyW']) {
        firstPersonCameraMesh.translateZ(-translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyA']) {
        firstPersonCameraMesh.translateX(-translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyS']) {
        firstPersonCameraMesh.translateZ(translateSpeed);
        moved = true;
    }

    if (keysHeld['KeyD']) {
        firstPersonCameraMesh.translateX(translateSpeed);
        moved = true;
    }

    if (moved) {
        sendUpdateToServer();

        var newPosition = firstPersonCameraMesh.position.clone();

        firstPersonCameraMesh.velocity = newPosition.sub(oldPosition);
    }
}
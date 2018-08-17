var mouse = {
    wheelDelta: 0,
    x: 0,
    y: 0
};

document.addEventListener('wheel', function (event) {
    mouse.wheelDelta += event.deltaY;
});

document.addEventListener('mousemove', function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // This logic should be moved to the camera file!!

    if (!buildMode) {
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        var sensitivity = 0.0025;

        firstPersonCamera.rotation.x = Math.max(-Math.PI / 2, Math.min(firstPersonCamera.rotation.x + sensitivity * -movementY, Math.PI / 2));

        firstPersonCameraMesh.rotateY(sensitivity * -movementX);

        sendUpdateToServer();
    }
});

document.addEventListener('mousedown', function () {
    // Mouse has been pressed down
});

// Needs to be updated!! No more grid!
function getMouseTargetPoint() {
    var raycaster = new THREE.Raycaster();
    var target = new THREE.Vector2(mouse.x, mouse.y);

    raycaster.setFromCamera(target, camera);

    var intersects = raycaster.intersectObjects([ground]);

    var gridCenterPoint = { x: 0, y: 0 };

    if (intersects.length > 0) {
        gridCenterPoint = pointToGridCenterPoint(intersects[0].point.x, intersects[0].point.z);
    }

    return gridCenterPoint;
}
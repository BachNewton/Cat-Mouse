var mouse = {
    wheelDelta: 0,
    x: 0,
    y: 0,
    movementX: 0,
    movementY: 0
};

document.addEventListener('wheel', function (event) {
    mouse.wheelDelta += event.deltaY;
});

document.addEventListener('mousemove', function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    mouse.movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    mouse.movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    rotateCamera();
});

document.addEventListener('mousedown', function () {
    // Mouse has been pressed down
});
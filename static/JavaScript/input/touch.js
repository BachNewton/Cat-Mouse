var touch = {
    x: -1,
    y: -1,
    movementX: 0,
    movementY: 0
};

document.addEventListener('touchstart', function (event) {
    touch.x = event.touches[0].clientX;
    touch.y = event.touches[0].clientY;
});

document.addEventListener('touchmove', function (event) {
    var clientX = event.touches[0].clientX;
    var clientY = event.touches[0].clientY;

    touch.movementX = clientX - touch.x;
    touch.movementY = clientY - touch.y;

    touch.x = clientX;
    touch.y = clientY;

    // rotateCamera();
});
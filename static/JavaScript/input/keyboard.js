var keysHeld = {};

document.addEventListener('keydown', function (event) {
    keysHeld[event.code] = true;
    checkKey(event.code);
});

document.addEventListener('keyup', function (event) {
    keysHeld[event.code] = false;
});

function checkKey(code) {
    if (code === 'KeyC') {
        enterCatMode();
    } else if (code === 'KeyB') {
        enterThirdPersonMode();
    } else if (code === 'KeyM') {
        enterMouseMode();
    } else if (code === 'Space') {
        jump();
    } else if (code === 'Backslash') {
        console.log('{ ' + mouseMeshBox.position.x + ', ' + mouseMeshBox.position.y + ', ' + mouseMeshBox.position.z + ' }');
    }
}
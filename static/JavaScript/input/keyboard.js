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
        enterCivilianMode();
    } else if (code === 'KeyB') {
        enterBuildMode();
    }
}
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
        console.log('{ x: ' + mouseMeshBox.position.x + ', y: ' + mouseMeshBox.position.y + ', z: ' + mouseMeshBox.position.z + ' }');
        testPositions.push({ x: mouseMeshBox.position.x, y: mouseMeshBox.position.y, z: mouseMeshBox.position.z });
    } else if (code === 'Period') {
        var text = 'All Cheese Positions:\n';
        for (var position of testPositions) {
            text += '{ x: ' + position.x + ', y: ' + position.y + ', z: ' + position.z + ' },\n';
        }
        console.log(text);
    }
}

var testPositions = [];
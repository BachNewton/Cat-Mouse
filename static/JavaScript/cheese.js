function placeCheeses() {
    var positions = [
        { x: -12, y: 3.8, z: 15 },
        { x: -12, y: 3.8, z: 13 },
        { x: -12, y: 3.8, z: 11 },
        { x: -12, y: 1.8, z: 11 }
    ];

    for (var position of positions) {
        var cheese = models.cheese.clone();

        cheeses.push(cheese);

        var cheeseAnchor = new THREE.Object3D();

        cheeseAnchor.position.set(position.x, position.y, position.z);

        cheeseAnchor.add(cheese);

        scene.add(cheeseAnchor);
    }
}

function getCheeseProperties() {
    return { phase: 0 };
}

function updateCheeses() {
    for (var cheese of cheeses) {
        const AMPLITUDE = 0.1;
        const FREQUENCY = Math.PI / 256;

        cheeseProperties.phase = (cheeseProperties.phase + FREQUENCY) % (2 * Math.PI);

        var height = AMPLITUDE * Math.sin(cheeseProperties.phase);

        cheese.rotateY(Math.PI / 128);
        cheese.position.setY(height);
    }
}
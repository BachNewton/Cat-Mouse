function checkCollision(object, objects) {
    var ray = new THREE.Raycaster();

    var worldVertex = new THREE.Vector3();

    var worldPosition = new THREE.Vector3();
    object.getWorldPosition(worldPosition);

    for (var vertex of object.geometry.vertices) {
        worldVertex.copy(vertex);
        worldVertex.applyMatrix4(object.matrixWorld);

        var directionVector = worldVertex.sub(worldPosition);
        var distanceToVertex = directionVector.length();

        ray.set(worldPosition, directionVector.normalize());

        var collisionResults = ray.intersectObjects(objects, true);

        if (collisionResults.length > 0 && collisionResults[0].distance < distanceToVertex) {
            impulseResponse(object, collisionResults[0].face.normal, objects);
            break;
        }
    }
}

function impulseResponse(object, normal, objects) {
    var velocity = object.velocity.clone();
    velocity.add(object.fallVelocity);

    var angle = velocity.angleTo(normal);

    if (!isNaN(angle) && angle > Math.PI / 2) {
        velocity.multiply(normal);
        velocity.negate();
        velocity.multiply(normal);

        updateGrounded(object, velocity);

        object.position.add(velocity);

        object.translateY(0.001);

        checkCollision(object, objects);
    }
}

function updateGrounded(object, velocity) {
    var impulseAngleFromGravity = GRAVITY.angleTo(velocity);

    if (impulseAngleFromGravity > Math.PI / 2) {
        object.grounded = true;
        object.fallVelocity.set(0, 0, 0);
    }
}
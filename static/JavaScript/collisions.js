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

        var collisionResults = ray.intersectObjects(objects);

        if (collisionResults.length > 0 && collisionResults[0].distance < distanceToVertex) {
            impulseResponse(object, collisionResults[0].face.normal);
            break;
        }
    }
}

function impulseResponse(object, normal) {
    var velocity = object.velocity;

    var angle = velocity.angleTo(normal);

    if (!isNaN(angle) && angle > Math.PI / 2) {
        velocity.multiply(normal);
        velocity.negate();
        velocity.multiply(normal);

        object.position.add(velocity);
    }
}
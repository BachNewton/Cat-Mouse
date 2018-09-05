function animate() {
    requestAnimationFrame(animate);

    stats.begin();

    if (gameplayMode === GAMEPLAY_MODES.THIRD_PERSON) {
        renderer.render(scene, camera);
        updateCamera();
    } else {
        renderer.render(scene, firstPersonCamera);
        updateFirstPersonCamera();
    }

    if (gameplayMode === GAMEPLAY_MODES.CAT) {
        applyGravity(catMeshBox);
        applyFall(catMeshBox);
        checkCollision(catMeshBox, walls, 0);
        checkCatInRangeOfMice();
    } else if (gameplayMode === GAMEPLAY_MODES.MOUSE) {
        applyGravity(mouseMeshBox);
        applyFall(mouseMeshBox);
        checkCollision(mouseMeshBox, walls, 0);
    }

    stats.end();
}

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateAspects();
});
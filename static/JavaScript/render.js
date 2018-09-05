function animate() {
    requestAnimationFrame(animate);

    stats.begin();

    if (gameplayMode === 'third-person') {
        renderer.render(scene, camera);
        updateCamera();
    } else {
        renderer.render(scene, firstPersonCamera);
        updateFirstPersonCamera();
    }

    if (gameplayMode === 'cat') {
        applyGravity(catMeshBox);
        applyFall(catMeshBox);
        checkCollision(catMeshBox, walls);
        checkCatInRangeOfMice();
    } else if (gameplayMode === 'mouse') {
        applyGravity(mouseMeshBox);
        applyFall(mouseMeshBox);
        checkCollision(mouseMeshBox, walls);
    }

    stats.end();
}

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateAspects();
});
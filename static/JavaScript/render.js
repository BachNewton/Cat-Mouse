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
        checkCollision(catMeshBox, walls);
        checkCatInRangeOfMice();
    } else if (gameplayMode === 'mouse') {
        checkCollision(mouseMeshBox, walls);
    }

    stats.end();
}

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateAspects();
});
function animate() {
    requestAnimationFrame(animate);

    stats.begin();

    if (buildMode) {
        renderer.render(scene, camera);
        updateCamera();
    } else {
        renderer.render(scene, firstPersonCamera);
        updateFirstPersonCamera();
        checkCollision(firstPersonCameraMesh, walls);
    }

    stats.end();
}

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateAspects();
});
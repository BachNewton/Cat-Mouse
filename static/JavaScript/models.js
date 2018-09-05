function loadAllModels() {
    loadOBJObject('cat', 'static/Models/cat/', 'cat.obj', 'cat.mtl', 1);
    loadOBJObject('mouse', 'static/Models/mouse/', 'CairoSpinyMouse.obj', 'CairoSpinyMouse.mtl', 0.3);
    loadOBJObject('room', 'static/Models/room/', 'model-triangulated.obj', 'materials.mtl', 4);
}

function loadOBJObject(name, path, OBJFileName, MTLFileName, scale) {
    var MTLLoader = new THREE.MTLLoader();

    MTLLoader.setPath(path);
    MTLLoader.setMaterialOptions({ ignoreZeroRGBs: true });

    MTLLoader.load(MTLFileName, function (materials) {
        var OBJLoader = new THREE.OBJLoader();

        OBJLoader.setMaterials(materials);

        OBJLoader.setPath(path);

        OBJLoader.load(OBJFileName, function (loadedObject) {
            loadedObject.scale.multiplyScalar(scale);

            models[name] = loadedObject;

            finishedLoadingModel(name);
        });
    });
}

function finishedLoadingModel(name) {
    var model = models[name];

    if (name === 'cat') {
        adjustCat(model);
        catMeshBox.add(model);
    } else if (name === 'mouse') {
        adjustMouse(model);
        mouseMeshBox.add(model);
    } else if (name === 'room') {
        model.translateY(3.4);
        walls.push(model);
        scene.add(model);
    }
}

function adjustCat(model) {
    model.translateY(-0.5);
    model.rotateY(Math.PI);
    model.translateZ(-0.4);
}

function adjustMouse(model) {
    model.translateY(-0.25);
    model.rotateY(Math.PI);
}

function getCatMeshBox() {
    var geometry = new THREE.BoxGeometry(0.4, 1, 1.1, 2, 2, 2);
    var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-1, 0.5, -1);

    mesh.velocity = new THREE.Vector3();
    mesh.fallVelocity = new THREE.Vector3();
    mesh.grounded = true;

    return mesh;
}

function getMouseMeshBox() {
    var geometry = new THREE.BoxGeometry(0.3, 0.5, 0.8, 2, 2, 2);
    var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-1, 0.25, -1);

    mesh.velocity = new THREE.Vector3();
    mesh.fallVelocity = new THREE.Vector3();
    mesh.grounded = true;

    return mesh;
}

socket.on('cat start', function (data) {
    // catMeshBox.position.x = data.x;
    // catMeshBox.position.z = data.z;

    catMeshBox.position.set(-11.936, 3.57, 16.213);

    sendUpdateToServer();
});

socket.on('mouse start', function (data) {
    // mouseMeshBox.position.x = data.x;
    // mouseMeshBox.position.z = data.z;

    mouseMeshBox.position.set(-11.936, 3.57, 16.213);

    // Look towards the maze :-)
    mouseMeshBox.lookAt(mouseMeshBox.position.x, mouseMeshBox.position.y, mouseMeshBox.position.z - 1);

    sendUpdateToServer();
});

function applyGravity(mesh) {
    mesh.fallVelocity.add(GRAVITY);
}

function applyFall(mesh) {
    mesh.position.add(mesh.fallVelocity);
}
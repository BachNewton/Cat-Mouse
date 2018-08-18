function loadAllModels() {
    loadOBJObject('cat', 'static/Models/cat/', 'cat.obj', 'cat.mtl', 1);
}

function loadOBJObject(name, path, OBJFileName, MTLFileName, scale, yOffset) {
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

            finishedLoading(name);
        });
    });
}

function finishedLoading(name) {
    var model = models[name];

    if (name === 'cat') {
        model.translateY(-0.5);
        model.rotateY(Math.PI);
        model.translateZ(-0.4);

        firstPersonCameraMesh.add(model);
    }
}
function loadAllModels() {
    loadOBJObject('player', 'static/Models/player/', 'model.obj', 'materials.mtl', 0.5, 0.8);
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

            if (yOffset !== undefined) {
                loadedObject.translateY(yOffset);
            }
            
            models[name] = loadedObject;
        });
    });
}
function addSkybox() {
    var geometry = new THREE.BoxGeometry(1000, 1000, 1000);

    var loader = new THREE.TGALoader();

    var back = loader.load('static/Textures/Skybox/hills_bk.tga');
    var down = loader.load('static/Textures/Skybox/hills_dn.tga');
    var front = loader.load('static/Textures/Skybox/hills_ft.tga');
    var left = loader.load('static/Textures/Skybox/hills_lf.tga');
    var right = loader.load('static/Textures/Skybox/hills_rt.tga');
    var up = loader.load('static/Textures/Skybox/hills_up.tga');
    up.center.set(0.5, 0.5);
    up.rotation = -Math.PI / 2;

    var materials = [
        new THREE.MeshBasicMaterial({ map: left, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: right, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: up, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: down, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: front, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: back, side: THREE.BackSide })
    ];

    var skybox = new THREE.Mesh(geometry, materials);

    scene.add(skybox);
}
var scene = new THREE.Scene();
scene.add(new THREE.AmbientLight('white', 0.5));
var directionalLight = new THREE.DirectionalLight();
directionalLight.position.set(-1, 1, -1);
scene.add(directionalLight);

var cameraAnchor = new THREE.Object3D();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
var firstPersonCameraMesh = getFirstPersonCameraMesh();
var firstPersonCameraAnchor = new THREE.Object3D();
var firstPersonCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
setUpCameras();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var buildMode = true;

var players = {};
socket.emit('new player');
sendUpdateToServer();

var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

addSkybox();

var ground = getGround();

var walls = [];

var models = {};
loadAllModels();

animate();
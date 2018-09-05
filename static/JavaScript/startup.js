var scene = new THREE.Scene();

const GRAVITY = new THREE.Vector3(0, -0.0025, 0);

var cameraAnchor = new THREE.Object3D();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
var catMeshBox = getCatMeshBox();
var mouseMeshBox = getMouseMeshBox();
var firstPersonCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
setUpCameras();

setUpLights();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var gameplayMode = 'third-person';

var players = {};
socket.emit('new player');
sendUpdateToServer();

var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

var walls = [];

// addSkybox();

makeGround();

var models = {};
loadAllModels();

animate();
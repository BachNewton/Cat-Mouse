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

const GAMEPLAY_MODES = { THIRD_PERSON: 0, CAT: 1, MOUSE: 2 };
var gameplayMode = GAMEPLAY_MODES.THIRD_PERSON;

var players = {};
socket.emit('new player');
sendUpdateToServer();

var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

var walls = [];
var cheeses = [];

// addSkybox();

makeGround();

var models = {};
loadAllModels();

var cheeseProperties = getCheeseProperties();

animate();
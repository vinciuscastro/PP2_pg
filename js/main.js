const scene = new THREE.Scene();

const camD = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer();


var camera = 0;
camD.position.set(0, 0, 5);

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3d").appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camD, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;


renderer.setClearColor(0x096842);

const modeloCubo = new THREE.BoxGeometry(1, 1, 1);

const facesCubo = [
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado1.png')
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado6.png')
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado2.png')
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado5.png')
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado4.png')
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado3.png')
    }),
];

const cubo = new THREE.Mesh(modeloCubo, facesCubo);
scene.add(cubo);

cubo.position.set(0, 0, 0);

let velRotacao = 0.01;
let sX = 0.01;
let sY = 0.01;
let sZ = 0.01;

const velMovimento = 0.1;

const atualizaVelocidade = (vel) => {
    sX = vel;
    sY = vel;
    sZ = vel;
};

const moveX = () => sX += velRotacao;
const moveY = () => sY += velRotacao;
const moveZ = () => sZ += velRotacao;

const animate = () => {
    requestAnimationFrame(animate);
    cubo.rotation.x += sX;
    cubo.rotation.y += sY;
    cubo.rotation.z += sZ;
    controls.update();
    renderer.render(scene, camD);
};

animate();


window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "1":
            atualizaVelocidade(velRotacao - 0.05);
            break;
        case "2":
            atualizaVelocidade(velRotacao + 0.05);
            break;
        case "3":
            atualizaVelocidade(0);
            break;
        case '0':
            camera = 0;
            break;
        case '9':
            camera = 1;
            break;
        case "x":
            moveX();
            break;
        case "y":
            moveY();
            break;
        case "z":
            moveZ();
            break;
        case "ArrowUp":
            cubo.position.y += velMovimento;
            break;
        case "ArrowDown":
            cubo.position.y -= velMovimento;
            break;
        case "ArrowLeft":
            cubo.position.x -= velMovimento;
            break;
        case "ArrowRight":
            cubo.position.x += velMovimento;
            break;
    }
});
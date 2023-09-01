const scene = new THREE.Scene(); //Criação da cena

const camD = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //Criação da câmera dinamica e principal
const camE = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //Criação da camera estatica.

var textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer(); //Criação do renderizador


let camera = 0;  //Variavel para controle da camera
camD.position.set(0, 0, 5); //Posição da camera dinamica
camE.position.set(0, 0, 3); //Posição da camera estatica

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3d").appendChild(renderer.domElement); //Adicionando o codigo na div do html

const controls = new THREE.OrbitControls(camD, renderer.domElement); //Controle da camera dinamica
controls.enableDamping = true; //Movimento suave da camera
controls.dampingFactor = 0.06; //Fator de movimento suave da camera


renderer.setClearColor(0x096842);  //Cor de fundo da cena

const modeloCubo = new THREE.BoxGeometry(1, 1, 1); //Modelo da forma do cubo


const facesCubo = [ //Faces do cubo
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado1.png') //Primeira face do cubo com o numero 1
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado6.png') //Segunda face do cubo com o numero 6
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado2.png') //Terceira face do cubo com o numero 2
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado5.png') //Quarta face do cubo com o numero 5
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado4.png')  //Quinta face do cubo com o numero 4
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('img/dado3.png') //Sexta face do cubo com o numero 3
    }),
];

const cubo = new THREE.Mesh(modeloCubo, facesCubo); //Criação do cubo
scene.add(cubo); //Adicionando o cubo na cena

cubo.position.set(0, 0, 0); //Posição do cubo

let velRotacao = 0.01; //Velocidade de rotação do cubo
let sX = 0.01; //Variavel de rotação do cubo no eixo x
let sY = 0.01; //Variavel de rotação do cubo no eixo y
let sZ = 0.01; //Variavel de rotação do cubo no eixo z

const velMovimento = 0.1; //Velocidade de movimento do cubo para a translação do cubo 


const shader = new THREE.RawShaderMaterial({ //Shader para as esferas
    vertexShader: document.getElementById('vertex-shader').textContent,
    fragmentShader: document.getElementById('fragment-shader').textContent,
    side: THREE.DoubleSide,
});




const formatoEsfera = new THREE.SphereGeometry(0.2, 32, 32); //Formato da esfera
const qtdEsferas = 3; //Quantidade de esferas

for (let i = 0; i < qtdEsferas; i++) { //Criação das esferas
    const esfera = new THREE.Mesh(formatoEsfera, shader);
    cubo.add(esfera);
}


const atualizaVelocidade = (vel, modo) => { //Função para atualizar a velocidade de rotação do cubo
    if (modo == 0) { //Verifica se o modo é 0 para parar o cubo
        sX = vel;
        sY = vel;
        sZ = vel;
    } else if(modo == 1){ //Verifica se o modo é 1 para acelerar o cubo
        sX += vel;
        sY += vel;
        sZ += vel;
    }
};

const moveX = () => sX += velRotacao; //Funções para acelerar o cubo no primeiro eixo
const moveY = () => sY += velRotacao; //Funções para acelerar o cubo no segundo eixo
const moveZ = () => sZ += velRotacao; //Funções para acelerar o cubo no terceiro eixo

const animate = () => { //Função para animar a cena
    requestAnimationFrame(animate);
    cubo.rotation.x += sX;
    cubo.rotation.y += sY;
    cubo.rotation.z += sZ;

    const time = Date.now() * 0.001;//Tempo para a rotação das esferas

    cubo.children.forEach((sphere, index) => { //Define a distancia e o angulo das esferas
        const radius = 1 + index / 3; 
        const angle = time * (index + 1) * (index % 2 === 0 ? 1 : -1);
        sphere.position.x = radius * Math.cos(angle);
        sphere.position.y = radius * Math.sin(angle);
        sphere.position.z = radius * Math.sin(angle);
    });

    controls.update(); //Atualiza o controle da camera
    camera === 0 ? renderer.render(scene, camD) : renderer.render(scene, camE); //Verificação de qual camera está sendo usada
};

animate();


window.addEventListener("keydown", (event) => { //Eventos de teclado
    switch (event.key) {
        case "1":
            atualizaVelocidade(velRotacao - 0.02, 1); //Diminui a velocidade de rotação do cubo
            break;
        case "2":
            atualizaVelocidade(velRotacao + 0.01, 1); //Aumenta a velocidade de rotação do cubo
            break;
        case "3":
            atualizaVelocidade(0, 0); //Para a rotação do cubo
            break;
        case '0':
            camera = 0; //Camera dinamica
            break;
        case '9':
            camera = 1; //Camera estatica
            break;
        case "x":
            moveX(); //Acelera o cubo no eixo x
            break;
        case "y":
            moveY(); //Acelera o cubo no eixo y
            break;
        case "z":
            moveZ(); //Acelera o cubo no eixo z
            break;
        case "ArrowUp":
            cubo.position.y += velMovimento; //Translação do cubo para cima
            break;
        case "ArrowDown":
            cubo.position.y -= velMovimento; //Translação do cubo para baixo
            break;
        case "ArrowLeft":
            cubo.position.x -= velMovimento; //Translação do cubo para esquerda
            break;
        case "ArrowRight":
            cubo.position.x += velMovimento; //Translação do cubo para direita
            break;
    }
});
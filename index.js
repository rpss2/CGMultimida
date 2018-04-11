const ORIGEM = new THREE.Vector3(0, 0, 0);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 300);
camera.position.set(75, 75, 75);
camera.lookAt(ORIGEM);

let control = new THREE.OrbitControls(camera);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function gerarSol(planeta) {
    let geometriaSol = new THREE.SphereGeometry(30, 30, 30);
    
    let materialSol = new THREE.MeshPhongMaterial( {} );
    let loader = new THREE.ImageLoader();
    
    loader.load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTecwkGbRbcpXAJ-6Arsj1ROI_pGQTyGuh1bk0-PYXO2WTpStCE", ( image ) => {
        let texture = new THREE.Texture();
        texture.image = image;
        texture.needsUpdate = true;
        
        materialSol.map = texture;
        materialSol.needsUpdate = true;
    });
    
    let sun = new THREE.Mesh(geometriaSol, materialSol);
    sun.add(planeta);
    scene.add(sun);
    return sun;
}

function gerarJupiter() {
    let geometriaJupiter = new THREE.SphereGeometry(40, 50, 50);
    
    let materialJupiter = new THREE.MeshPhongMaterial( {} );
    let loader = new THREE.ImageLoader();
    
    loader.load("https://raw.githubusercontent.com/afonsopacifer/cdn/master/jupitermap.jpg", ( image ) => {
        let texture = new THREE.Texture();
        texture.image = image;
        texture.needsUpdate = true;
        
        materialJupiter.map = texture;
        materialJupiter.needsUpdate = true;
    });
    
    let jupiter = new THREE.Mesh(geometriaJupiter, materialJupiter);
    jupiter.translateX(130);
    return jupiter;
}

function gerarTerra(lua) {
    let geometriaTerra = new THREE.SphereGeometry(5, 20, 20);
    
    let earthMaterial = new THREE.MeshPhongMaterial( {} );
    let loader = new THREE.ImageLoader();
    
    loader.load("https://raw.githubusercontent.com/afonsopacifer/cdn/master/earthmap1k.jpg", ( image ) => {
        let texture = new THREE.Texture();
        texture.image = image;
        texture.needsUpdate = true;
        
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
    });
    
    let earth = new THREE.Mesh(geometriaTerra, earthMaterial);
    earth.translateX(50);
    earth.add(lua);
    return earth;
}

function gerarLua() {
    let geometriaLua = new THREE.SphereGeometry(1, 20, 20);
    let materialLua = new THREE.MeshBasicMaterial(
        {
            color: 0x909090
        }
    );
    let lua = new THREE.Mesh(geometriaLua, materialLua);
    lua.translateX(10);
    return lua;
}

function gerarLuz() {
    let pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(10, 50, 30);
    
    let luzAmbiente = new THREE.AmbientLight({color: 0x000000});
    
    scene.add(pointLight);
    scene.add(luzAmbiente);
}

let lua = gerarLua();
let terra = gerarTerra(lua);
let jupiter = gerarJupiter();
let sol = gerarSol(terra);
sol.add(jupiter);
gerarLuz();

let geometry = new THREE.BoxGeometry(10, 10, 10);
let material = new THREE.MeshBasicMaterial( 
    {
        color: 0x0055aa
    }
);
let cubo = new THREE.Mesh( geometry, material );
cubo.translateX(-190);
scene.add(cubo);

function rotSol() {
    let matrixY = new THREE.Matrix4();
    matrixY.makeRotationY(angleToRadianos(0.3));
    sol.applyMatrix(matrixY);
}

function rotTerra() {
    let matrixY = new THREE.Matrix4();
    matrixY.makeRotationY(angleToRadianos(1));
    terra.applyMatrix(matrixY);
}

function rotJupiter() {
    let matrixY = new THREE.Matrix4();
    matrixY.makeRotationY(angleToRadianos(0.1));
    jupiter.applyMatrix(matrixY);
}

function rotLua() {
    let matrixY = new THREE.Matrix4();
    matrixY.makeRotationY(angleToRadianos(2));
    lua.applyMatrix(matrixY);
}

function animate() {
    renderer.render(scene, camera);
    
    rotLua();
    rotTerra();
    rotJupiter();
    rotSol();
    
    requestAnimationFrame(animate);
}


function angleToRadianos(angulo) {
    return angulo * Math.PI / 180;
}

animate();
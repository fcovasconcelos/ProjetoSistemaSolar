//import { OrbitControls } from 'node_modules\three\examples\jsm\controls\OrbitControls.js'
//import para usar os controles do mouse(zoom com scrool e perspectiva com click e arrasta)
// Configurando a cena (Scene)

const scene = new THREE.Scene();
// câmera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

// renderizador
const renderer = new THREE.WebGLRenderer({
  alpha: true, //assume transparência
  antialias: true
  });
// tamanho da tela
renderer.setSize(window.innerWidth, window.innerHeight);
// conectando o renderizador
document.body.appendChild(renderer.domElement);

// declarando o sol e planetas
const textureLoader = new THREE.TextureLoader();

//scene.background = textureLoader.load('/public/viaLactea.jpg');
scene.background = textureLoader.load("https://cdn.eso.org/images/thumb700x/eso0932a.jpg");
const solTexture = textureLoader.load("sol.jpeg");

//const solTexture = new THREE.TextureLoader().load("sol.jpeg");
const solGeometry = new THREE.SphereGeometry(29, 32, 32);

const solMaterial = new THREE.MeshBasicMaterial({ color: 0xFfff00 });
//solMaterial.map = solTexture;
const solMesh = new THREE.Mesh(solGeometry, solMaterial);


scene.add(solMesh);
// const mercury = new Planet(2, 16, "mercury.png");
// const mercuryMesh = mercury.getMesh();
//let mercurySystem = new THREE.Group();
//scene.add(mercuryMesh);


const mercurioGeometry = new THREE.SphereGeometry(1,32,32);
const mercurioTexture = textureLoader.load("https://www.solarsystemscope.com/textures/download/2k_mercury.jpg");
const mercurioMaterial = new THREE.MeshBasicMaterial({ color: 0xf0f0f1 });
const mercurioMesh = new THREE.Mesh(mercurioGeometry, mercurioMaterial);
mercurioMesh.position.x = 35;


scene.add(mercurioMesh);

const venusGeometry = new THREE.SphereGeometry(2.5, 32, 32);
const venusMaterial = new THREE.MeshBasicMaterial({ color: 0xfadd00});
const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
venusMesh.position.x = 45;

scene.add(venusMesh);

let terraSystem = new THREE.Group();
//terraSystem.position.x =  55;

const terraGeometry = new THREE.SphereGeometry(3, 32, 32);
const terraMaterial = new THREE.MeshBasicMaterial({ color: 0x00ddf0});
const terraMesh = new THREE.Mesh(terraGeometry, terraMaterial);
terraMesh.position.x = 55;

const luaGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const luaMaterial = new THREE.MeshBasicMaterial({ color: 0xf0ddf0});
const luaMesh = new THREE.Mesh(luaGeometry, luaMaterial);
luaMesh.position.x = 60;

terraSystem.add(terraMesh);
terraSystem.add(luaMesh);

scene.add(terraSystem);

// Orbitas
const curve1 = new THREE.EllipseCurve(0, 0, 35, 30, 0, 2*Math.PI,);
const points1 = curve1.getSpacedPoints(200);
const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
const material1 = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5});
const orbit1 = new THREE.Line(geometry1, material1);
orbit1.rotateX(-Math.PI/2);
scene.add(orbit1);

const curve2 = new THREE.EllipseCurve(0, 0, 45, 40, 0, 2*Math.PI,);
const points2 = curve2.getSpacedPoints(200);
const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
const material2 = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5});
const orbit2 = new THREE.Line(geometry2, material2);
orbit2.rotateX(-Math.PI/2);
scene.add(orbit2);

const curveL = new THREE.EllipseCurve(55, 0, 3, 6, 0, 2*Math.PI,);
const pointsL = curveL.getSpacedPoints(200);
const geometryL = new THREE.BufferGeometry().setFromPoints(pointsL);
const materialL = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5});
const orbitL = new THREE.Line(geometryL, materialL);
orbitL.rotateX(-Math.PI/2);
//terraSystem.add(orbitL);

const curve3 = new THREE.EllipseCurve(0, 0, 55, 50, 0, 2*Math.PI,);
const points3 = curve3.getSpacedPoints(200);
const geometry3 = new THREE.BufferGeometry().setFromPoints(points3);
const material3 = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5});
const orbit3 = new THREE.Line(geometry3, material3);
orbit3.rotateX(-Math.PI/2);
scene.add(orbit3);

const Looptime = 1;
const mercurioOrbitSpeed = 0.00003;

const venusOrbitSpeed = 0.000025;
const terraSystemOrbitSpeed = 0.00003;
const luaOrbitSpeed = 0.00005;


//const sSolar = new THREE.Group();
//sSolar.add(solMesh);


// configurar a profundidade da câmera
//camera.position.z = 128;

camera.position.set(0, 30, 228);


function animate(){
    requestAnimationFrame(animate);
    //aplicar depois comando abaixo
    const time1 = mercurioOrbitSpeed * performance.now();
    const t1 = (time1 % Looptime) / Looptime;
    let p1 =curve1.getPoint(t1);
    mercurioMesh.position.x = p1.x;
    mercurioMesh.position.z = p1.y;
    mercurioMesh.rotation.y += 0.02;

    const time2 = venusOrbitSpeed * performance.now();
    const t2 = (time2 % Looptime) / Looptime;
    let p2 =curve2.getPoint(t2);
    venusMesh.position.x = p2.x;
    venusMesh.position.z = p2.y;
    venusMesh.rotation.y += 0.02;

    const timeL = luaOrbitSpeed * performance.now();
    const tL = (timeL % Looptime) / Looptime;
    let pL =curveL.getPoint(tL);
    luaMesh.position.x = pL.x;
    luaMesh.position.z = pL.y;
    luaMesh.rotation.y += 0.02;

     const time3 = terraSystemOrbitSpeed * performance.now();
     const t3 = (time3 % Looptime) / Looptime;
     let p3 =curve3.getPoint(t3);
     //terraSystem.position.x = p3.x;
     //terraSystem.position.z = p3.y;
    //terraSystem.rotation.y += 0.02;
    
    renderer.render(scene, camera);
}

animate();

class Planet {
    constructor(radius, positionX, textureFile) {
      this.radius = radius;
      this.positionX = positionX;
      this.textureFile = textureFile;
    }
  
    getMesh() {
      if (this.mesh === undefined || this.mesh === null) {
        const geometry = new THREE.SphereGeometry(this.radius);
        const texture = new THREE.TextureLoader().load(this.textureFile);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x += this.positionX;
      }
      return this.mesh;
    }
  }
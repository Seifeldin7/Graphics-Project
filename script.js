//Create Camera And Scene
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 2;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})


//Load GLTF Model
var loader = new THREE.GLTFLoader();
loader.load('scene.gltf',handle_load )
var Goku;
function handle_load(gltf){
    Goku= gltf.scene.children[0];

    scene.add( Goku );
    Goku.position.z = -1;
    Goku.position.y = -0.2;
    Goku.rotation.z = -2;

}
//Light
var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

var light = new THREE.AmbientLight(0xFFFFFF, 0.6)
scene.add(light);

//Animation Function
var render = function() {
    requestAnimationFrame(render);
    Goku.rotation.z += 0.01;
    renderer.render(scene, camera);
}


render();
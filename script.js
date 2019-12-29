//Create Camera And Scene
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,0.1,1500)
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// Control
let controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', renderer);
controls.minDistance = 50;
controls.maxDistance = 250;

// Sky Box
let materialArray = [];

let texture_ft = new THREE.TextureLoader().load( 'sky_box/yonder_ft.jpg');
let texture_bk = new THREE.TextureLoader().load( 'sky_box/yonder_bk.jpg');
let texture_up = new THREE.TextureLoader().load( 'sky_box/yonder_up.jpg');
let texture_dn = new THREE.TextureLoader().load( 'sky_box/yonder_dn.jpg');
let texture_rt = new THREE.TextureLoader().load( 'sky_box/yonder_rt.jpg');
let texture_lf = new THREE.TextureLoader().load( 'sky_box/yonder_lf.jpg');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 500, 500, 500);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add(skybox);


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    
    camera.updateProjectionMatrix();
})


//Load GLTF Model


var loader = new THREE.GLTFLoader();
loader.load('./kaio/scene.gltf',handle_load )
var island;
var mixer = null;

function handle_load(gltf){
   
    island = gltf.scene.children[ 0 ];
	scene.add( island );
	mixer = new THREE.AnimationMixer( island );
	mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 30 ).play();

    
    island.position.z = 0;
    island.position.y = 0;
    island.scale.set(0.4,0.4,0.4);

}
var loader2 = new THREE.GLTFLoader();
loader2.load('./Goku/scene.gltf',handle_load2 )
var Goku2;
function handle_load2(gltf){
    Goku2= gltf.scene.children[0];

    scene.add( Goku2 );
    Goku2.scale.set( 12, 12, 12 );

    Goku2.position.z = 6;
    Goku2.position.y = 8.5;
    Goku2.position.x = 3.5;

    Goku2.rotation.z = -3.5;

}
//Light
var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

var light = new THREE.AmbientLight(0xFFFFFF, 0.9)
scene.add(light);

//Animation Function
var prevTime = Date.now();
var render = function() {
   requestAnimationFrame(render);
   renderer.render(scene, camera);
   
   if ( mixer ) {
    var time = Date.now();
    mixer.update( ( time - prevTime ) * 0.001 );
    prevTime = time;
    }
}


render();
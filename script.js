//Create Camera And Scene
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight,0.1,1500)
camera.position.z = 50;
camera.position.x = 15;
camera.position.y = 0;
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


//Load GLTF Models


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
    Goku2.position.y = 9;
    Goku2.position.x = 3.5;

    Goku2.rotation.z = -2.1;

}
var loader3 = new THREE.GLTFLoader();
loader3.load('./dragon/scene.gltf',handle_load3 )
var dragon;
function handle_load3(gltf){
    dragon= gltf.scene.children[0];

    scene.add( dragon );
    dragon.scale.set( 0.05, 0.05, 0.05 );

    dragon.position.z = 6;
    dragon.position.y = -20;
    dragon.position.x = 30;

    dragon.rotation.z = -1.5;

}
var loader4 = new THREE.GLTFLoader();
loader4.load('./goku cloud/scene.gltf',handle_load4 )
var gokucloud;
function handle_load4(gltf){
    gokucloud= gltf.scene.children[0];

    scene.add( gokucloud );
    gokucloud.scale.set( 0.05, 0.05, 0.05 );

    gokucloud.position.z = -60;
    gokucloud.position.y = 0;
    gokucloud.position.x = 30;

    gokucloud.rotation.z = -1.5;

}
var loader5 = new THREE.GLTFLoader();
loader5.load('./dragon_balls/scene.gltf',handle_load5 )
var dragon_balls;
function handle_load5(gltf){
    dragon_balls= gltf.scene.children[0];

    scene.add( dragon_balls );
    dragon_balls.scale.set( 0.02, 0.02, 0.02 );

    dragon_balls.position.z = 0;
    dragon_balls.position.y = 5;
    dragon_balls.position.x = 17;


}
//Light
var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

var light = new THREE.AmbientLight(0xFFFFFF, 1.3)
scene.add(light);
function animate(){
    gokucloud.position.x -=0.2;
    dragon_balls.rotation.z+=0.01;
}
//Animation Function
var prevTime = Date.now();
var render = function() {
   requestAnimationFrame(render);
   renderer.render(scene, camera);
   if( gokucloud && dragon_balls){
        animate();
   }
   
   if ( mixer ) {
    var time = Date.now();
    mixer.update( ( time - prevTime ) * 0.001 );
    prevTime = time;
    }
}


render();

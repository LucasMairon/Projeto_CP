import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Boat from './elements_class/boat.js';

// variáveis para movimentação do barco e camera
const keys = {
    arrowUp: false,
    arrowDown: false,
    arrowRight: false,
    arrowLeft: false,
    space: false,
}

function move_camera(){
    let position_x = boat.model.position.x;
    let position_y = boat.model.position.y;
    let position_z = boat.model.position.z;
    if (keys.space){
        position_y += 2;
        position_z += 5;
    }
    camera.position.set(position_x, position_y + 2, position_z + 7)
    camera.lookAt(position_x, position_y, position_z)
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.update(); 

const light = new THREE.AmbientLight( 0xffffff );
scene.add(light)

const boat = new Boat(scene,"./models/boat/boat.gltf");

function animate() {
    renderer.render( scene, camera );
    controls.update();
    if(boat.model){
        boat.move(keys);
        move_camera()
    }
}
renderer.setAnimationLoop( animate );

document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event){
    switch(event.key){
        case "w":
        case "ArrowUp": {
            keys.arrowUp = true;
            break;
        }
        case "s":
        case "ArrowDown": {
            keys.arrowDown = true;
            break;
        }
        case "d":
        case "ArrowRight": {
			keys.arrowRight = true;
            break;
        }
        case "a":
        case "ArrowLeft": {
            keys.arrowLeft = true;
            break;
        }
        case " ": {
            keys.space = keys.space? false:true;
            break;
        }
    }
}

document.addEventListener("keyup", onDocumentKeyUp, false);

function onDocumentKeyUp(event){
    switch(event.key){
        case "w":
        case "ArrowUp": {
            keys.arrowUp = false;
            break;
        }
        case "s":
        case "ArrowDown": {
            keys.arrowDown = false;
            break;
        }
        case "d":
        case "ArrowRight": {
            keys.arrowRight = false;
            break;
        }
        case "a":
        case "ArrowLeft": {
            keys.arrowLeft = false;
            break;
        }
    }
}

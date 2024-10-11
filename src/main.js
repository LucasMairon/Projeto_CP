import * as THREE from "three";
import Boat from "./elements_class/boat.js";
import Obstacle from "./elements_class/obstacle.js";

// variáveis para movimentação do barco e camera
const keys = {
  arrowUp: false,
  arrowDown: false,
  arrowRight: false,
  arrowLeft: false,
  space: false,
};

const CAMERA_POSITION_Z_3_PERSON = 15;
const CAMERA_POSITION_Y_3_PERSON = 8;

const CAMERA_POSITION_Y_1_PERSON = 1.5

function move_camera() {
  let position_x = boat.model.position.x;
  let position_y = boat.model.position.y;
  let position_z = boat.model.position.z;
  if (keys.space) {
    position_y += CAMERA_POSITION_Y_3_PERSON;
    let theta = boat.model.rotation.z;
    position_z += Math.cos(theta) * CAMERA_POSITION_Z_3_PERSON;
    position_x += Math.sin(theta) * CAMERA_POSITION_Z_3_PERSON;
  }else{
    position_y += CAMERA_POSITION_Y_1_PERSON;
  }
  camera.position.set(position_x, position_y, position_z);
  camera.rotation.y = boat.model.rotation.z;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

const texture_load = new THREE.TextureLoader();

function create_material_with_texture(texture_path, BackSide = true) {
  const material = new THREE.MeshPhongMaterial({
    map: texture_load.load(texture_path),
  });
  if (BackSide) material.side = THREE.BackSide;
  return material;
}

const cube_scene_materials = [
  create_material_with_texture("./texture/scene_right.png"),
  create_material_with_texture("./texture/scene_left.png"),
  create_material_with_texture("./texture/scene_top.png"),
  create_material_with_texture("./texture/scene_bottom.png"),
  create_material_with_texture("./texture/scene_front.png"),
  create_material_with_texture("./texture/scene_back.png"),
];

const CUBE_SCENE_WIDTH = 800;
const CUBE_SCENE_HEIGHT = 200;
const CUBE_SCENE_DEPTH = 800;

const cube_scene_geometry = new THREE.BoxGeometry(
  CUBE_SCENE_WIDTH,
  CUBE_SCENE_HEIGHT,
  CUBE_SCENE_DEPTH
);

const cube_scene = new THREE.Mesh(cube_scene_geometry, cube_scene_materials);
scene.add(cube_scene);
cube_scene.receiveShadow = true;


function collision_objects(object1, object2) {
  let d = object1.position.distanceTo(object2.position);
  return d < 7;
}

Obstacle.SCENE_DEPTH = CUBE_SCENE_DEPTH;
Obstacle.SCENE_HEIGHT = CUBE_SCENE_HEIGHT;
Obstacle.SCENE_WIDTH = CUBE_SCENE_WIDTH;

const obstacles = Obstacle.create_obstacles(cube_scene);

const boat = new Boat(cube_scene, "./models/boat/boat.gltf", 0, -CUBE_SCENE_HEIGHT / 2 + 1.5 , CUBE_SCENE_DEPTH / 2 - CAMERA_POSITION_Z_3_PERSON);

function animate() {
  renderer.render(scene, camera);
  if (boat.model) {
    boat.move(keys);
    move_camera();
  }
  obstacles.forEach((obstacle) => {
    obstacle.move();
    if (boat.model && collision_objects(boat.model, obstacle.model))
        obstacle.collision();
  });
}

renderer.setAnimationLoop(animate);

document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
  switch (event.key) {
    case "w":
    case "ArrowUp": {
      keys.arrowUp = true;
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
      keys.space = keys.space ? false : true;
      break;
    }
  }
}

document.addEventListener("keyup", onDocumentKeyUp, false);

function onDocumentKeyUp(event) {
  switch (event.key) {
    case "w":
    case "ArrowUp": {
      keys.arrowUp = false;
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

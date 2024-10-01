import * as THREE from "three";
import Boat from "./elements_class/boat.js";

// variáveis para movimentação do barco e camera
const keys = {
  arrowUp: false,
  arrowDown: false,
  arrowRight: false,
  arrowLeft: false,
  space: false,
};

function move_camera() {
  let position_x = boat.model.position.x;
  let position_y = boat.model.position.y;
  let position_z = boat.model.position.z;
  if (keys.space) {
    position_y += 2;
    position_z += 5;
  }
  camera.position.set(position_x, position_y + 2, position_z + 7);
  camera.lookAt(position_x, position_y, position_z);
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

const CUBE_SCENE_WIDTH = 500;
const CUBE_SCENE_HEIGHT = 50;
const CUBE_SCENE_DEPTH = 500;

const cube_scene_geometry = new THREE.BoxGeometry(
  CUBE_SCENE_WIDTH,
  CUBE_SCENE_HEIGHT,
  CUBE_SCENE_DEPTH
);
const cube_scene = new THREE.Mesh(cube_scene_geometry, cube_scene_materials);
scene.add(cube_scene);

function make_random_pos_z() {
  return Math.random() * -(CUBE_SCENE_WIDTH / 2) + CUBE_SCENE_WIDTH /2  -1/2;
}

function make_random_size() {
  return Math.random() * 4 + 4;
}

function make_random_raio() {
  return Math.random() * 1 + 3;
}

function make_random_pos_x() {
  return Math.random() * (CUBE_SCENE_WIDTH - 1 / 2) - CUBE_SCENE_WIDTH / 2;
}

class Obstacle {
  static DEFALT_OBSTACLE_NUMBER = 200;
  constructor() {
    this.model = new THREE.Mesh(
      new THREE.SphereGeometry(
        make_random_raio(),
        make_random_size(),
        make_random_size()
      ),
      new THREE.MeshPhongMaterial({ color: 0xe3eef4 })
    );
    this.model.position.set(
      make_random_pos_x(),
      -CUBE_SCENE_HEIGHT / 2,
      make_random_pos_z()
    );
  }

  move() {
    this.model.position.z += 0.1;
    this.model.rotation.x += 0.01;
    this.model.rotation.y += 0.01;
    this.model.rotation.z += 0.01;

    if (this.model.position.z > CUBE_SCENE_DEPTH / 2 + 1 / 2) {
      this.model.position.x = make_random_pos_x();
      this.model.position.z = -CUBE_SCENE_DEPTH / 2;
      // this.model.position.z = make_random_pos_z() / 2
    }
  }

  static create_obstacles(number_of_obstacles = this.DEFALT_OBSTACLE_NUMBER) {
    const obstacles = [];
    for (let i = 0; i < number_of_obstacles; i++) {
      const obstacle = new Obstacle();
      obstacles.push(obstacle);
      cube_scene.add(obstacle.model);
    }
    return obstacles;
  }
}

const obstacles = Obstacle.create_obstacles();

const boat = new Boat(cube_scene, "./models/boat/boat.gltf", 0, -24.28, 244.28);

function animate() {
  renderer.render(scene, camera);
  if (boat.model) {
    boat.move(keys);
    move_camera();
  }
  obstacles.forEach((obstacle) => {
    obstacle.move();
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
    // case "s":
    // case "ArrowDown": {
    //     keys.arrowDown = true;
    //     break;
    // }
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
    // case "s":
    // case "ArrowDown": {
    //     keys.arrowDown = false;
    //     break;
    // }
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

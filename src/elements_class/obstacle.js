import * as THREE from "three";


function make_random_pos_z() {
    return Math.random() * -(Obstacle.SCENE_DEPTH / 2) + Obstacle.SCENE_DEPTH / 2 - 1 / 2;
}

function make_random_size() {
    return Math.random() * 4 + 4;
}

const MINIMUM_RADIUS_SIZE = 5;
const MULTIPLE_TO_SET_THE_RANGE = 1;

function make_random_raio() {
    return Math.random() * MULTIPLE_TO_SET_THE_RANGE + MINIMUM_RADIUS_SIZE;
}

function make_random_pos_x() {
    return Math.random() * (Obstacle.SCENE_WIDTH - 1 / 2) - Obstacle.SCENE_WIDTH / 2;
}

class Obstacle {
    static DEFALT_OBSTACLE_NUMBER = 200;
    static SCENE_WIDTH = 0;
    static SCENE_HEIGHT = 0;
    static SCENE_DEPTH = 0;
  
    constructor() {
      this.radius =  make_random_raio();
      this.model = new THREE.Mesh(
        new THREE.SphereGeometry(
         this.radius,
          make_random_size(),
          make_random_size()
        ),
        new THREE.MeshPhongMaterial({ color: 0xe3eef4 })
      );
      this.model.position.set(
        make_random_pos_x(),
        -Obstacle.SCENE_HEIGHT / 2,
        make_random_pos_z()
      );
    }
  
    move(move) {

      if (move.arrowUp){
          this.model.position.z += 0.2;
      }

      if(move.arrowLeft)
            this.model.position.x += 0.01;

      if(move.arrowRight)
        this.model.position.x -= 0.01;

      this.model.position.z += 0.1;

      this.model.rotation.x += 0.01;
      this.model.rotation.y += 0.01;
      this.model.rotation.z += 0.01;
  
      if (this.model.position.z > Obstacle.SCENE_DEPTH / 2 + 1 / 2) {
        this.model.position.x = make_random_pos_x();
        this.model.position.z = make_random_pos_z();
      }
    }
  
    collision() {
      this.model.position.x = make_random_pos_x();
      this.model.position.z = -Obstacle.SCENE_DEPTH / 2;
    }
  
    static create_obstacles(scene ,number_of_obstacles = this.DEFALT_OBSTACLE_NUMBER) {
      const obstacles = [];
      for (let i = 0; i < number_of_obstacles; i++) {
        const obstacle = new Obstacle();
        obstacles.push(obstacle);
        scene.add(obstacle.model);
      }
      return obstacles;
    }
  }

export default Obstacle
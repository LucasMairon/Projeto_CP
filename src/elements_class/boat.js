import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const UPPER_LIMIT_ROTATE_Z = Math.PI / 4;
const LOWER_LIMIT_ROTATE_Z = -(Math.PI / 4);

export class Boat {
  constructor(
    scene,
    model_path,
    initial_pos_x = 0,
    initial_pos_y = 0,
    initial_pos_z = 0
  ) {
    this.initial_pos_x = initial_pos_x;
    this.initial_pos_y = initial_pos_y;
    this.initial_pos_z = initial_pos_z;
    this.scene = scene;
    this.model_path = model_path;
    this.model = null;
    this.load(this);
  }

  load(object) {
    // Instancia um loader do gltf
    const loader = new GLTFLoader();

    // Carrega um GLTF
    loader.load(
      // URL do modelo
      this.model_path,
      // Funcao chamada quando o modelo é carregado com sucesso
      function (gltf) {
        object.scene.add(gltf.scene);
        object.model = gltf.scene.children[0];
        object.model.position.set(
          object.initial_pos_x,
          object.initial_pos_y,
          object.initial_pos_z
        );
        object.model.castShadow = true
        object.model.receiveShadow = true
        // Object.model.material.side = THREE.BackSide;
      },
      // Funcao chamada enquanto o modelo esta carregando
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // Funcao chamada quando ocorre erros no carregamento do modelo
      function (error) {
        console.log("An error happened");
      }
    );
  }

  move(move) {
    if (this.model.rotation.z > 0.2) this.model.position.x -= 0.1;
    else if (this.model.rotation.z < -0.2) this.model.position.x += 0.1;

    if (move.arrowRight)
      if (this.model.rotation.z > LOWER_LIMIT_ROTATE_Z)
        this.model.rotation.z -= 0.01;

    if (move.arrowLeft)
      if (this.model.rotation.z < UPPER_LIMIT_ROTATE_Z)
        this.model.rotation.z += 0.01;
  }
}

export default Boat;

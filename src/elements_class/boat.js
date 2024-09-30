import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const UPPER_LIMIT_ROTATE_Z = (Math.PI / 2);
const LOWER_LIMIT_ROTATE_Z = -(Math.PI / 2);

export class Boat{
    constructor(scene, model_path){
        this.scene = scene;
        this.model_path = model_path
        this.model = null
        this.load(this);
    }

    load(object){
        // Instancia um loader do gltf
        const loader = new GLTFLoader();

        // Carrega um GLTF
        loader.load(
            // URL do modelo
            this.model_path,
            // Funcao chamada quando o modelo é carregado com sucesso
            function ( gltf ) {
                object.scene.add( gltf.scene );
                object.model = gltf.scene.children[0];
            },
            // Funcao chamada enquanto o modelo esta carregando
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // Funcao chamada quando ocorre erros no carregamento do modelo
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
    }

    move(move){
        if (move.arrowUp){
            this.model.position.z -= 0.1;
            if(this.model.rotation.z > 0.2)
                this.model.position.x -= 0.1;
            else if(this.model.rotation.z < -0.2)
                this.model.position.x += 0.1;
        }

        if(move.arrowDown)
            this.model.position.z += 0.1;

        if(move.arrowRight){
            this.model.position.x += 0.1;
            if(this.model.rotation.z > LOWER_LIMIT_ROTATE_Z)
                this.model.rotation.z -= 0.01;
        }

        if(move.arrowLeft){
            this.model.position.x -= 0.1;
            if(this.model.rotation.z < UPPER_LIMIT_ROTATE_Z)
                this.model.rotation.z += 0.01;
        }
    }
}

export default Boat;

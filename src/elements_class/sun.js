import * as THREE from "three";

const DEFAULT_SUN_RADIUS = 20;
const DEFAULT_SUN_WIDTH_SEGMENTS = 10;
const DEFAULT_SUN_HEIGHT_SEGMENTS = 10;

let cicles = 0;

const texture_load = new THREE.TextureLoader();

class Sun{

    static SCENE_WIDTH
    static SCENE_HEIGHT

    load_texture(path){
        this.model = new THREE.Mesh(
            new THREE.SphereGeometry(DEFAULT_SUN_RADIUS, DEFAULT_SUN_WIDTH_SEGMENTS, DEFAULT_SUN_HEIGHT_SEGMENTS),
            new THREE.MeshBasicMaterial(
                {map: texture_load.load(path)}
            )
        )
    }

    create_ambient_light(){
        const ambient_light = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambient_light);
        return ambient_light;
    }

    create_sun_light(){
        const sun_light = new THREE.DirectionalLight(0xffffff, 1);
        sun_light.castShadow = true;
        this.scene.add(sun_light);
        return sun_light;
    }

    update_light(ambient_intensity, sun_intensity){
        this.ambient_light.intensity = ambient_intensity;
        this.sun_light.intensity = sun_intensity;
    }

    constructor(scene, radius_x, radius_y){
        this.scene = scene;
        this.radius_x = radius_x;
        this.radius_y = radius_y;
        this.cicles = 0;
        this.angle = 0;
        this.model = null;
        this.sun_light = this.create_sun_light();
        this.ambient_light = this.create_ambient_light();
        this.load_texture('./texture/sun_texture.jpg');
        this.scene.add(this.model);
    }

    rotate(){
        if(this.cicles != cicles){
            cicles = this.cicles;
            if(this.cicles % 2 == 0){
                this.update_light(1, 1)
                this.load_texture('./texture/sun_texture.jpg')
                this.scene.add(this.model)
            }else{
                this.update_light(0.4, 0.6)
                this.load_texture('./texture/moon_texture.jpg')
                this.scene.add(this.model)
            }
        }
        this.model.position.x = this.radius_x * Math.cos(this.angle);
        this.model.position.y = this.radius_y * Math.sin(this.angle);
        this.sun_light.position.set(this.model.position.x, this.model.position.y, this.model.position.z)

        if(this.model.position.x < -(Sun.SCENE_WIDTH / 1.9)){
            this.angle = 0;
            this.cicles += 1;
        }
        this.angle += 0.005;
    }
}

export default Sun
import {ResourceLoader} from "curbl-loader";
import {ViewerScene} from "./ViewerScene";
import {GLTFLoader} from "../../loader/GLTFLoader";
import {ECS} from "curbl-ecs";
import {CameraComponent, LookAtCameraComponent, SceneComponent, TransformComponent} from "../../components";
import {Cache, CACHE_TYPE} from "../../cache";
import {Mesh} from "../../scene";
import {AnimationComponent} from "../../components/scene/animationComponent";

export class BusterDroneScene extends ViewerScene {

    private cache: Cache;

    constructor(loader: ResourceLoader, cache: Cache) {
        super(loader);
        this.loader = loader;
        this.cache = cache;
    }

    private createModellEntity() {
        const entity = ECS.createEntity();
        entity.add(new SceneComponent({key: "defaultScene"}));
        entity.add(new TransformComponent({
            position: {x:0, y:0, z:0},
            rotation: {x:0, y:0, z:0, w:1},
            scale: {x:5, y:5, z:5}
        }));
        entity.add(new AnimationComponent({key: "BusterDrone"}));
        ECS.addEntity(entity);
    }

    private createCameraEntity() {
        const entity = ECS.createEntity();
        entity.add(new CameraComponent());
        entity.add(new TransformComponent({
            position: {x:0,y:0,z:-4.00},
            rotation: {x:0,y:0,z:0,w:1},
            scale: {x:1,y:1,z:1}
        }));
        entity.add(new LookAtCameraComponent({
            aspect: (1920/1080),
            fov: 45.0 * Math.PI / 180.0,
            near: 0.01,
            far: 100.0
        }));
        ECS.addEntity(entity);
    }

    getMesh(): Mesh {
        return this.cache.get(CACHE_TYPE.MESH,"mesh_L_P4_17366L_P4"); //TODO
    }

    preload(): void {
        this.loader.get(GLTFLoader).add(
            "BusterDrone",
            "../assets/buster_drone/scene.gltf",
            "../assets/buster_drone/busterDrone.bin"
        );
    }

    create() {
        this.createCameraEntity();
        this.createModellEntity();
    }
}

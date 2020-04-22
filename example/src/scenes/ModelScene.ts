import {
    AnimationComponent,
    CACHE_TYPE,
    GLTFLoader,
    KhronosPbrShader,
    Scene,
    SceneComponent,
    SceneConfig,
    TransformComponent,
    WorldScene,
} from '../../../lib';
import { ECS } from '@curbl/ecs';

export interface ModelSceneConfig extends SceneConfig {
    gltfJson: string;
    gltfBin: string;
    shader: KhronosPbrShader;
}

export class ModelScene extends WorldScene {
    private gltfJson: string;
    private gltfBin: string;
    private shader: KhronosPbrShader;

    constructor(config: ModelSceneConfig) {
        super(config);
        this.gltfJson = config.gltfJson;
        this.gltfBin = config.gltfBin;
        this.shader = config.shader;
    }

    preload(): void {
        this.loader.get(GLTFLoader).add('ExampleScene', this.gltfJson, this.gltfBin);
    }

    create(): void {
        const sceneObj = this.cache.get<Scene>(CACHE_TYPE.SCENE, 'ExampleScene');

        this.shader.unload();
        this.shader.initializeDefines(sceneObj.meshes[0]);
        this.shader.upload();

        const scene = ECS.createEntity();
        scene.add(new SceneComponent({ key: 'ExampleScene' }));
        scene.add(
            new TransformComponent({
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0, w: 1 },
                scale: { x: 1, y: 1, z: 1 },
            })
        );
        if (sceneObj.animations[0]) {
            const animationKey = sceneObj.animations[0].name;
            scene.add(new AnimationComponent({ key: animationKey }));
        }
        this.add(scene);
    }

    shutdown(): void {}

    update(): void {}
}

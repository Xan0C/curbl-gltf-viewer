import { Viewer } from '../../lib/viewer';
import { EnvironmentScene } from './scenes/EnvironmentScene';
import { ModelScene } from './scenes/ModelScene';
import { GUIComponent } from '../../lib/components/gui';
import { ECS, Entity } from '@curbl/ecs';
import { CameraComponent, LookAtCameraComponent } from '../../lib/components/camera';
import { TransformComponent } from '../../lib/components/transform';
import { mat4 } from 'gl-matrix';

const sampleModels = {
    BoxAnimated: {
        gltfJson: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF/BoxAnimated.gltf',
        gltfBin: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF/BoxAnimated0.bin',
    },
    RiggedSimple: {
        gltfJson: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF/RiggedSimple.gltf',
        gltfBin: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF/RiggedSimple0.bin',
    },
    BrainStem: {
        gltfJson: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem.gltf',
        gltfBin: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem0.bin',
    },
    WaterBottle: {
        gltfJson: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF/WaterBottle.gltf',
        gltfBin: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF/WaterBottle.bin',
    },
    Sponza: {
        gltfJson: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.gltf',
        gltfBin: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.bin',
    },
    DamagedHelmet: {
        gltfJson: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf',
        gltfBin: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.bin',
    },
    MetalRoughSpheres: {
        gltfJson:
            'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf',
        gltfBin:
            'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres0.bin',
    },
};

export class Example {
    private camera: Entity;
    private viewer: Viewer;
    private scene: string;

    constructor() {
        this.scene = 'DamagedHelmet';
        this.viewer = new Viewer({ width: window.innerWidth, height: window.innerHeight });
        this.viewer.init(() => this.init());
    }

    private init() {
        this.createSceneSelector();
        this.createCamera();

        this.viewer.world.addScene(new EnvironmentScene({ name: 'Environment' }));

        this.viewer.world.addScene(
            new ModelScene({
                name: 'ModelScene',
                gltfJson: sampleModels[this.scene].gltfJson,
                gltfBin: sampleModels[this.scene].gltfBin,
                shader: this.viewer.shader,
            })
        );

        this.viewer.world.start('Environment');
        this.viewer.world.start('ModelScene');
    }

    private reloadModelScene() {
        this.viewer.loader.stop();
        this.viewer.world.removeScene('ModelScene');

        this.viewer.world.addScene(
            new ModelScene({
                name: 'ModelScene',
                gltfJson: sampleModels[this.scene].gltfJson,
                gltfBin: sampleModels[this.scene].gltfBin,
                shader: this.viewer.shader,
            })
        );

        this.viewer.world.start('ModelScene');
    }

    private createCamera() {
        this.camera = ECS.createEntity();
        this.camera.add(
            new CameraComponent({
                aspect: window.innerWidth / window.innerHeight,
                fovy: (45.0 * Math.PI) / 180.0,
                near: 0.01,
                far: 100.0,
            })
        );
        this.camera.add(
            new TransformComponent({
                position: { x: 0, y: 0, z: -4.0 },
                rotation: { x: 0, y: 0, z: 0, w: 1 },
                scale: { x: 1, y: 1, z: 1 },
            })
        );
        this.camera.add(new LookAtCameraComponent());
        ECS.addEntity(this.camera);

        window.addEventListener('resize', () => this.onResize());
    }

    private onResize() {
        if (this.camera) {
            mat4.perspective(
                this.camera.get(CameraComponent).projMatrix,
                (45.0 * Math.PI) / 180.0,
                window.innerWidth / window.innerHeight,
                0.01,
                100
            );
        }
    }

    private createSceneSelector() {
        const entity = ECS.createEntity();
        entity.add(
            new GUIComponent({
                properties: [
                    {
                        prop: this,
                        propName: 'scene',
                        items: Object.keys(sampleModels),
                        onChange: () => this.reloadModelScene(),
                    },
                ],
            })
        );
        ECS.addEntity(entity);
    }
}

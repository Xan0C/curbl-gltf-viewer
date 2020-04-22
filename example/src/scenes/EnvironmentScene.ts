import { WorldScene, CubemapLoader, GLOBAL_TEXTURES, LightComponent, GUIComponent, TextureLoader } from '../../../lib';
import { ECS } from '@curbl/ecs';
import { GL_INTERNALFORMAT, GL_TYPES, MAG_FILTER, MIN_FILTER, TEXTURE_WRAP } from '@curbl/gl-util';

export class EnvironmentScene extends WorldScene {
    preload(): void {
        this.loader.get(CubemapLoader).add(GLOBAL_TEXTURES.SKYBOX, [
            {
                right: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/environment/environment_right_0.jpg',
                left: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/environment/environment_left_0.jpg',
                top: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/environment/environment_top_0.jpg',
                bottom: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/environment/environment_bottom_0.jpg',
                front: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/environment/environment_front_0.jpg',
                back: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/environment/environment_back_0.jpg',
            },
        ]);

        this.loader.get(CubemapLoader).add(
            GLOBAL_TEXTURES.DIFFUSE_ENVIRONMENT,
            [
                {
                    right: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/diffuse/diffuse_right_0.jpg',
                    left: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/diffuse/diffuse_left_0.jpg',
                    top: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/diffuse/diffuse_top_0.jpg',
                    bottom: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/diffuse/diffuse_bottom_0.jpg',
                    front: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/diffuse/diffuse_front_0.jpg',
                    back: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/diffuse/diffuse_back_0.jpg',
                },
            ],
            {
                premultiplyAlpha: false,
                internalFormat: GL_INTERNALFORMAT.SRGB8_ALPHA8,
                format: GL_INTERNALFORMAT.RGBA,
                type: GL_TYPES.UNSIGNED_BYTE,
            }
        );

        const specularMaps = [];
        for (let i = 0; i < 10; i++) {
            specularMaps.push({
                right: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/specular/specular_right_' + i + '.jpg',
                left: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/specular/specular_left_' + i + '.jpg',
                top: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/specular/specular_top_' + i + '.jpg',
                bottom:
                    'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/specular/specular_bottom_' + i + '.jpg',
                front: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/specular/specular_front_' + i + '.jpg',
                back: 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/specular/specular_back_' + i + '.jpg',
            });
        }

        this.loader.get(CubemapLoader).add(GLOBAL_TEXTURES.SPECULAR_ENVIRONMENT, specularMaps, {
            premultiplyAlpha: false,
            internalFormat: GL_INTERNALFORMAT.SRGB8_ALPHA8,
            format: GL_INTERNALFORMAT.RGBA,
            type: GL_TYPES.UNSIGNED_BYTE,
        });

        this.loader
            .get(TextureLoader)
            .add(GLOBAL_TEXTURES.BRDF_LUT, 'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/ibl/brdfLUT.png', {
                premultiplyAlpha: false,
                internalFormat: GL_INTERNALFORMAT.SRGB8_ALPHA8,
                format: GL_INTERNALFORMAT.RGBA,
                type: GL_TYPES.UNSIGNED_BYTE,
                sampler: {
                    magFilter: MAG_FILTER.LINEAR,
                    minFilter: MIN_FILTER.LINEAR,
                    wrapS: TEXTURE_WRAP.CLAMP_TO_EDGE,
                    wrapT: TEXTURE_WRAP.CLAMP_TO_EDGE,
                },
            });
    }

    create(): void {
        const entity = ECS.createEntity();
        const lightComponent = new LightComponent({
            lightColor: [255, 255, 255],
            lightScale: 1.0,
            lightRotation: 75,
            lightPitch: 40,
        });
        entity.add(lightComponent);
        entity.add(
            new GUIComponent({
                folder: 'Directional Light',
                properties: [
                    {
                        prop: lightComponent,
                        propName: 'lightColor',
                        isColor: true,
                        onChange: () => lightComponent.updateLight(),
                    },
                    {
                        prop: lightComponent,
                        propName: 'lightScale',
                        min: 0,
                        max: 10,
                        onChange: () => lightComponent.updateLight(),
                    },
                    {
                        prop: lightComponent,
                        propName: 'lightRotation',
                        min: 0,
                        max: 360,
                        onChange: () => lightComponent.updateLight(),
                    },
                    {
                        prop: lightComponent,
                        propName: 'lightPitch',
                        min: -90,
                        max: 90,
                        onChange: () => lightComponent.updateLight(),
                    },
                ],
            })
        );
        this.add(entity);
    }

    shutdown(): void {}

    update(): void {}
}

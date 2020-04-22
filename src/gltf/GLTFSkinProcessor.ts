import { GLTFModel } from './GLTFModel';
import { Skin } from '../scene/skin/skin';
import { mat4 } from 'gl-matrix';

export class GLTFSkinProcessor {
    private model: GLTFModel;
    private skins: Array<Skin>;

    constructor(model: GLTFModel) {
        this.model = model;
        this.skins = [];
    }

    processSkin(idx: number): Skin {
        if (this.skins[idx]) {
            return this.skins[idx];
        }

        const skin = new Skin();
        const gltf = this.model.gltf;
        const gltfSkin = gltf.skins[idx];
        const accessor = gltf.accessors[gltfSkin.inverseBindMatrices];

        if (gltfSkin.skeleton !== undefined && gltfSkin.skeleton !== null) {
            skin.skeleton = this.model.getNode(gltfSkin.skeleton);
        }

        for (let i = 0; i < gltfSkin.joints.length; i++) {
            skin.joints.push(this.model.getNode(gltfSkin.joints[i]));
        }

        if (accessor) {
            const inverseBindMatrices = this.model.getAccessorData(accessor);

            for (let i = 0; i < inverseBindMatrices.length; i += 16) {
                skin.inverseBindMatrices.push(
                    mat4.fromValues(
                        inverseBindMatrices[i],
                        inverseBindMatrices[i + 1],
                        inverseBindMatrices[i + 2],
                        inverseBindMatrices[i + 3],
                        inverseBindMatrices[i + 4],
                        inverseBindMatrices[i + 5],
                        inverseBindMatrices[i + 6],
                        inverseBindMatrices[i + 7],
                        inverseBindMatrices[i + 8],
                        inverseBindMatrices[i + 9],
                        inverseBindMatrices[i + 10],
                        inverseBindMatrices[i + 11],
                        inverseBindMatrices[i + 12],
                        inverseBindMatrices[i + 13],
                        inverseBindMatrices[i + 14],
                        inverseBindMatrices[i + 15]
                    )
                );
            }
        }

        this.skins[idx] = skin;
        return skin;
    }
}

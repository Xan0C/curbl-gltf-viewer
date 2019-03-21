import {GLTFModel} from "./GLTFModel";
import {Skin} from "../model/skin/skin";
import {mat4} from "gl-matrix";

export class GLTFSkinProcessor {
    private model: GLTFModel;
    private _skins: Array<Skin>;

    constructor(model: GLTFModel) {
        this.model = model;
        this._skins = [];
    }

    processSkin(idx:number): Skin {
        if(this._skins[idx]) {
            return this._skins[idx];
        }

        const skin = new Skin();
        const gltf = this.model.gltf;
        const gltfSkin = gltf.skins[idx];

        if(gltfSkin.skeleton !== undefined && gltfSkin.skeleton !== null) {
            skin.skeleton = this.model.getNode(gltfSkin.skeleton).transform;
        }

        for(let i=0; i < gltfSkin.joints.length; i++) {
            skin.joints.push(this.model.getNode(gltfSkin.joints[i]).transform);
        }

        if(gltf.accessors[gltfSkin.inverseBindMatrices]) {
            const inverseBindMatrices = this.model.getAccessor(gltfSkin.inverseBindMatrices).getData();

            for(let i=0; i < inverseBindMatrices.length; i+=16) {
                skin.inverseBindMatrices.push(mat4.fromValues(
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
                ));
            }
        }

        this._skins[idx] = skin;
        return skin;
    }

    get skins(): Array<Skin> {
        return this._skins;
    }

    set skins(value: Array<Skin>) {
        this._skins = value;
    }
}
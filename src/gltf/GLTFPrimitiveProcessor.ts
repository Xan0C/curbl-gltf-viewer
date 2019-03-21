import {Primitive} from "../model";
import {IGLTF_Primitive} from "./model";
import {GLTFModel} from "./GLTFModel";

export class GLTFPrimitiveProcessor {

    private model: GLTFModel;
    private _primitives:Array<Primitive>;

    constructor(model: GLTFModel) {
        this.model = model;
        this._primitives = [];
    }
    /**
     * creates a new mesh/GLTF_Primitive for the gltf
     * @param {IGLTF_Primitive} gltfPrimitive
     */
    processPrimitive(gltfPrimitive:IGLTF_Primitive):Primitive{
        const primitive = new Primitive();

        for(let id in gltfPrimitive.attributes){
            primitive.attributes[id] = this.model.getAccessor(gltfPrimitive.attributes[id]);
        }

        if(gltfPrimitive.indices !== undefined && gltfPrimitive.indices !== null) {
            primitive.indices = this.model.getAccessor(gltfPrimitive.indices, true);
        }

        primitive.draw_mode = gltfPrimitive.mode||4; //Default GL_TRIANGLE
        primitive.material = this.getPrimitiveMaterial(gltfPrimitive.material);

        //TODO: morph targets primitive.targets
        this._primitives.push(primitive);
        return primitive;
    }

    /**
     * sets the name of the material used for the mesh if any
     * else its set to the "__default__" material
     * @param {number} materialIdx
     */
    private getPrimitiveMaterial(materialIdx?:number): string {
        if(materialIdx === undefined || materialIdx === null){
            return '__default__';
        }
        return this.model.getMaterial(materialIdx).name;
    }

    get primitives(): Array<Primitive> {
        return this._primitives;
    }

    set primitives(value: Array<Primitive>) {
        this._primitives = value;
    }
}
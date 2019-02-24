import {Mesh, Primitive} from "../scene";
import {IGLTF_Model, IGLTF_Primitive} from "./model";
import {GLTF_ACCESORTYPE_SIZE} from "./GLTFParser";
import {Buffermap} from "../scene/data/buffermap";
import {GLTFBuffer} from "./GLTFBuffer";


export class GLTFMeshProcessor {

    private gltfModel:IGLTF_Model;
    private buffer: GLTFBuffer;

    constructor(gltfModel:IGLTF_Model, buffer: GLTFBuffer) {
        this.gltfModel = gltfModel;
        this.buffer = buffer;
    }

    /**
     * Parse the GLTF_Primitive/Primitive at the given meshIdx
     * each Primitive is a set of primitives and all primitives form one Mesh
     * @param {ScneneNode} node
     * @param {Mesh} model
     * @param {number} meshIdx
     */
    processMesh(meshIdx?:number): Mesh {
        if(meshIdx === undefined || meshIdx === null){
            return;
        }
        const mesh = this.gltfModel.meshes[meshIdx];

        if(mesh !== undefined && mesh !== null){
            const sceneMesh = new Mesh();
            sceneMesh.name = mesh.name;
            //Parse each primitive
            for(let i=0, primitive:IGLTF_Primitive; primitive = mesh.primitives[i]; i++){
                sceneMesh.addPrimitive(this.parsePrimitives(sceneMesh.buffer, primitive));
            }

            return sceneMesh;
        }
    }

    /**
     * creates a new mesh/GLTF_Primitive for the model
     * @param {Mesh} model
     * @param {IGLTF_Primitive} gltfPrimitive
     */
    private parsePrimitives(buffermap: Buffermap, gltfPrimitive:IGLTF_Primitive):Primitive{
        const primitive = new Primitive();
        //Add attributes to mesh
        for(let id in gltfPrimitive.attributes){
            //Create BufferView for each Accessor/GLBuffer for Position,Normal,tex,tangent etc. and map the accessor bufferViewIdx new
            this.buffer.mapBufferViewToMap(
                buffermap,
                this.gltfModel.accessors[gltfPrimitive.attributes[id]]
            );
            this.addAttribute(primitive,id,gltfPrimitive.attributes[id]);
        }
        //Set indices for indexBuffer
        if(gltfPrimitive.indices !== undefined && gltfPrimitive.indices !== null) {
            //Create BufferView for each IndexBuffer and map the accessor bufferViewIdx new
            this.buffer.mapBufferViewToMap(
                buffermap,
                this.gltfModel.accessors[gltfPrimitive.indices],
                true
            );
            this.setIndices(primitive,gltfPrimitive.indices);
        }
        primitive.draw_mode = gltfPrimitive.mode||4; //Default GL_TRIANGLE
        //Set the Material for the mesh if any else its default
        this.setMeshMaterial(primitive,gltfPrimitive.material);
        //TODO: morph targets primitive.targets
        return primitive;
    }

    /**
     * Adds an attribute to the primitive of type
     * POSITION,NORMAL,TANGENT,TEXCOORD0,TEXCOORD1,COLOR0,JOINTS0,WEIGHTS0
     * @param {Primitive} primitive
     * @param {string} id
     * @param {number} accessorIdx
     */
    private addAttribute(primitive:Primitive, id:string, accessorIdx:number):void{
        const accessor = this.gltfModel.accessors[accessorIdx];
        const componentTypeCount = GLTF_ACCESORTYPE_SIZE[accessor.type]; //get typeSize
        const view = this.gltfModel.bufferViews[accessor.bufferView];
        primitive.addAttribute(
            id,
            componentTypeCount,
            accessor.componentType,
            accessor.normalized,
            view.byteStride||0,
            accessor.byteOffset,
            accessor.bufferView
        );
    }

    /**
     * sets the name of the material used for the mesh if any
     * else its set to the "__default__" material
     * @param {Primitive} mesh
     * @param {number} materialIdx
     */
    private setMeshMaterial(mesh:Primitive,materialIdx?:number):void{
        if(materialIdx === undefined || materialIdx === null){
            return;
        }
        const material = this.gltfModel.materials[materialIdx];
        if(material) {
            mesh.material = material.name;
        }
    }

    /**
     * set the index accessor
     * @param {Primitive} mesh
     * @param {number} accessorIdx
     */
    private setIndices(mesh:Primitive, accessorIdx:number):void{
        const indices = this.gltfModel.accessors[accessorIdx];
        mesh.setIndices(indices.count, indices.componentType, indices.byteOffset||0, indices.bufferView);
    }
}

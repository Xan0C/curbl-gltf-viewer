import {Mesh, Primitive} from "../scene";
import {IGLTF_Accessor, IGLTF_Primitive} from "./model";
import {GLTFModel} from "./GLTFModel";
import {IBaseCache} from "../cache/caches";
import {CACHE_TYPE} from "../cache";


export class GLTFMeshProcessor {

    private model: GLTFModel;
    private meshes:Array<Mesh>;
    private cache:IBaseCache<Mesh>;

    constructor(model: GLTFModel) {
        this.model = model;
        this.meshes = [];
        this.cache = this.model.cache.getCache(CACHE_TYPE.MESH);
    }

    processMesh(idx:number): Mesh {
        if(this.meshes[idx]) {
            return this.meshes[idx];
        }

        const sceneMesh = new Mesh();
        const mesh = this.model.gltf.meshes[idx];
        sceneMesh.name = mesh.name||"mesh"+idx;

        for(let i=0, primitive:IGLTF_Primitive; primitive = mesh.primitives[i]; i++){
            sceneMesh.addPrimitive(this.parsePrimitives(sceneMesh, primitive));
        }

        this.meshes[idx] = sceneMesh;
        this.cache.add(sceneMesh.name, sceneMesh);
        return sceneMesh;
    }

    /**
     * creates a new mesh/GLTF_Primitive for the gltf
     * @param {IGLTF_Primitive} gltfPrimitive
     */
    private parsePrimitives(mesh: Mesh, gltfPrimitive:IGLTF_Primitive):Primitive{
        const gltf = this.model.gltf;
        const primitive = new Primitive();
        //Add attributes to mesh
        for(let id in gltfPrimitive.attributes){
            //Create BufferView for each Accessor/GLBuffer for Position,Normal,tex,tangent etc. and map the accessor bufferViewIdx new
            const accessor = gltf.accessors[gltfPrimitive.attributes[id]];
            this.addAttribute(primitive, id, accessor);
            mesh.addBufferView(accessor.bufferView, this.model.getBufferView(accessor.bufferView));
        }
        //Set indices for indexBuffer
        if(gltfPrimitive.indices !== undefined && gltfPrimitive.indices !== null) {
            //Create BufferView for each IndexBuffer and map the accessor bufferViewIdx new
            const accessor = gltf.accessors[gltfPrimitive.indices];
            this.setIndices(primitive, accessor);
            mesh.addBufferView(accessor.bufferView, this.model.getBufferView(accessor.bufferView, true));
        }
        primitive.draw_mode = gltfPrimitive.mode||4; //Default GL_TRIANGLE
        //Set the Material name for the mesh
        this.setMeshMaterial(primitive,gltfPrimitive.material);

        //TODO: morph targets primitive.targets
        return primitive;
    }

    /**
     * Adds an attribute to the primitive of type
     * POSITION,NORMAL,TANGENT,TEXCOORD0,TEXCOORD1,COLOR0,JOINTS0,WEIGHTS0
     * @param {Primitive} primitive
     * @param {string} id
     * @param {IGLTF_Accessor} accessor
     */
    private addAttribute(primitive:Primitive, id:string, accessor:IGLTF_Accessor):void {
        const gltf = this.model.gltf;
        const view = gltf.bufferViews[accessor.bufferView];

        primitive.addAttribute(
            id,
            accessor.type,
            accessor.componentType,
            accessor.normalized,
            view.byteStride||0,
            accessor.byteOffset,
            accessor.bufferView,
            accessor.min,
            accessor.max
        );
    }

    /**
     * sets the name of the material used for the mesh if any
     * else its set to the "__default__" material
     * @param {Primitive} mesh
     * @param {number} materialIdx
     */
    private setMeshMaterial(mesh:Primitive,materialIdx?:number):void {
        if(materialIdx === undefined || materialIdx === null){
            mesh.material = '__default__';
            return;
        }
        mesh.material = this.model.getMaterial(materialIdx).name;
    }

    /**
     * set the index accessor
     * @param {Primitive} primitive
     * @param {IGLTF_Accessor} indices
     */
    private setIndices(primitive:Primitive, indices:IGLTF_Accessor):void{
        primitive.setIndices(indices.count, indices.componentType, indices.byteOffset||0, indices.bufferView);
    }
}

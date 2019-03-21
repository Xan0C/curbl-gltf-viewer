import {Mesh} from "../model";
import {IGLTF_Primitive} from "./model";
import {GLTFModel} from "./GLTFModel";
import {IBaseCache} from "../cache/caches";
import {CACHE_TYPE} from "../cache";


export class GLTFMeshProcessor {

    private model: GLTFModel;
    private _meshes:Array<Mesh>;
    private cache:IBaseCache<Mesh>;

    constructor(model: GLTFModel) {
        this.model = model;
        this._meshes = [];
        this.cache = this.model.cache.getCache(CACHE_TYPE.MESH);
    }

    processMesh(idx:number): Mesh {
        if(this._meshes[idx]) {
            return this._meshes[idx];
        }

        const sceneMesh = new Mesh();
        const mesh = this.model.gltf.meshes[idx];
        sceneMesh.name = mesh.name||"mesh"+idx;

        for(let i=0, primitive:IGLTF_Primitive; primitive = mesh.primitives[i]; i++){
            sceneMesh.primitives.push(this.model.getPrimitive(primitive));
        }

        this._meshes[idx] = sceneMesh;
        this.cache.add(sceneMesh.name, sceneMesh);
        return sceneMesh;
    }

    get meshes(): Array<Mesh> {
        return this._meshes;
    }

    set meshes(value: Array<Mesh>) {
        this._meshes = value;
    }
}

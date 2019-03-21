import {ResourceLoader} from "curbl-loader";
import {IGLTF_Model} from "./model";
import {Cache} from "../cache";
import {Model} from "../model/model";
import {GLTFModel} from "./GLTFModel";
import {Base64Binary} from "./Base64Binary";

/**
 * Parse the GLTF_Json
 */
export class GLTF_Parser {

    private gl:WebGL2RenderingContext;
    private loader:ResourceLoader;
    private _path:string;
    private cache:Cache;

    constructor(loader:ResourceLoader,gl:WebGL2RenderingContext, cache: Cache) {
        this._path = '';
        this.loader = loader;
        this.gl = gl;
        this.cache = cache;
    }

    /**
     *
     * @param {ArrayBuffer} buffer - gltf data(vertices,indices)
     * @param {IGLTF_Model} gltf_model - json object in gltf format
     * @returns {Mesh}
     */
    public parse(gltf_model:IGLTF_Model, buffer?:ArrayBuffer): Model {
        const buffers = [];
        if(!buffer) {
            buffers.push(...this.parseBuffers(gltf_model));
        } else {
            buffers.push(buffer);
        }

        return new GLTFModel(gltf_model, buffers, {
            path: this._path,
            gl: this.gl,
            cache: this.cache,
            loader: this.loader
        }).process();
    }

    private parseBuffers(gltfModel:IGLTF_Model):Array<ArrayBuffer> {
        const buffers = [];
        for(let i=0; i < gltfModel.buffers.length; i++) {
            const gltfBuffer = gltfModel.buffers[i];
            const buffer = Base64Binary.decode(gltfBuffer.uri, gltfBuffer.byteLength);
            buffers.push(buffer);
        }
        return buffers;
    }

    public get path():string {
        return this._path;
    }

    public set path(value:string) {
        this._path = value;
    }
}
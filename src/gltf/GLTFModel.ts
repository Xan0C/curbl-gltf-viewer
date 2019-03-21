import {IGLTF_Model, IGLTF_Primitive} from "./model";
import {Accessor, BufferView, Mesh, Primitive, Model} from "../model";
import {Cache} from "../cache";
import {ResourceLoader} from "curbl-loader";
import {GLTFMaterialProcessor} from "./GLTFMaterialProcessor";
import {GLTFMeshProcessor} from "./GLTFMeshProcessor";
import {GLTFNode, GLTFNodeProcessor} from "./GLTFNodeProcessor";
import {Skin} from "../model/skin/skin";
import {GLTFAccessorProcessor} from "./GLTFAccessorProcessor";
import {Material} from "../material";
import {GLTFSkinProcessor} from "./GLTFSkinProcessor";
import {GLTFAnimationProcessor} from "./GLTFAnimationProcessor";
import {GLTFSceneProcessor} from "./GLTFSceneProcessor";
import {GLTFBufferViewProcessor} from "./GLTFBufferViewProcessor";
import {GLTFPrimitiveProcessor} from "./GLTFPrimitiveProcessor";

export type TypedArray = Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array;

export class GLTFModel {

    gltf:IGLTF_Model;
    data:Array<ArrayBufferView|ArrayBuffer>;
    gl: WebGL2RenderingContext;
    cache: Cache;
    loader: ResourceLoader;
    path: string;

    private accessorProcessor:GLTFAccessorProcessor;
    private bufferViewProcessor:GLTFBufferViewProcessor;
    private meshProcessor:GLTFMeshProcessor;
    private primitiveProcessor:GLTFPrimitiveProcessor;
    private nodeProcessor:GLTFNodeProcessor;
    private materialProcessor:GLTFMaterialProcessor;
    private skinProcessor:GLTFSkinProcessor;

    constructor(gltf:IGLTF_Model, data:Array<ArrayBufferView|ArrayBuffer>,config: {path: string, gl: WebGL2RenderingContext, cache: Cache, loader: ResourceLoader}) {
        this.gltf = gltf;
        this.data = data;
        this.cache = config.cache;
        this.loader = config.loader;
        this.gl = config.gl;
        this.path = config.path;

        this.accessorProcessor = new GLTFAccessorProcessor(this);
        this.bufferViewProcessor = new GLTFBufferViewProcessor(this);
        this.meshProcessor = new GLTFMeshProcessor(this);
        this.primitiveProcessor = new GLTFPrimitiveProcessor(this);
        this.nodeProcessor = new GLTFNodeProcessor(this);
        this.materialProcessor = new GLTFMaterialProcessor(this);
        this.skinProcessor = new GLTFSkinProcessor(this);
    }

    process(): Model {
        const scene =  new GLTFSceneProcessor(this).processScenes();
        scene.animations = new GLTFAnimationProcessor(this).processAnimations();
        scene.meshes = this.meshProcessor.meshes;
        scene.bufferViews = this.bufferViewProcessor.buffers;
        scene.skins = this.skinProcessor.skins;
        scene.primitives = this.primitiveProcessor.primitives;
        scene.transforms = this.nodeProcessor.transforms;
        scene.materials = this.materialProcessor.materials;
        return scene;
    }

    getSkin(idx:number):Skin {
        return this.skinProcessor.processSkin(idx);
    }

    getMaterial(idx:number):Material {
        return this.materialProcessor.processMaterial(idx);
    }

    getNode(idx:number):GLTFNode {
        return this.nodeProcessor.processNode(idx);
    }

    getMesh(idx:number):Mesh {
        return this.meshProcessor.processMesh(idx);
    }

    getBufferView(idx:number, isIndexBuffer?: boolean): BufferView {
        return this.bufferViewProcessor.getBufferView(idx, isIndexBuffer);
    }

    getAccessor(idx:number, isIndexBuffer?: boolean): Accessor {
        return this.accessorProcessor.getAccessor(idx, isIndexBuffer);
    }

    getPrimitive(primitive: IGLTF_Primitive): Primitive {
        return this.primitiveProcessor.processPrimitive(primitive);
    }
}
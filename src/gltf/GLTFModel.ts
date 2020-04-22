import { IGLTF_Accessor, IGLTF_Model } from './model';
import { BufferView, Mesh, Scene, SceneNode } from '../scene';
import { Cache } from '../cache';
import { ResourceLoader } from '@curbl/loader';
import { GLTFMaterialProcessor } from './GLTFMaterialProcessor';
import { GLTFMeshProcessor } from './GLTFMeshProcessor';
import { GLTFNodeProcessor } from './GLTFNodeProcessor';
import { Skin } from '../scene/skin/skin';
import { GLTFAccessorProcessor } from './GLTFAccessorProcessor';
import { Material } from '../material';
import { GLTFSkinProcessor } from './GLTFSkinProcessor';
import { GLTFAnimationProcessor } from './GLTFAnimationProcessor';
import { GLTFSceneProcessor } from './GLTFSceneProcessor';

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array;

export class GLTFModel {
    gltf: IGLTF_Model;
    data: Array<ArrayBufferView | ArrayBuffer>;
    gl: WebGL2RenderingContext;
    cache: Cache;
    loader: ResourceLoader;
    path: string;

    private accessorProcessor: GLTFAccessorProcessor;
    private meshProcessor: GLTFMeshProcessor;
    private nodeProcessor: GLTFNodeProcessor;
    private materialProcessor: GLTFMaterialProcessor;
    private skinProcessor: GLTFSkinProcessor;

    constructor(
        gltf: IGLTF_Model,
        data: Array<ArrayBufferView | ArrayBuffer>,
        config: { path: string; gl: WebGL2RenderingContext; cache: Cache; loader: ResourceLoader }
    ) {
        this.gltf = gltf;
        this.data = data;
        this.cache = config.cache;
        this.loader = config.loader;
        this.gl = config.gl;
        this.path = config.path;

        this.accessorProcessor = new GLTFAccessorProcessor(this);
        this.meshProcessor = new GLTFMeshProcessor(this);
        this.nodeProcessor = new GLTFNodeProcessor(this);
        this.materialProcessor = new GLTFMaterialProcessor(this);
        this.skinProcessor = new GLTFSkinProcessor(this);
    }

    process(): Scene {
        const scene = new GLTFSceneProcessor(this).processScenes();
        scene.animations = new GLTFAnimationProcessor(this).processAnimations();
        scene.meshes = this.meshProcessor.meshes;

        return scene;
    }

    getSkin(idx: number): Skin {
        return this.skinProcessor.processSkin(idx);
    }

    getMaterial(idx: number): Material {
        return this.materialProcessor.processMaterial(idx);
    }

    getNode(idx: number): SceneNode {
        return this.nodeProcessor.processNode(idx);
    }

    getMesh(idx: number): Mesh {
        return this.meshProcessor.processMesh(idx);
    }

    getBufferView(idx: number, isIndexBuffer?: boolean): BufferView {
        return this.accessorProcessor.getBufferView(idx, isIndexBuffer);
    }

    getAccessorData(accessor: IGLTF_Accessor): TypedArray {
        return this.accessorProcessor.getAccessorData(accessor);
    }
}

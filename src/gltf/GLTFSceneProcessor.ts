import {GLTFModel} from "./GLTFModel";
import {IGLTF_Scene} from "./model";
import {Model} from "../model";
import {IBaseCache} from "../cache/caches";
import {CACHE_TYPE} from "../cache";

export class GLTFSceneProcessor {
    private model: GLTFModel;
    private cache:IBaseCache<Model>;

    constructor(model: GLTFModel) {
        this.model = model;
        this.cache = this.model.cache.getCache(CACHE_TYPE.MODEL);
    }

    /**
     * Parse the scenes by parsing each node of the GLTF File
     */
    processScenes():Model {
        const gltf = this.model.gltf;
        const scenes = [];

        for(let i=0, scene:IGLTF_Scene; scene = gltf.scenes[i]; i++) {
           scenes.push(this.processScene(scene,i));
        }

        return scenes[0];
    }

    private processScene(gltfScene:IGLTF_Scene,idx:number):Model {
        const scene = new Model();
        scene.name = gltfScene.name||"scene"+idx;
        for(let i=0; i < gltfScene.nodes.length; i++){
            this.model.getNode(gltfScene.nodes[i]);
        }

        this.cache.add(scene.name, scene);
        return scene;
    }
}
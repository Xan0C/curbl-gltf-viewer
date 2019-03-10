import {GLTFModel} from "./GLTFModel";
import {IGLTF_Scene} from "./model";
import {Scene} from "../scene";
import {IBaseCache} from "../cache/caches";
import {CACHE_TYPE} from "../cache";

export class GLTFSceneProcessor {
    private model: GLTFModel;
    private cache:IBaseCache<Scene>;

    constructor(model: GLTFModel) {
        this.model = model;
        this.cache = this.model.cache.getCache(CACHE_TYPE.SCENE);
    }

    /**
     * Parse the scenes by parsing each node of the GTLF File
     */
    processScenes():Scene {
        const gltf = this.model.gltf;
        const scenes = [];

        for(let i=0, scene:IGLTF_Scene; scene = gltf.scenes[i]; i++) {
           scenes.push(this.processScene(scene,i));
        }

        return scenes[0];
    }

    private processScene(gltfScene:IGLTF_Scene,idx:number):Scene {
        const scene = new Scene();
        scene.name = gltfScene.name||"scene"+idx;
        for(let i=0; i < gltfScene.nodes.length; i++){
            scene.addNode(this.model.getNode(gltfScene.nodes[i]));
        }

        this.cache.add(scene.name, scene);
        return scene;
    }
}
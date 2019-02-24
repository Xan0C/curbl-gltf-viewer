import {ResourceLoader} from "curbl-loader";
import {ACCESSOR_TYPE, IGLTF_Image, IGLTF_Material, IGLTF_Model, IGLTF_Node, IGLTF_Scene} from "./model";
import {TEXTURE_WRAP} from "../gl/constants";
import {TextureLoader, TextureLoaderConfig} from "../loader/TextureLoader";
import {Material, MATERIAL_MAPS, MATERIAL_TYPES, Materialmap} from "../material";
import {MetallicRoughness} from "../material/metallicRoughness";
import {ECS} from "curbl-ecs";
import {Cache, CACHE_TYPE} from "../cache";
import {Transform} from "../scene/transform";
import {mat4, quat, vec3} from "gl-matrix";
import {Scene} from "../scene/scene";
import {SceneNode} from "../scene/sceneNode";
import {GLTFMeshProcessor} from "./GLTFMeshProcessor";
import {GLTFBuffer} from "./GLTFBuffer";
import {GLTFAnimationProcessor} from "./GLTFAnimationProcessor";
import {Animation} from "../scene/animation";

export const GLTF_ACCESORTYPE_SIZE:{[id:string]:number} = {
    [ACCESSOR_TYPE.SCALAR] : 1,
    [ACCESSOR_TYPE.VEC2]: 2,
    [ACCESSOR_TYPE.VEC3]: 3,
    [ACCESSOR_TYPE.VEC4]: 4,
    [ACCESSOR_TYPE.MAT2]: 4,
    [ACCESSOR_TYPE.MAT3]: 9,
    [ACCESSOR_TYPE.MAT4]: 16,
};

/**
 * Parse the GLTF_Json to our model representation
 * TODO: Create a proper DataModell to store all Scenes, Nodes, Animations etc. in and use this to reference and parse
 * TODO: into our own Structure
 */
export class GLTF_Parser {
    /**
     * ref to the gl context
     */
    private gl:WebGL2RenderingContext;
    /**
     * ref to the loader
     */
    private loader:ResourceLoader;
    /**
     * ref to the location of the gltf file
     */
    private _path:string;
    /**
     * the gtlf model in the json format
     */
    private gltfModel:IGLTF_Model;
    /**
     * the loaded buffer data
     */
    private buffers:Array<ArrayBufferView|ArrayBuffer>;

    /**
     * ref to the cache
     */
    private cache:Cache;

    private buffer:GLTFBuffer;

    /**
     * nodes in right order
     */
    private nodes:Array<SceneNode>;

    constructor(loader:ResourceLoader,gl:WebGL2RenderingContext, cache: Cache) {
        this._path = '';
        this.loader = loader;
        this.gl = gl;
        this.cache = cache;
    }

    /**
     *
     * @param {ArrayBuffer} buffer - model data(vertices,indices)
     * @param {IGLTF_Model} gltf_model - json object in gltf format
     * @returns {Mesh}
     */
    public parse(buffer:ArrayBuffer,gltf_model:IGLTF_Model): Scene {
        this.gltfModel = gltf_model;
        this.buffers = [buffer]; //TODO support multiple
        this.buffer = new GLTFBuffer(this.gltfModel, this.buffers);
        this.nodes = [];

        //create the list of nodes
        this.createNodes();

        //Push the textures/material to the TextureLoader
        this.createMaterials();

        //Parse the Scene/Mesh/Meshes/accessors
        const start = gltf_model.scene||0;
        if(start !== undefined && start !== null){
            return this.processScene(gltf_model.scenes[start]);
        }
    }

    private createNodes() {
        for(let i=0; i < this.gltfModel.nodes.length; i++) {
            this.nodes.push(new SceneNode())
        }
    }

    /**
     * Parse the scene by parsing each node of the GTLF File
     * @param {Mesh} model
     * @param {IGLTF_Scene} gltfScene
     */
    private processScene(gltfScene:IGLTF_Scene):Scene {
        const scene = new Scene();

        for(let i=0, node:number; i < gltfScene.nodes.length; i++){
            node = gltfScene.nodes[i];
            const sceneNode = this.processNode(node);
            this.cache.getCache(CACHE_TYPE.NODE).add(sceneNode.name, sceneNode);
            scene.addNode(sceneNode);
        }

        const animations = new GLTFAnimationProcessor(this.gltfModel, this.buffer, this.nodes).processAnimations();
        for(let i=0, animation:Animation; animation = animations[i]; i++) {
            this.cache.getCache(CACHE_TYPE.ANIMATION).add(animation.name, animation);
            scene.addAnimation(animation);
        }

        return scene;
    }

    /**
     * Parse a single node and all its children
     * a node can have multiple properties e.g. mesh,transform,weights,camera,skin etc.
     * @param {Mesh} model
     * @param {number} nodeIdx
     * @param parent
     */
    private processNode(nodeIdx:number, parent?: SceneNode):SceneNode {
        const node = this.gltfModel.nodes[nodeIdx];
        const sceneNode = this.nodes[nodeIdx];
        sceneNode.name = node.name||ECS.uuid();
        //each node can have a transform which is a node in our tree
        sceneNode.transform = this.parseTransform(node, parent);

        sceneNode.mesh = new GLTFMeshProcessor(this.gltfModel, this.buffer).processMesh(node.mesh);
        if(sceneNode.mesh) {
            sceneNode.name = node.name||sceneNode.mesh.name||ECS.uuid();
            sceneNode.mesh.name = sceneNode.mesh.name||sceneNode.name;
            this.cache.getCache(CACHE_TYPE.MESH).add(sceneNode.mesh.name, sceneNode.mesh);
        }

        node.children = node.children||[];
        for(let i=0,child:number; i < node.children.length ;i++){
            child = node.children[i];
            sceneNode.addChild(this.processNode(child, sceneNode));
        }

        return sceneNode;
    }

    /**
     * Parse the Transformation of a node and add it as a child to the list of transform nodes
     * @param {IGLTF_Node} node
     * @param {Transform} parent - parent of the new node
     * @returns {Transform} newly create Transform node
     */
    private parseTransform(node:IGLTF_Node, parent?:SceneNode): Transform {
        const transform:Transform = new Transform();
        if(node.matrix !== undefined && node.matrix !== null) {
            transform.localMatrix = mat4.clone(node.matrix as any);
            mat4.getTranslation(transform.translation, transform.localMatrix);
            mat4.getRotation(transform.rotation, transform.localMatrix);
            mat4.getScaling(transform.scale, transform.localMatrix);
        }
        if(node.translation !== undefined && node.translation !== null){
            transform.translation = vec3.clone(node.translation);
        }
        if(node.rotation !== undefined && node.rotation !== null){
            transform.rotation = quat.clone(node.rotation as any);
        }
        if(node.scale !== undefined && node.scale !== null){
            transform.scale = vec3.clone(node.scale);
        }
        if(parent){
            parent.transform.addChild(transform);
        }
        return transform;
    }

    /**
     * Create the material for this gltf scene
     * then adding needed textures to the TextureLoader
     * and pushing the material into the cache
     */
    private createMaterials():void{
        const material_cache = this.cache.getCache<Material>(CACHE_TYPE.MATERIAL);
        for(let i=0; i < this.gltfModel.materials.length; i++){
            const material = this.parseMaterial(i);
            material_cache.add(material.name,material);
        }
    }

    private parseMaterial(materialIdx?:number):Material {
        if(materialIdx !== undefined && materialIdx !== null){
            const materialNode = this.gltfModel.materials[materialIdx];
            materialNode.name = materialNode.name||ECS.uuid();
            let material:Material<MetallicRoughness>;

            if(materialNode.extensions && materialNode.extensions.KHR_materials_pbrSpecularGlossiness) {
                throw "specular glossiness model is not supported";
            } else {
                material = new Material<MetallicRoughness>(materialNode.name);
                this.parsePBRMaterial(materialNode,material as Material<MetallicRoughness>);
            }

            if(materialNode.emissiveFactor){
                material.model.emissiveFactor.set(materialNode.emissiveFactor);
            }
            //TODO: alphaMode
            //TODO: alphaCutoff
            //TODO: double sided

            if(materialNode.emissiveTexture){
                this.parseTexture(material,materialNode.emissiveTexture.index,MATERIAL_MAPS.EMISSIVE,{
                    premultiplyAlpha: false,
                    internalFormat: this.gl.SRGB8_ALPHA8,
                    format:this.gl.RGBA,
                    type:this.gl.UNSIGNED_BYTE,
                });
            }

            if(materialNode.normalTexture){
                material.model.normalScale = materialNode.normalTexture.scale||1;
                this.parseTexture(material,materialNode.normalTexture.index,MATERIAL_MAPS.NORMAL,{
                    premultiplyAlpha: false,
                    internalFormat: this.gl.RGBA,
                    format:this.gl.RGBA,
                    type:this.gl.UNSIGNED_BYTE,
                });
            }

            if(materialNode.occlusionTexture){
                material.model.occlusionStrength = materialNode.occlusionTexture.strength||1;
                this.parseTexture(material,materialNode.occlusionTexture.index,MATERIAL_MAPS.OCCLUSION,{
                    premultiplyAlpha: false,
                    internalFormat: this.gl.RGBA,
                    format:this.gl.RGBA,
                    type:this.gl.UNSIGNED_BYTE,
                });
            }
            return material;
        }
        throw "Could not parse material for gltf model";
    }

    private parsePBRMaterial(materialNode:IGLTF_Material,material:Material<MetallicRoughness>):void{
        const pbr = materialNode.pbrMetallicRoughness;
        material.type = MATERIAL_TYPES.PBR;

        if(!material.model){
            material.model = new MetallicRoughness();
        }

        if(pbr.baseColorFactor){
            material.model.baseColorFactor.set(pbr.baseColorFactor);
        }

        if(pbr.metallicFactor !== null
            && pbr.metallicFactor !== undefined)
        {
            material.model.metallicFactor = pbr.metallicFactor;
        }

        if(pbr.roughnessFactor !== null
            && pbr.roughnessFactor !== undefined)
        {
            material.model.roughnessFactor = pbr.roughnessFactor;
        }

        //AlbedoTexture
        if(pbr.baseColorTexture !== undefined && pbr.baseColorTexture !== null) {
            this.parseTexture(material,pbr.baseColorTexture.index,MATERIAL_MAPS.ALBEDO,{
                premultiplyAlpha: false,
                internalFormat: this.gl.SRGB8_ALPHA8,
                format:this.gl.RGBA,
                type:this.gl.UNSIGNED_BYTE,
            });
        }

        //Metallic Roughness Texture
        if(pbr.metallicRoughnessTexture !== undefined && pbr.metallicRoughnessTexture !== null) {
            this.parseTexture(material,pbr.metallicRoughnessTexture.index,MATERIAL_MAPS.METAL_ROUGHNESS,{
                premultiplyAlpha: false,
                internalFormat: this.gl.RGBA,
                format:this.gl.RGBA,
                type:this.gl.UNSIGNED_BYTE,
            });
        }
    }

    /**
     * Load the Texture defined by the corresponding image and sampler
     * @param {Material} material
     * @param {number} index
     * @param {number} map
     * @param {TextureLoaderConfig} config
     */
    private parseTexture(material:Material,index:number,map:number,config:TextureLoaderConfig):void{
        if(index === null || index === undefined) {
            return;
        }
        let img:IGLTF_Image;
        if(this.gltfModel.textures[index].source !== undefined && this.gltfModel.textures[index].source !== null) {
            img = this.gltfModel.images[this.gltfModel.textures[index].source];
        }
        if(this.gltfModel.textures[index].sampler !== undefined && this.gltfModel.textures[index].sampler !== null) {
            config.sampler = this.gltfModel.samplers[this.gltfModel.textures[index].sampler];
        }else{
            config.sampler = {
                wrapS: TEXTURE_WRAP.REPEAT,
                wrapT: TEXTURE_WRAP.REPEAT
            }
        }
        //TODO: Parse img from data
        this.loader.get(TextureLoader).add(img.name||img.uri,this.path+img.uri,config);
        material.maps[map] = new Materialmap(img.name||img.uri);
        material.maps[map].sampler = config.sampler;
    }

    public get path():string {
        return this._path;
    }

    public set path(value:string) {
        this._path = value;
    }
}
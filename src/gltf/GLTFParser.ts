import {ResourceLoader} from "curbl-loader";
import {
    ACCESSOR_TYPE,
    IGLTF_BufferView,
    IGLTF_Image,
    IGLTF_Material,
    IGLTF_Model,
    IGLTF_Node,
    IGLTF_Primitive,
    IGLTF_Scene
} from "./model";
import {GL_BUFFERS, TEXTURE_WRAP} from "../gl/constants";
import {TextureLoader, TextureLoaderConfig} from "../loader/TextureLoader";
import {BufferView, Mesh, Primitive} from "../scene";
import {Material, MATERIAL_MAPS, MATERIAL_TYPES, Materialmap} from "../material";
import {MetallicRoughness} from "../material/metallicRoughness";
import {ECS} from "curbl-ecs";
import {Cache, CACHE_TYPE} from "../cache";
import {Transform} from "../scene/transform";
import {mat4, quat, vec3} from "gl-matrix";
import {Scene} from "../scene/scene";
import {SceneNode} from "../scene/sceneNode";

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
 * Currently the gtlf format can only be used for one model, not a complete scene
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

        //Push the textures/material to the TextureLoader
        this.createMaterials();

        //Parse the Scene/Mesh/Meshes/accessors
        const start = gltf_model.scene||0;
        if(start !== undefined && start !== null){
            return this.processScene(gltf_model.scenes[start]);
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
            const sceneNode = this.processNode(this.gltfModel.nodes[node]);
            this.cache.getCache(CACHE_TYPE.NODE).add(sceneNode.name, sceneNode);
            scene.addNode(sceneNode);
        }
        return scene;
    }

    /**
     * Parse a single node and all its children
     * a node can have multiple properties e.g. mesh,transform,weights,camera,skin etc.
     * @param {Mesh} model
     * @param {IGLTF_Node} node
     * @param parent
     */
    private processNode(node:IGLTF_Node, parent?: SceneNode):SceneNode {
        const sceneNode = new SceneNode();
        sceneNode.name = node.name;
        //each node can have a transform which is a node in our tree
        sceneNode.transform = this.parseTransform(node, parent);

        this.parseMesh(sceneNode,node.mesh);

        node.children = node.children||[];
        for(let i=0,child:number; i < node.children.length ;i++){
            child = node.children[i];
            sceneNode.addChild(this.processNode(this.gltfModel.nodes[child], sceneNode));
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
     * Parse the GLTF_Primitive/Primitive at the given meshIdx
     * each Primitive is a set of primitives and all primitives form one Mesh
     * @param {Mesh} model
     * @param {number} meshIdx
     */
    private parseMesh(node:SceneNode,meshIdx?:number): void {
        if(meshIdx === undefined || meshIdx === null){
            return;
        }
        const mesh = this.gltfModel.meshes[meshIdx];

        if(mesh !== undefined && mesh !== null){
            const sceneMesh = new Mesh();
            //Parse each primitive
            for(let i=0, primitive:IGLTF_Primitive; primitive = mesh.primitives[i]; i++){
                sceneMesh.addPrimitive(this.parsePrimitives(sceneMesh, primitive));
            }

            node.mesh = sceneMesh;
            node.name = node.name||node.mesh.name||ECS.uuid();
            node.mesh.name = node.mesh.name||node.name||ECS.uuid();
            this.cache.getCache(CACHE_TYPE.MESH).add(node.mesh.name, node.mesh);
        }
    }

    /**
     * creates a new mesh/GLTF_Primitive for the model
     * @param {Mesh} model
     * @param {IGLTF_Primitive} gltfPrimitive
     */
    private parsePrimitives(mesh: Mesh,gltfPrimitive:IGLTF_Primitive):Primitive{
        const primitive = new Primitive();
        //Add attributes to mesh
        for(let id in gltfPrimitive.attributes){
            //Create BufferView for each Accessor/GLBuffer for Position,Normal,tex,tangent etc. and map the accessor bufferViewIdx new
            this.createTypedArrayForBufferView(mesh, gltfPrimitive.attributes[id]);
            this.addAttribute(primitive,id,gltfPrimitive.attributes[id]);
        }
        //Set indices for indexBuffer
        if(gltfPrimitive.indices !== undefined && gltfPrimitive.indices !== null) {
            //Create BufferView for each IndexBuffer and map the accessor bufferViewIdx new
            this.createTypedArrayForBufferView(mesh, gltfPrimitive.indices,true);
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
        const typeSize = GLTF_ACCESORTYPE_SIZE[accessor.type]; //get typeSize
        const view = this.gltfModel.bufferViews[accessor.bufferView];
        primitive.addAttribute(id,typeSize,accessor.componentType,accessor.normalized,view.byteStride||0,accessor.byteOffset,accessor.bufferView);
    }

    /**
     * sets the componentType of the BufferView of the model, that is used by the given accessor,
     * so that both match the same componentType(weird GLTFSpecification)
     * @param {Mesh} mesh
     * @param {number} accessorIdx
     * @param {boolean} isIndexBuffer - if the arrayBuffer is for a vertexBuffer(ARRAY_BUFFER) or indexBuffer(ELEMENT_ARRAY_BUFFER)
     */
    private createTypedArrayForBufferView(mesh: Mesh, accessorIdx:number, isIndexBuffer:boolean=false):void{
        const accessor = this.gltfModel.accessors[accessorIdx];
        if(!mesh.buffer.views[accessor.bufferView]) {
            const view = this.createBufferView(this.gltfModel.bufferViews[accessor.bufferView]);
            //map accessor to new Buffer
            accessor.bufferView = mesh.buffer.views.push(view) - 1;
            //set target for the BufferView IndexBuffer or Vertex/ArrayBuffer
            view.target = isIndexBuffer ? view.target||GL_BUFFERS.ELEMENT_ARRAY_BUFFER : view.target||GL_BUFFERS.ARRAY_BUFFER;
            //BufferView needs the same componentType as its accessor
            if(view.componentType === undefined || view.componentType === null) {
                view.componentType = accessor.componentType;
            }
        }
    }

    /**
     * Create a Bufferfiew from the GLTF_Bufferview
     * @param {IGLTF_BufferView} bufferView
     * @returns {BufferView}
     */
    private createBufferView(bufferView:IGLTF_BufferView): BufferView {
        const view = new BufferView();
        view.data = this.sliceBuffer(bufferView);
        view.target = bufferView.target;
        return view;
    }

    /**
     * Slice up the Mesh data ArrayBuffer into smaller ArrayBuffers
     * @param {BufferView} view
     * @returns {ArrayBuffer}
     */
    private sliceBuffer(view:IGLTF_BufferView):ArrayBuffer{
        const data = this.buffers[view.buffer];
        const offset = view.byteOffset||0;
        if(data instanceof ArrayBuffer){
            return data.slice(offset,offset+view.byteLength);
        }else {
            return data['buffer'].slice(offset,offset+view.byteLength);
        }
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
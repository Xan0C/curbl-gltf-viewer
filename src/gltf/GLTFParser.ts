import {ResourceLoader} from "curbl-loader";
import {
    ACCESSOR_TYPE,
    IGLTF_BufferView, IGLTF_Image,
    IGLTF_Material,
    IGLTF_Model,
    IGLTF_Node,
    IGLTF_Primitive,
    IGLTF_Scene, IPBRSpecularGlossiness
} from "./model";
import {Matrix, Vector, Quaternion, Color} from "../math";
import {GL_BUFFERS, TEXTURE_WRAP} from "../gl/constants";
import {TextureLoader, TextureLoaderConfig} from "../loader/TextureLoader";
import {BufferView, Model, Primitive} from "../model";
import {Material, MATERIAL_MAPS, MATERIAL_TYPES, Materialmap, SpecularGlossiness} from "../material";
import {MetallicRoughness} from "../material/metallicRoughness";
import {ECS} from "curbl-ecs";
import {TEXTURE_IDS} from "../viewer/constants";
import {Cache, CACHE_TYPE} from "../cache";
import {Transform} from "../model/transform";

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
    private buffer:ArrayBuffer;

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
     * @returns {Model}
     */
    public parse(buffer:ArrayBuffer,gltf_model:IGLTF_Model): Model{
        const engineModel = new Model();
        this.gltfModel = gltf_model;
        this.buffer = buffer;
        //Push the data used for this model to the modeldata
        engineModel.buffer.data.push(this.buffer);
        //Fills up the Modelbuffer with BufferViews and the bufferData
        this.createBufferViews(engineModel);
        //Push the textures/material to the TextureLoader
        this.createMaterials();
        //Parse the Scene/Model/Meshes/accessors
        const start = gltf_model.scene||0;
        if(start !== undefined && start !== null){
            this.processScene(engineModel,gltf_model.scenes[start]);
        }
        return engineModel;
    }

    /**
     * Create all the bufferviews for the model
     * A bufferview represents the needed information in which way the bufferdata needs to be send to the GPU
     * @param {Model} model
     */
    private createBufferViews(model:Model):void{
        for(let i=0, view:IGLTF_BufferView; view = this.gltfModel.bufferViews[i]; i++){
            model.buffer.views.push(this.createBufferView(view));
        }
    }

    /**
     * Create a Bufferfiew from the GLTF_Bufferview
     * @param {IGLTF_BufferView} bufferView
     * @returns {BufferView}
     */
    private createBufferView(bufferView:IGLTF_BufferView): BufferView {
        let view = new BufferView();
        view.dataIdx = bufferView.buffer;
        view.byteOffset = bufferView.byteOffset||0;
        view.byteLength = bufferView.byteLength;
        view.byteStride = bufferView.byteStride;
        view.target = bufferView.target;
        return view;
    }

    /**
     * Parse the scene by parsing each node of the GTLF File
     * @param {Model} model
     * @param {IGLTF_Scene} scene
     */
    private processScene(model:Model,scene:IGLTF_Scene):void{
        for(let i=0, node:number; i < scene.nodes.length; i++){
            node = scene.nodes[i];
            this.processNode(model,this.gltfModel.nodes[node]);
        }
    }

    /**
     * Parse a single node and all its children
     * a node can have multiple properties e.g. mesh,transform,weights,camera,skin etc.
     * @param {Model} model
     * @param {IGLTF_Node} node
     * @param parent
     */
    private processNode(model:Model, node:IGLTF_Node, parent?: Transform):void{
        this.parseMesh(model,node.mesh);
        const transform = this.parseTransform(model,node, parent);

        node.children = node.children||[];
        for(let i=0,child:number; i < node.children.length ;i++){
            child = node.children[i];
            this.processNode(model,this.gltfModel.nodes[child],transform);
        }
    }

    /**
     * Parse the Transformation of a node and add it as a child to the list of transform nodes of the model
     * @param {Model} model
     * @param {IGLTF_Node} node
     * @param {Transform} parent - parent of the new node
     * @returns {Transform} newly create Transform node
     */
    private parseTransform(model:Model, node:IGLTF_Node, parent?:Transform): Transform{
        const transform:Transform = new Transform();
        if(node.matrix !== undefined && node.matrix !== null) {
            transform.localMatrix = new Matrix(node.matrix);
            transform.translation = transform.localMatrix.translation;
            transform.rotation = transform.localMatrix.getRotation();
            transform.scale = transform.localMatrix.getScale();
        }
        if(node.translation !== undefined && node.translation !== null){
            const t = node.translation;
            transform.translation = new Vector(t[0],t[1],t[2]);
        }
        if(node.rotation !== undefined && node.rotation !== null){
            const r = node.rotation;
            transform.rotation = new Quaternion(r[0],r[1],r[2],r[3]);
        }
        if(node.scale !== undefined && node.scale !== null){
            const s = node.scale;
            transform.scale = new Vector(s[0],s[1],s[2]);
        }
        if(parent){
            parent.addChild(transform);
        }else{
            model.transform = transform;
        }
        return transform;
    }

    /**
     * Parse the GLTF_Primitive/Primitive at the given meshIdx
     * each Primitive is a set of primitives and all meshes form one model
     * (often a mesh is referred to as the complete set of all primitives that form the model)
     * @param {Model} model
     * @param {number} meshIdx
     */
    private parseMesh(model:Model,meshIdx?:number):void{
        if(meshIdx === undefined || meshIdx === null){
            return;
        }
        let mesh = this.gltfModel.meshes[meshIdx];
        if(mesh !== undefined && mesh !== null){
            //Primitive === GLTF_Primitive
            //Parse each primitive
            for(let i=0, primitive:IGLTF_Primitive; primitive = mesh.primitives[i]; i++){
                this.parsePrimitives(model,primitive);
            }
        }
    }

    /**
     * creates a new mesh/GLTF_Primitive for the model
     * @param {Model} model
     * @param {IGLTF_Primitive} primitive
     */
    private parsePrimitives(model:Model,primitive:IGLTF_Primitive):void{
        let model_Mesh = new Primitive();
        //Add attributes to mesh
        for(let id in primitive.attributes){
            //Create BufferView for each Accessor/GLBuffer for Position,Normal,tex,tangent etc.
            this.addAttribute(model_Mesh,id,primitive.attributes[id]);
            this.createTypedArrayForBufferView(model,primitive.attributes[id]);
        }
        //Set indices for indexBuffer
        if(primitive.indices !== undefined && primitive.indices !== null) {
            //Create BufferView for each IndexBuffer
            this.setIndices(model_Mesh,primitive.indices);
            this.createTypedArrayForBufferView(model,primitive.indices,true);
        }
        model_Mesh.draw_mode = primitive.mode||4; //Default GL_TRIANGLE
        //Set the Material for the mesh if any else its default
        this.setMeshMaterial(model_Mesh,primitive.material);
        //TODO: morph targets primitive.targets animations skinning etc.
        model.addMesh(model_Mesh);
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
        let indices = this.gltfModel.accessors[accessorIdx];
        mesh.setIndices(indices.count, indices.componentType, indices.byteOffset||0, indices.bufferView);
    }

    /**
     * Adds an attribute to the mesh of type
     * POSITION,NORMAL,TANGENT,TEXCOORD0,TEXCOORD1,COLOR0,JOINTS0,WEIGHTS0
     * @param {Primitive} mesh
     * @param {string} id
     * @param {number} accessorIdx
     */
    private addAttribute(mesh:Primitive, id:string, accessorIdx:number):void{
        let accessor = this.gltfModel.accessors[accessorIdx];
        let typeSize = GLTF_ACCESORTYPE_SIZE[accessor.type]; //get typeSize
        let view = this.gltfModel.bufferViews[accessor.bufferView];
        mesh.addAttribute(id,typeSize,accessor.componentType,accessor.normalized,view.byteStride||0,accessor.byteOffset,accessor.bufferView);
    }

    /**
     * sets the componentType of the BufferView of the model, that is used by the given accessor,
     * so that both match the same componentType(weird GLTFSpecification)
     * @param {Model} model
     * @param {number} accessorIdx
     * @param {boolean} isIndexBuffer - if the arrayBuffer is for a vertexBuffer(ARRAY_BUFFER) or indexBuffer(ELEMENT_ARRAY_BUFFER)
     */
    private createTypedArrayForBufferView(model:Model, accessorIdx:number,isIndexBuffer:boolean=false):void{
        let accessor = this.gltfModel.accessors[accessorIdx];
        let view = model.buffer.views[accessor.bufferView];
        view.target = isIndexBuffer ? view.target||GL_BUFFERS.ELEMENT_ARRAY_BUFFER : view.target||GL_BUFFERS.ARRAY_BUFFER;
        if(view.componentType === undefined || view.componentType === null) {
            view.componentType = accessor.componentType;
        }
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
            let material:Material<SpecularGlossiness>|Material<MetallicRoughness>;

            //TODO: Change defaul to pbr if implemented
            if(materialNode.extensions && materialNode.extensions.KHR_materials_pbrSpecularGlossiness) {
                material = new Material<SpecularGlossiness>(materialNode.name);
                this.parseSpecularMaterial(materialNode,material as Material<SpecularGlossiness>);
            }else {
                material = new Material<MetallicRoughness>(materialNode.name);
                this.parsePBRMaterial(materialNode,material as Material<MetallicRoughness>);
            }

            if(materialNode.emissiveFactor){
                material.model.emissiveFactor.set(
                    materialNode.emissiveFactor[0],
                    materialNode.emissiveFactor[1],
                    materialNode.emissiveFactor[2]);
            }
            //TODO: alphaMode
            //TODO: alphaCutoff
            //TODO: double sided


            if(materialNode.emissiveTexture){
                this.parseTexture(material,materialNode.emissiveTexture.index,MATERIAL_MAPS.EMISSIVE,{
                    id:TEXTURE_IDS.EMISSIVE,
                    premultiplyAlpha: false,
                    internalFormat: this.gl.SRGB8_ALPHA8,
                    format:this.gl.RGBA,
                    type:this.gl.UNSIGNED_BYTE,
                });
            }

            if(materialNode.normalTexture){
                this.parseTexture(material,materialNode.normalTexture.index,MATERIAL_MAPS.NORMAL,{
                    id:TEXTURE_IDS.NORMAL,
                    premultiplyAlpha: false,
                    internalFormat: this.gl.RGBA,
                    format:this.gl.RGBA,
                    type:this.gl.UNSIGNED_BYTE,
                });
            }

            //We use SSAO instead
            /*if(materialNode.occlusionTexture){
                material.model.occlusionStrength = materialNode.occlusionTexture.strength||1;
                this.parseTexture(material,materialNode.occlusionTexture.index,MATERIAL_MAPS.OCCLUSION,{
                    id:TEXTURE_IDS.OCCLUSION,
                    premultiplyAlpha: false,
                    internalFormat: this.gl.RGBA,
                    format:this.gl.RGBA,
                    type:this.gl.UNSIGNED_BYTE,
                });
            }*/
            return material;
        }
        throw "Could not parse material for gltf model";
    }

    private parseSpecularMaterial(materialNode:IGLTF_Material,material:Material):void{
        if(!materialNode.extensions || !materialNode.extensions.KHR_materials_pbrSpecularGlossiness){
            return;
        }
        material.type = MATERIAL_TYPES.SPEC;
        if(!material.model){
            material.model = new SpecularGlossiness();
        }
        const specular = materialNode.extensions.KHR_materials_pbrSpecularGlossiness as IPBRSpecularGlossiness;
        //SpecularColor
        specular.specularFactor = specular.specularFactor||[1,1,1];
        material.model.specularColor = new Color(specular.specularFactor[0],specular.specularFactor[1],specular.specularFactor[2]);
        //DiffuseColor
        specular.diffuseFactor = specular.diffuseFactor||[1,1,1,1];
        material.model.diffuseColor = new Color(specular.diffuseFactor[0],specular.diffuseFactor[1],specular.diffuseFactor[2],specular.diffuseFactor[3]);
        //SpecularExponent/GlossinesFactor
        if(specular.glossinessFactor === undefined || specular.glossinessFactor === null){
            specular.glossinessFactor = 1;
        }
        material.model.specularExponent = specular.glossinessFactor;
        //DiffuseTexture
        if(specular.diffuseTexture !== undefined && specular.diffuseTexture !== null) {
            this.parseTexture(material,specular.diffuseTexture.index,MATERIAL_MAPS.ALBEDO,{
                id:TEXTURE_IDS.DIFFUSE,
                premultiplyAlpha: false,
                internalFormat: this.gl.SRGB8_ALPHA8,
                format:this.gl.RGBA,
                type:this.gl.UNSIGNED_BYTE,
            });
        }
        //Specular Texture
        if(specular.specularGlossinessTexture !== undefined && specular.specularGlossinessTexture !== null){
            this.parseTexture(material,specular.specularGlossinessTexture.index,MATERIAL_MAPS.SPECULAR,{
                id:TEXTURE_IDS.SPECULAR,
                premultiplyAlpha: false,
                internalFormat: this.gl.RGBA,
                format:this.gl.RGBA,
                type:this.gl.UNSIGNED_BYTE
            });
        }
    }

    //TODO
    private parsePBRMaterial(materialNode:IGLTF_Material,material:Material<MetallicRoughness>):void{
        //materialNode.name = "__default__";

        const pbr = materialNode.pbrMetallicRoughness;
        material.type = MATERIAL_TYPES.PBR;


        if(!material.model){
            material.model = new MetallicRoughness();
        }

        if(pbr.baseColorFactor){
            material.model.baseColorFactor.set(
                pbr.baseColorFactor[0],
                pbr.baseColorFactor[1],
                pbr.baseColorFactor[2],
                pbr.baseColorFactor[3],
            );
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
                id:TEXTURE_IDS.DIFFUSE,
                premultiplyAlpha: false,
                internalFormat: this.gl.SRGB8_ALPHA8,
                format:this.gl.RGBA,
                type:this.gl.UNSIGNED_BYTE,
            });
        }

        //Metallic Roughness Texture
        if(pbr.metallicRoughnessTexture !== undefined && pbr.metallicRoughnessTexture !== null) {
            this.parseTexture(material,pbr.metallicRoughnessTexture.index,MATERIAL_MAPS.METAL_ROUGHNESS,{
                id:TEXTURE_IDS.METAL_ROUGHNESS,
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
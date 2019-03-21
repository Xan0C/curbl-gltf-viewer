import {GLTFModel} from "./GLTFModel";
import {ALPHA_MODE, Material, MATERIAL_MAPS, MATERIAL_TYPES, Materialmap} from "../material";
import {CACHE_TYPE, IBaseCache} from "../cache";
import {MetallicRoughness} from "../material/metallicRoughness";
import {IGLTF_Image, IGLTF_Material} from "./model";
import {TextureLoader, TextureLoaderConfig} from "../loader/TextureLoader";
import {TEXTURE_WRAP} from "../gl/constants";

export class GLTFMaterialProcessor {

    private model: GLTFModel;
    private materialCache: IBaseCache<Material>;
    private _materials: Array<Material>;

    constructor(model:GLTFModel) {
        this.model = model;
        this.materialCache = this.model.cache.getCache<Material>(CACHE_TYPE.MATERIAL);
        this._materials = [];
    }

    public processMaterial(materialIdx:number):Material {
        const gltf = this.model.gltf;
        const gl = this.model.gl;

        //set node name if not already provided
        const materialNode = gltf.materials[materialIdx];

        const cachedMat = this.materialCache.get(materialNode.name);
        if(cachedMat) {
            return cachedMat;
        }

        materialNode.name = materialNode.name||"material"+materialIdx;

        let material:Material<MetallicRoughness>;

        if(materialNode.extensions && materialNode.extensions.KHR_materials_pbrSpecularGlossiness) {
            throw "specular glossiness gltf is not supported";
        } else {
            material = new Material<MetallicRoughness>(materialNode.name);
            this.parsePBRMaterial(materialNode,material as Material<MetallicRoughness>);
        }

        if(materialNode.emissiveFactor){
            material.model.emissiveFactor.set(materialNode.emissiveFactor);
        }

        material.alphaMode = materialNode.alphaMode as ALPHA_MODE || ALPHA_MODE.OPAQUE;
        material.alphaCutoff = materialNode.alphaCutoff || 0.5;
        material.doubleSided = !!materialNode.doubleSided;

        if(materialNode.emissiveTexture){
            this.parseTexture(material,materialNode.emissiveTexture.index,MATERIAL_MAPS.EMISSIVE,{
                premultiplyAlpha: false,
                internalFormat: gl.SRGB8_ALPHA8,
                format:gl.RGBA,
                type:gl.UNSIGNED_BYTE,
            });
        }

        if(materialNode.normalTexture){
            material.model.normalScale = materialNode.normalTexture.scale||1;
            this.parseTexture(material,materialNode.normalTexture.index,MATERIAL_MAPS.NORMAL,{
                premultiplyAlpha: false,
                internalFormat: gl.RGBA,
                format:gl.RGBA,
                type:gl.UNSIGNED_BYTE,
            });
        }

        if(materialNode.occlusionTexture){
            material.model.occlusionStrength = materialNode.occlusionTexture.strength||1;
            this.parseTexture(material,materialNode.occlusionTexture.index,MATERIAL_MAPS.OCCLUSION,{
                premultiplyAlpha: false,
                internalFormat: gl.RGBA,
                format:gl.RGBA,
                type:gl.UNSIGNED_BYTE,
            });
        }

        this.materialCache.add(material.name,material);
        this._materials.push(material);
        return material;
    }

    private parsePBRMaterial(materialNode:IGLTF_Material,material:Material<MetallicRoughness>):void{
        const pbr = materialNode.pbrMetallicRoughness;
        material.type = MATERIAL_TYPES.PBR;
        const gl = this.model.gl;

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
                internalFormat: gl.SRGB8_ALPHA8,
                format: gl.RGBA,
                type: gl.UNSIGNED_BYTE,
            });
        }

        //Metallic Roughness Texture
        if(pbr.metallicRoughnessTexture !== undefined && pbr.metallicRoughnessTexture !== null) {
            this.parseTexture(material,pbr.metallicRoughnessTexture.index,MATERIAL_MAPS.METAL_ROUGHNESS,{
                premultiplyAlpha: false,
                internalFormat: gl.RGBA,
                format: gl.RGBA,
                type: gl.UNSIGNED_BYTE,
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
        const gltf = this.model.gltf;
        const loader = this.model.loader;
        const path = this.model.path;

        let img:IGLTF_Image;
        if(gltf.textures[index].source !== undefined && gltf.textures[index].source !== null) {
            img = gltf.images[gltf.textures[index].source];
        }
        if(gltf.textures[index].sampler !== undefined && gltf.textures[index].sampler !== null) {
            config.sampler = gltf.samplers[gltf.textures[index].sampler];
        }else{
            config.sampler = {
                wrapS: TEXTURE_WRAP.REPEAT,
                wrapT: TEXTURE_WRAP.REPEAT
            }
        }
        //TODO: Parse img from data
        loader.get(TextureLoader).add(img.name||img.uri,path+img.uri,config);
        material.maps[map] = new Materialmap(img.name||img.uri);
        material.maps[map].sampler = config.sampler;
    }

    get materials(): Array<Material> {
        return this._materials;
    }

    set materials(value: Array<Material>) {
        this._materials = value;
    }
}
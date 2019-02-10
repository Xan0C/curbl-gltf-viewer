import {Shader} from "../model/shader";
import {Model} from "../model";
import {GL_PRIMITIVES} from "../gl/constants";
import {Material, MATERIAL_MAPS} from "../material";
import {MetallicRoughness} from "../material/metallicRoughness";
import {GLTexture} from "../gl";
import {Cache, CACHE_TYPE} from "../cache";
import {CACHED_TEXTURES, UBO_BINDINGS} from "../viewer/constants";
import {GLCubemap} from "../gl/GLCubemap";


const TEXTURES = {
    DIFFUSE_ENVIRONMENT: 0,
    SPECULAR_ENVIRONMENT: 1,
    BRDF_LUT: 2,
    DIFFUSE: 3,
    METALLIC_ROUGHNESS: 4,
    NORMAL: 5,
    EMISSIVE: 6,
    SSAO: 7
};

export class KhronosPbrShader extends Shader {

    private cache: Cache;

    constructor(gl:WebGL2RenderingContext, cache :Cache){
        super(gl);
        this.cache = cache;
    }

    public apply(model:Model):void {
        if(model.hasAttribute(GL_PRIMITIVES.TANGENT)){
           // this.uniforms.u_HasTangents = 1.0;
        }else {
            this.uniforms.u_HasTangents = 0.0;
        }

        if(model.hasAttribute(GL_PRIMITIVES.NORMAL)){
            //this.uniforms.u_HasNormals = 1.0;
        }else {
            this.uniforms.u_HasNormals = 0.0;
        }
    }

    public applyMaterial(material?:Material<MetallicRoughness>) {
        this.applyCamera();

        this.uniforms.u_BaseColorFactor = material.model.baseColorFactor.elements;
        this.uniforms.u_RoughnessFactor = material.model.roughnessFactor;
        this.uniforms.u_MetallicFactor = material.model.metallicFactor;
        this.uniforms.u_EmissoveFactor = material.model.emissiveFactor;

        this.applyTextures(material);
    }

    private applyTextures(material?:Material<MetallicRoughness>):void {
        //applyMaterial BaseColor Texture
        if (material.maps[MATERIAL_MAPS.ALBEDO]) {
            const texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, material.maps[MATERIAL_MAPS.ALBEDO].texture);
            texture.bind(TEXTURES.DIFFUSE);
            this.uniforms.u_BaseColorSampler = TEXTURES.DIFFUSE;
        }else{
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.WHITE);
            texture.bind(TEXTURES.DIFFUSE);
            this.uniforms.u_BaseColorSampler = TEXTURES.DIFFUSE;
        }
        //applyMaterial MetallcRoughnessSampler
        if(material.maps[MATERIAL_MAPS.METAL_ROUGHNESS]){
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, material.maps[MATERIAL_MAPS.METAL_ROUGHNESS].texture);
            texture.bind(TEXTURES.METALLIC_ROUGHNESS);
            this.uniforms.u_MetallicRoughnessSampler = TEXTURES.METALLIC_ROUGHNESS;
        }else{
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.WHITE);
            texture.bind(TEXTURES.METALLIC_ROUGHNESS);
            this.uniforms.u_MetallicRoughnessSampler = TEXTURES.METALLIC_ROUGHNESS;
        }
        //applyMaterial NormalMaps
        if (material.maps[MATERIAL_MAPS.NORMAL]) {
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, material.maps[MATERIAL_MAPS.NORMAL].texture);
            texture.bind(TEXTURES.NORMAL);
            this.uniforms.u_NormalSampler = TEXTURES.NORMAL;
            this.uniforms.u_HasNormalMap = 0.0;
        } else {
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.BLACK);
            texture.bind(TEXTURES.NORMAL);
            this.uniforms.u_NormalSampler = TEXTURES.NORMAL;
            this.uniforms.u_HasNormalMap = 0.0;
        }
        //applyMaterial emissive map
        if(material.maps[MATERIAL_MAPS.EMISSIVE]){
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, material.maps[MATERIAL_MAPS.EMISSIVE].texture);
            texture.bind(TEXTURES.EMISSIVE);
            this.uniforms.u_EmissiveSampler = TEXTURES.EMISSIVE;
            this.uniforms.u_EmissiveFactor = material.model.emissiveFactor.elements;
        }else{
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.BLACK);
            texture.bind(TEXTURES.EMISSIVE);
            this.uniforms.u_EmissiveSampler = TEXTURES.EMISSIVE;
        }

        /*******************************IBL*************************************/

        let brdfLUT = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.BRDF_LUT);
        if (brdfLUT) {
            brdfLUT.bind(TEXTURES.BRDF_LUT);
            this.uniforms.u_brdfLUT = TEXTURES.BRDF_LUT;
        } else {
            brdfLUT = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.BLACK);
            brdfLUT.bind(TEXTURES.BRDF_LUT);
            this.uniforms.u_brdfLUT = TEXTURES.BRDF_LUT;
        }

        let diffuseEnv = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.DIFFUSE_ENVIRONMENT);
        if(diffuseEnv){
            diffuseEnv.bind(TEXTURES.DIFFUSE_ENVIRONMENT);
            this.uniforms.u_DiffuseEnvSampler = TEXTURES.DIFFUSE_ENVIRONMENT;
        }else{
            diffuseEnv = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.BLACK_CUBE);
            diffuseEnv.bind(TEXTURES.DIFFUSE_ENVIRONMENT);
            this.uniforms.u_DiffuseEnvSampler = TEXTURES.DIFFUSE_ENVIRONMENT;
        }

        let specularEnv = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.SPECULAR_ENVIRONMENT);
        if(specularEnv){
            specularEnv.bind(TEXTURES.SPECULAR_ENVIRONMENT);
            this.uniforms.u_SpecularEnvSampler = TEXTURES.SPECULAR_ENVIRONMENT;
        }else{
            specularEnv = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.BLACK_CUBE);
            specularEnv.bind(TEXTURES.SPECULAR_ENVIRONMENT);
            this.uniforms.u_SpecularEnvSampler = TEXTURES.SPECULAR_ENVIRONMENT;
        }
    }

    private applyCamera():void{
        this.uniforms.Matrices = UBO_BINDINGS.CAMERA;
    }
}
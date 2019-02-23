import {Shader} from "../scene/shader";
import {Mesh} from "../scene";
import {Material, MATERIAL_MAPS} from "../material";
import {MetallicRoughness} from "../material/metallicRoughness";
import {GL_PRIMITIVES, GLTexture} from "../gl";
import {Cache, CACHE_TYPE} from "../cache";
import {GLOBAL_TEXTURES, UBO_BINDINGS} from "../viewer/constants";
import {GLCubemap} from "../gl/GLCubemap";
import {SceneNode} from "../scene/sceneNode";
import {Scene} from "../scene/scene";

const TEXTURES = {
    DIFFUSE_ENVIRONMENT: 0,
    SPECULAR_ENVIRONMENT: 1,
    BRDF_LUT: 2,
    DIFFUSE: 3,
    METALLIC_ROUGHNESS: 4,
    NORMAL: 5,
    EMISSIVE: 6,
    OCCLUSION: 7
};

export class KhronosPbrShader extends Shader {

    private cache: Cache;

    constructor(gl:WebGL2RenderingContext, cache :Cache){
        super(gl);
        this.cache = cache;
    }

    public initializeDefines(model:Mesh) {
        if (model.hasAttribute(GL_PRIMITIVES.NORMAL)) {
            this.addDefine("HAS_NORMALS", 1);
        }
        if (model.hasAttribute(GL_PRIMITIVES.TANGENT)) {
            this.addDefine("HAS_TANGENTS", 1);
        }
        if (model.hasAttribute(GL_PRIMITIVES.TEXCOORD_0)) {
            this.addDefine("HAS_UV", 1);
        }
        if(model.hasMap(this.cache, MATERIAL_MAPS.ALBEDO)) {
            this.addDefine("HAS_BASECOLORMAP", 1);
        }
        if(model.hasMap(this.cache, MATERIAL_MAPS.METAL_ROUGHNESS)) {
            this.addDefine("HAS_METALROUGHNESSMAP", 1);
        }
        if(model.hasMap(this.cache, MATERIAL_MAPS.NORMAL)) {
            this.addDefine("HAS_NORMALMAP", 1);
        }
        if(model.hasMap(this.cache, MATERIAL_MAPS.EMISSIVE)) {
            this.addDefine("HAS_EMISSIVEMAP", 1);
        }
        if(model.hasMap(this.cache, MATERIAL_MAPS.OCCLUSION)) {
            this.addDefine("HAS_OCCLUSIONMAP", 1);
        }

        const brdfLUT = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, GLOBAL_TEXTURES.BRDF_LUT);
        const diffuseEnv = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, GLOBAL_TEXTURES.DIFFUSE_ENVIRONMENT);
        const specularEnv = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, GLOBAL_TEXTURES.SPECULAR_ENVIRONMENT);

        if(brdfLUT && diffuseEnv && specularEnv) {
            this.addDefine("USE_IBL", 1);
        }
    }

    applyMesh(model:Mesh):void {}

    applyNode(node: SceneNode): void {
        this.uniforms.u_ModelMatrix = node.transform.modelMatrix;
    }

    applyScene(scene: Scene): void {

    }

    applyMaterial(material?:Material<MetallicRoughness>) {
        this.applyCamera();
        this.applyTextures(material);
    }

    private applyTextures(material?:Material<MetallicRoughness>):void {
        //applyMaterial BaseColor Texture
        if (material.maps[MATERIAL_MAPS.ALBEDO]) {
            const texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, material.maps[MATERIAL_MAPS.ALBEDO].texture);
            texture.bind(TEXTURES.DIFFUSE);
            this.uniforms.u_BaseColorSampler = TEXTURES.DIFFUSE;
            this.uniforms.u_BaseColorFactor = material.model.baseColorFactor;
        }
        //applyMaterial MetallicRoughnessSampler
        if(material.maps[MATERIAL_MAPS.METAL_ROUGHNESS]){
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, material.maps[MATERIAL_MAPS.METAL_ROUGHNESS].texture);
            texture.bind(TEXTURES.METALLIC_ROUGHNESS);
            this.uniforms.u_MetallicRoughnessSampler = TEXTURES.METALLIC_ROUGHNESS;
            this.uniforms.u_RoughnessFactor = material.model.roughnessFactor;
            this.uniforms.u_MetallicFactor = material.model.metallicFactor;
        }
        //applyMaterial NormalMaps
        if (material.maps[MATERIAL_MAPS.NORMAL]) {
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, material.maps[MATERIAL_MAPS.NORMAL].texture);
            texture.bind(TEXTURES.NORMAL);
            this.uniforms.u_NormalSampler = TEXTURES.NORMAL;
            this.uniforms.u_NormalScale = material.model.normalScale;
        }
        //applyMaterial emissive map
        if(material.maps[MATERIAL_MAPS.EMISSIVE]){
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, material.maps[MATERIAL_MAPS.EMISSIVE].texture);
            texture.bind(TEXTURES.EMISSIVE);
            this.uniforms.u_EmissiveSampler = TEXTURES.EMISSIVE;
            this.uniforms.u_EmissiveFactor = material.model.emissiveFactor;
        }
        //applyMesh Occlusion map
        if(material.maps[MATERIAL_MAPS.OCCLUSION]) {
            let texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, material.maps[MATERIAL_MAPS.OCCLUSION].texture);
            texture.bind(TEXTURES.OCCLUSION);
            this.uniforms.u_OcclusionSampler = TEXTURES.OCCLUSION;
            this.uniforms.u_OcclusionStrength = material.model.occlusionStrength;
        }

        /*******************************IBL*************************************/

        const brdfLUT = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, GLOBAL_TEXTURES.BRDF_LUT);
        if (brdfLUT) {
            brdfLUT.bind(TEXTURES.BRDF_LUT);
            this.uniforms.u_brdfLUT = TEXTURES.BRDF_LUT;
        }

        const diffuseEnv = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, GLOBAL_TEXTURES.DIFFUSE_ENVIRONMENT);
        if(diffuseEnv){
            diffuseEnv.bind(TEXTURES.DIFFUSE_ENVIRONMENT);
            this.uniforms.u_DiffuseEnvSampler = TEXTURES.DIFFUSE_ENVIRONMENT;
        }

        const specularEnv = this.cache.get<GLCubemap>(CACHE_TYPE.TEXTURE, GLOBAL_TEXTURES.SPECULAR_ENVIRONMENT);
        if(specularEnv){
            specularEnv.bind(TEXTURES.SPECULAR_ENVIRONMENT);
            this.uniforms.u_SpecularEnvSampler = TEXTURES.SPECULAR_ENVIRONMENT;
        }
    }

    private applyCamera():void{
        this.uniforms.Matrices = UBO_BINDINGS.CAMERA;
    }
}
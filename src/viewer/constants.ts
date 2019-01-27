export const TEXTURE_IDS = {
    ENVIRONMENT:0,
    POSITION: 1,
    NORMAL:2,
    DIFFUSE:3,
    ALBEDO: 3,
    SPECULAR:4,
    METAL_ROUGHNESS: 4,
    EMISSIVE:5,
    DEPTH:6,
    SHADOW_MAP:7,
    SSAONOISE:8,
    SSAO:9,
    DIFFUSE_ENVIRONMENT:10,
    SPECULAR_ENVIRONMENT:11,
    BRDF_LUT:12
};

export const CACHED_TEXTURES = {
    WHITE:'__white__',
    WHITE_CUBE:'__whiteCube__',
    BLACK:'__black__',
    BLACK_CUBE:'__blackCube__',
    POSITION:'__positionBuffer__',
    NORMAL:'__normalBuffer__',
    ALBEDO:'__albedoBuffer__',
    SPECULAR:'__specularBuffer__',
    METALLIC_ROUGHNESS:'__specularBuffer__',
    BRDF_LUT:'__brdfLUT__',
    DIFFUSE_ENVIRONMENT: '__diffuseEnvironment__',
    SPECULAR_ENVIRONMENT: '__specularEnvironment__',
    EMISSION:'__emissionBuffer__',
    POINT_SHADOW_MAP:'__pointShadowMap__',
    SHADOW_MAP:'__shadowMap__',
    SSAO_PREPASS:'__SSAOPrepass__',
    SSAO:'__SSAOTexture__',
    SSAO_NOISE:'__SSAONoise__',
    SKYBOX:'__skybox__'
};

export enum RENDER_MODE {
    PBR=0,
    LEGACY=1
}

export enum UBO_BINDINGS {
    CAMERA = 0
}
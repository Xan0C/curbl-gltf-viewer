export const TEXTURE_IDS = {
    DIFFUSE_ENVIRONMENT: 0,
    SPECULAR_ENVIRONMENT: 1,
    BRDF_LUT: 2,
    DIFFUSE: 3,
    METALLIC_ROUGHNESS: 4,
    NORMAL: 5,
    EMISSIVE: 6,
    OCCLUSION: 7
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

export enum UBO_BINDINGS {
    CAMERA = 0
}
export enum ALPHA_MODE  {
    OPAQUE = "OPAQUE",
    MASK = "MASK",
    BLEND = "BLEND"
}

export interface IGLTF_Material {
    name?:string;
    extensions?:{[id:string]:any};
    extras?:any;

    pbrMetallicRoughness?:IPBRMetallicRoughness;
    normalTexture?:INormalTextureinfo;
    occlusionTexture?:IOcclusionTextureinfo;
    emissiveTexture?:ITextureinfo;
    emissiveFactor:Array<number>;
    alphaMode:ALPHA_MODE;
    alphaCutoff:number;
    doubleSided:boolean;
}

export interface IPBRMetallicRoughness {
    baseColorFactor?:Array<number>; //[1,1,1,1]
    baseColorTexture?:ITextureinfo;
    metallicFactor?:number; //Default 1
    roughnessFactor?:number; //Default 1
    metallicRoughnessTexture?:ITextureinfo;
    extensions?:any;
    extras?:any;
}

export interface IPBRSpecularGlossiness {
    diffuseTexture?:ITextureinfo;
    specularGlossinessTexture?:ITextureinfo;
    diffuseFactor?:Array<number>; //Default: [1.0,1.0,1.0,1.0]
    specularFactor?:Array<number>; //Default: [1.0,1.0,1.0]
    glossinessFactor?:number;
}

export interface INormalTextureinfo extends ITextureinfo {
    scale?:number; //Default 1
}

export interface IOcclusionTextureinfo extends ITextureinfo {
    strength?:number; //Default 1
}

export interface ITextureinfo {
    index:number;
    texCoord?:number;
    extras?:any;
    extensions?:any;
}
import {IGLTF_Scene} from "./GLTF_Scene";
import {IGLTF_Node} from "./GLTF_Node";
import {IGLTF_Mesh} from "./GLTF_Mesh";
import {IGLTF_Buffer} from "./GLTF_Buffer";
import {IGLTF_BufferView} from "./GLTF_BufferView";
import {IGLTF_Accessor} from "./GLTF_Accessor";
import {IGLTF_Material} from "./GLTF_Material";
import {IGLTF_Image} from "./GLTF_Image";
import {IGLTF_Sampler} from "./GLTF_Sampler";
import {IGLTF_Texture} from "./GLTF_Texture";
import {IGLTF_Animation} from "./GLTF_Animation";
import {IGLTF_Camera} from "./GLTF_Camera";
import {IGLTF_Skin} from "./GLTF_Skin";

export interface IGLTF_Asset {
    generator?:string;
    version: string; //as of 2.0  version is mandatory
}

export interface IGLTF_Model {
    extensionsUsed?:string[];
    extensionsRequired?:string[];
    accessors?:Array<IGLTF_Accessor>;
    animations?:Array<IGLTF_Animation>;
    asset:IGLTF_Asset;
    buffers?:Array<IGLTF_Buffer>;
    bufferViews?:Array<IGLTF_BufferView>;
    cameras?:Array<IGLTF_Camera>;
    images?:Array<IGLTF_Image>;
    materials?:Array<IGLTF_Material>;
    meshes?:Array<IGLTF_Mesh>;
    nodes?:Array<IGLTF_Node>;
    samplers?:Array<IGLTF_Sampler>;
    scene?:number;
    scenes?:Array<IGLTF_Scene>;
    skins?:Array<IGLTF_Skin>;
    textures?:Array<IGLTF_Texture>;
    extensions?:{[id:string]:any};
    extras?:any;
}

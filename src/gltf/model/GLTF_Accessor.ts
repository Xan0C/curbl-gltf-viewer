import {GL_TYPES} from "../../gl/constants";

export enum ACCESSOR_TYPE  {
    SCALAR = "SCALAR",
    VEC2 = "VEC2",
    VEC3 = "VEC3",
    VEC4 = "VEC4",
    MAT2 = "MAT2",
    MAT3 = "MAT3",
    MAT4 = "MAT4"
}

export interface IGLTF_Accessor {
    name?:string;
    bufferView?:number;
    byteOffset:number;
    componentType:GL_TYPES;
    normalized:boolean;
    count:number;
    type:ACCESSOR_TYPE;
    max?:Array<number>;
    min?:Array<number>;
    sparse?:Object;
    extensions?:{[id:string]:any};
    extras?:any;
}
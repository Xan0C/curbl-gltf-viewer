import {GL_TYPES} from "../../gl/constants";
import {ACCESSOR_TYPE} from "../../model/data";

export interface IGLTF_Accessor {
    name?:string;
    bufferView?:number;
    byteOffset?:number;
    componentType:GL_TYPES;
    normalized?:boolean;
    count:number;
    type:ACCESSOR_TYPE;
    max?:Array<number>;
    min?:Array<number>;
    sparse?:Object;
    extensions?:{[id:string]:any};
    extras?:any;
}
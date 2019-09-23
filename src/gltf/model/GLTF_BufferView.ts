import {GL_BUFFERS} from "curbl-gl-util";

export interface IGLTF_BufferView {
    name?:string;
    buffer:number;
    byteOffset:number;
    byteLength:number;
    byteStride?:number;
    target?:GL_BUFFERS;
    extensions?:{[id:string]:any};
    extras?:any;
}
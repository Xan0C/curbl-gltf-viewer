export interface IGLTF_Buffer {
    name?:string;
    uri?:string;
    byteLength:number;
    extensions?:{[id:string]:any};
    extras?:any;
}
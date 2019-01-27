export interface IGLTF_Sampler {
    name?:string;
    magFilter?:number;
    minFilter?:number;
    wrapS?:number;
    wrapT?:number;
    extensions?:{[id:string]:any};
    extras?:any;
}
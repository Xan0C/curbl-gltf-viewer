import { IGLTF_Primitive } from './GLTF_Primitive';

export interface IGLTF_Mesh {
    name?: string;
    primitives: Array<IGLTF_Primitive>;
    weights?: Array<number>;
    extensions?: { [id: string]: any };
    extras?: any;
}

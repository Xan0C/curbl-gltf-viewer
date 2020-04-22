export interface IGLTF_Node {
    camera?: number;
    children?: Array<number>;
    skin?: number;
    matrix?: Array<number>;
    mesh?: number;
    rotation?: Array<number>;
    scale?: Array<number>;
    translation?: Array<number>;
    weights?: Array<number>;
    name?: string;
    extensions?: { [id: string]: any };
    extras?: any;
}

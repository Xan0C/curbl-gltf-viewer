export interface IGLTF_Skin {
    inverseBindMatrices?: number;
    skeleton?: number;
    joints: Array<number>;
    name?: string;
    extensions: {[id:string]:any};
    extras?: any;
}
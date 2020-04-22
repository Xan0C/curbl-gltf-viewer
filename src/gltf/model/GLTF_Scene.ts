export interface IGLTF_Scene {
    name?: string;
    nodes?: Array<number>;
    extensions?: { [id: string]: any };
    extras?: any;
}

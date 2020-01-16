export interface IGLTF_Primitive {
    attributes: { [id: string]: number };
    indices?: number;
    material?: number;
    targets?: Array<{ [id: string]: string }>;
    extensions?: { [id: string]: any };
    extras?: any;
    /**
     * default: 4 GL_TRIANGLE
     */
    mode?: number;
}

export interface IGLTF_Image {
    name?: string;
    uri?: string;
    mimeType?: string;
    bufferView?: number;
    extensions?: { [id: string]: any };
    extras?: any;
}

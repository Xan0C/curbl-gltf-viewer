export interface IGLTF_CameraOrthographic {
    xmag?: number;
    ymag?: number;
    zfar?: number;
    znear?: number;
    extensions?: { [id: string]: any };
    extras?: any;
}

export interface IGLTF_CameraPerspective {
    aspectRatio?: number;
    yfov?: number;
    zfar?: number;
    znear?: number;
    extensions?: { [id: string]: any };
    extras?: any;
}

export interface IGLTF_Camera {
    orthographic?: IGLTF_CameraOrthographic;
    perspective?: IGLTF_CameraPerspective;
    type?: 'perspective' | 'orthographic';
    extensions?: { [id: string]: any };
    extras?: any;
}

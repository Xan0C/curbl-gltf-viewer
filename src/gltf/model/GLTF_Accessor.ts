import { GL_TYPES } from '@curbl/gl-util';
import { ACCESSOR_TYPE } from '../../scene/data';

export interface IGLTF_Accessor {
    name?: string;
    bufferView?: number;
    byteOffset?: number;
    componentType: GL_TYPES;
    normalized?: boolean;
    count: number;
    type: ACCESSOR_TYPE;
    max?: Array<number>;
    min?: Array<number>;
    sparse?: Record<string, any>;
    extensions?: { [id: string]: any };
    extras?: any;
}

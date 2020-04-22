export interface IGLTF_AnimationSampler {
    input: number;
    interpolation?: 'LINEAR' | 'STEP' | 'CUBICSPLINE';
    output: number;
    extensions?: { [id: string]: any };
    extras?: any;
}

export interface IGLTF_Target {
    node?: number;
    path: 'translation' | 'rotation' | 'scale' | 'weights';
    extensions?: { [id: string]: any };
    extras?: any;
}

export interface IGLTF_Channel {
    sampler: number;
    target: IGLTF_Target;
    extensions?: { [id: string]: any };
    extras?: any;
}

export interface IGLTF_Animation {
    channels: IGLTF_Channel[];
    samplers: IGLTF_AnimationSampler[];
    name?: string;
    extensions?: { [id: string]: any };
    extras?: any;
}

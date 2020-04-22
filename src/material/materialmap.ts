/**
 * Created by Soeren on 31.10.2017.
 */
export interface ISampler {
    magFilter?: number;
    minFilter?: number;
    wrapS?: number;
    wrapT?: number;
}

export class Materialmap {
    private _texture: string;
    private _sampler?: ISampler;

    constructor(texture: string, sampler?: ISampler) {
        this._texture = texture;
        this._sampler = sampler;
    }

    public get texture(): string {
        return this._texture;
    }

    public set texture(value: string) {
        this._texture = value;
    }

    public get sampler(): ISampler {
        return this._sampler;
    }

    public set sampler(value: ISampler) {
        this._sampler = value;
    }
}

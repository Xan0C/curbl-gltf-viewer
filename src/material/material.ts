import {Materialmap} from "./materialmap";

export enum MATERIAL_TYPES {
    PBR
}

export enum MATERIAL_MAPS {
    ALBEDO,
    NORMAL,
    OCCLUSION,
    EMISSIVE,
    METAL_ROUGHNESS
}

export enum ALPHA_MODE {
    OPAQUE = "OPAQUE",
    MASK = "MASK",
    BLEND = "BLEND"
}

export class Material<T = any> {
    /**
     * material type PBR or SPECULAR
     * default PBR
     * @property
     */
    private _type:MATERIAL_TYPES;
    /**
     * name of the material
     * @property
     */
    protected _name:string;
    /**
     * List of maps for this material
     * @property
     */
    protected _maps:Array<Materialmap>;
    /**
     * Modeldata for the type of this Material e.g. MetallicRoughness,SpecularGlossiness data
     * @property
     */
    protected _model:T;

    private _alphaMode:ALPHA_MODE;
    private _alphaCutoff:number;
    private _doubleSided:boolean;

    constructor(name:string,model?:T){
        this._type = MATERIAL_TYPES.PBR;
        this.name = name;
        this._maps = [];
        this._model = model;
        this._alphaMode = ALPHA_MODE.OPAQUE;
        this._alphaCutoff = 0.5;
        this._doubleSided = false;
    }

    hasMap(key:MATERIAL_MAPS):boolean {
        return !!this._maps[key];
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    public get maps():Array<Materialmap> {
        return this._maps;
    }

    public set maps(value:Array<Materialmap>) {
        this._maps = value;
    }

    public get model():T {
        return this._model;
    }

    public set model(value:T) {
        this._model = value;
    }

    get type(): MATERIAL_TYPES {
        return this._type;
    }

    set type(value: MATERIAL_TYPES) {
        this._type = value;
    }

    get alphaMode(): ALPHA_MODE {
        return this._alphaMode;
    }

    set alphaMode(value: ALPHA_MODE) {
        this._alphaMode = value;
    }

    get alphaCutoff(): number {
        return this._alphaCutoff;
    }

    set alphaCutoff(value: number) {
        this._alphaCutoff = value;
    }

    get doubleSided(): boolean {
        return this._doubleSided;
    }

    set doubleSided(value: boolean) {
        this._doubleSided = value;
    }
}
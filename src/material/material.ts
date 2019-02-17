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

    constructor(name:string,model?:T){
        this._type = MATERIAL_TYPES.PBR;
        this.name = name;
        this._maps = [];
        this._model = model;
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
}
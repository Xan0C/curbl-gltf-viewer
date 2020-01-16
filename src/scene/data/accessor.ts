import {GL_TYPES} from "@curbl/gl-util";

export enum ACCESSOR_TYPE  {
    SCALAR = "SCALAR",
    VEC2 = "VEC2",
    VEC3 = "VEC3",
    VEC4 = "VEC4",
    MAT2 = "MAT2",
    MAT3 = "MAT3",
    MAT4 = "MAT4"
}

export const GLTF_ACCESORTYPE_SIZE:{[id:string]:number} = {
    [ACCESSOR_TYPE.SCALAR] : 1,
    [ACCESSOR_TYPE.VEC2]: 2,
    [ACCESSOR_TYPE.VEC3]: 3,
    [ACCESSOR_TYPE.VEC4]: 4,
    [ACCESSOR_TYPE.MAT2]: 4,
    [ACCESSOR_TYPE.MAT3]: 9,
    [ACCESSOR_TYPE.MAT4]: 16,
};

export class Accessor {
    private _bufferView:number;
    private _byteOffset:number;
    private _componentType:GL_TYPES; //GL_FLOAT etc.
    private _type:ACCESSOR_TYPE;
    private _stride?:number;
    private _normalized:boolean;
    private _count?:number;
    private _max?:Array<number>;
    private _min?:Array<number>;

    constructor(){
        this._byteOffset = 0;
        this._componentType = GL_TYPES.FLOAT;
        this._stride = 0;
        this._normalized = false;
        this._max = [];
        this._min = [];
    }

    public get bufferView():number {
        return this._bufferView;
    }

    public set bufferView(value:number) {
        this._bufferView = value;
    }

    public get byteOffset():number {
        return this._byteOffset;
    }

    public set byteOffset(value:number) {
        this._byteOffset = value;
    }

    public get componentType():GL_TYPES {
        return this._componentType;
    }

    public set componentType(value:GL_TYPES) {
        this._componentType = value;
    }

    public get stride():number {
        return this._stride;
    }

    public set stride(value:number) {
        this._stride = value;
    }

    public get normalized():boolean {
        return this._normalized;
    }

    public set normalized(value:boolean) {
        this._normalized = value;
    }

    public get componentTypeCount():number {
        return GLTF_ACCESORTYPE_SIZE[this._type];
    }

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        this._count = value;
    }

    get max(): Array<number> {
        return this._max;
    }

    set max(value: Array<number>) {
        this._max = value;
    }

    get min(): Array<number> {
        return this._min;
    }

    set min(value: Array<number>) {
        this._min = value;
    }

    get type(): ACCESSOR_TYPE {
        return this._type;
    }

    set type(value: ACCESSOR_TYPE) {
        this._type = value;
    }
}
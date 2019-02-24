import {GL_TYPES} from "../../gl/constants";

export class Accessor {
    private _bufferView?:number;
    private _byteOffset:number;
    private _type:GL_TYPES; //GL_FLOAT etc.
    private _stride?:number;
    private _normalized:boolean;
    private _componentTypeCount?:number;
    private _count?:number;

    constructor(){
        this._bufferView = 0;
        this._byteOffset = 0;
        this._type = GL_TYPES.FLOAT;
        this._stride = 0;
        this._normalized = false;
        this._componentTypeCount = 0;
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

    public get type():GL_TYPES {
        return this._type;
    }

    public set type(value:GL_TYPES) {
        this._type = value;
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
        return this._componentTypeCount;
    }

    public set componentTypeCount(value:number) {
        this._componentTypeCount = value;
    }

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        this._count = value;
    }
}
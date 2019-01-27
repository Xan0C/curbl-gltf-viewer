import {Quaternion, Vector} from "../math";

export class MetallicRoughness {
    private _emissiveFactor:Vector;
    private _baseColorFactor:Quaternion;
    private _metallicFactor:number;
    private _roughnessFactor:number;

    constructor(){
        this._baseColorFactor = new Quaternion(1,1,1,1);
        this._metallicFactor = 1;
        this._roughnessFactor = 1;
        this._emissiveFactor = new Vector(0,0,0);
    }

    get baseColorFactor(): Quaternion {
        return this._baseColorFactor;
    }

    set baseColorFactor(value: Quaternion) {
        this._baseColorFactor = value;
    }

    get metallicFactor(): number {
        return this._metallicFactor;
    }

    set metallicFactor(value: number) {
        this._metallicFactor = value;
    }

    get roughnessFactor(): number {
        return this._roughnessFactor;
    }

    set roughnessFactor(value: number) {
        this._roughnessFactor = value;
    }

    get emissiveFactor(): Vector {
        return this._emissiveFactor;
    }

    set emissiveFactor(value: Vector) {
        this._emissiveFactor = value;
    }
}
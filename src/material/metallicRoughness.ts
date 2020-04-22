import { vec3, vec4 } from 'gl-matrix';

export class MetallicRoughness {
    private _emissiveFactor: vec3;
    private _baseColorFactor: vec4;
    private _metallicFactor: number;
    private _roughnessFactor: number;
    private _normalScale: number;
    private _occlusionStrength: number;

    constructor() {
        this._baseColorFactor = vec4.fromValues(1, 1, 1, 1);
        this._metallicFactor = 1;
        this._roughnessFactor = 1;
        this._normalScale = 1;
        this._occlusionStrength = 1;
        this._emissiveFactor = vec3.create();
    }

    get baseColorFactor(): vec4 {
        return this._baseColorFactor;
    }

    set baseColorFactor(value: vec4) {
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

    get emissiveFactor(): vec3 {
        return this._emissiveFactor;
    }

    set emissiveFactor(value: vec3) {
        this._emissiveFactor = value;
    }

    get normalScale(): number {
        return this._normalScale;
    }

    set normalScale(value: number) {
        this._normalScale = value;
    }

    get occlusionStrength(): number {
        return this._occlusionStrength;
    }

    set occlusionStrength(value: number) {
        this._occlusionStrength = value;
    }
}

import {Color, Vector} from "../math";

export class SpecularGlossiness {
    private _specularExponent:number;
    private _normalScale:number;
    private _occlusionStrength:number;
    private _diffuseColor:Color;
    private _specularColor:Color;
    private _ambientColor:Color;
    private _emissiveFactor:Vector;

    constructor(kd:Color=new Color(1,1,1),ks:Color = new Color(1,1,1),ka:Color=new Color(1,1,1),ns:number=0){
        this._specularExponent = ns;
        this._ambientColor = ka;
        this._specularColor = ks;
        this._diffuseColor = kd;
        this._occlusionStrength = 1;
        this._emissiveFactor = new Vector(0,0,0);
    }

    public get specularExponent():number {
        return this._specularExponent;
    }

    public set specularExponent(value:number) {
        this._specularExponent = value;
    }

    public get diffuseColor():Color {
        return this._diffuseColor;
    }

    public set diffuseColor(value:Color) {
        this._diffuseColor = value;
    }

    public get specularColor():Color {
        return this._specularColor;
    }

    public set specularColor(value:Color) {
        this._specularColor = value;
    }

    public get ambientColor():Color {
        return this._ambientColor;
    }

    public set ambientColor(value:Color) {
        this._ambientColor = value;
    }

    public get emissiveFactor():Vector {
        return this._emissiveFactor;
    }

    public set emissiveFactor(value:Vector) {
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
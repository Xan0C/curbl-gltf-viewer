import {IComponent} from "curbl-ecs";
import {Color} from "../../math";

export interface BaseLightConfig  {
    color?: {r:number,g:number,b:number},
    ambientIntensity?: number,
    diffuseIntensity?: number,
    specularIntensity?:number
};

export abstract class BaseLight implements IComponent{

    private _color:Color;
    private _ambientIntensity:number;
    private _diffuseIntensity:number;
    private _specularIntensity:number;

    constructor(config:BaseLightConfig={
        color: {r:1,g:1,b:1},
        ambientIntensity: 0.05,
        diffuseIntensity: 0.5,
        specularIntensity: 0.2
    }){
        this.init(config);
    }

    init(config:BaseLightConfig={
        color: {r:1,g:1,b:1},
        ambientIntensity: 0.05,
        diffuseIntensity: 0.5,
        specularIntensity: 0.2
    }){
        config.color = config.color||{r:1,g:1,b:1};
        this._color = new Color(config.color.r,config.color.g,config.color.b);
        this._ambientIntensity = config.ambientIntensity||0.05;
        this._diffuseIntensity = config.diffuseIntensity||0.5;
        this._specularIntensity = config.specularIntensity||0.2;
    }

    remove():void {
    }

    public get color():Color {
        return this._color;
    }

    public set color(value:Color) {
        this._color = value;
    }

    public get ambientIntensity():number {
        return this._ambientIntensity;
    }

    public set ambientIntensity(value:number) {
        this._ambientIntensity = value;
    }

    public get diffuseIntensity():number {
        return this._diffuseIntensity;
    }

    public set diffuseIntensity(value:number) {
        this._diffuseIntensity = value;
    }

    public get specularIntensity():number {
        return this._specularIntensity;
    }

    public set specularIntensity(value:number) {
        this._specularIntensity = value;
    }
}
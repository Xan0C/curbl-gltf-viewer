import {ECS} from "curbl-ecs";
import {BaseLight, BaseLightConfig} from "./baseLight";

export interface PointLightConfig extends BaseLightConfig {
    attenuation?: {constant:number,linear:number,quadratic:number}
}

@ECS.Component()
export class PointLightComponent extends BaseLight {
    private _attenuation: {constant:number,linear:number,quadratic:number};
    private _radius:number;

    constructor(config:PointLightConfig={
        attenuation: {constant:1,linear:0.7,quadratic:1.8}
    }){
        super(config);
    }

    init(config:PointLightConfig={
        attenuation: {constant:1,linear:0.7,quadratic:1.8}
    }):void {
        super.init(config);
        this._attenuation = config.attenuation||{constant:1,linear:0.7,quadratic:1.8};
        this._radius = this.calcRadius();
    }

    private calcRadius():number{
        let maxchannel = Math.max(this.color.r,this.color.g,this.color.b);
        let ret = (-this._attenuation.linear +
            Math.sqrt(this._attenuation.linear * this._attenuation.linear -
                4 * this._attenuation.quadratic * (this._attenuation.constant - 256 * maxchannel)))/
            (2 * this._attenuation.quadratic);
        return ret;
    }

    public get attenuation():{ constant:number; linear:number; quadratic:number } {
        return this._attenuation;
    }

    public set attenuation(value:{ constant:number; linear:number; quadratic:number }) {
        this._attenuation = value;
    }

    public get radius():number {
        return this._radius;
    }

    public set radius(value:number) {
        this._radius = value;
    }
}
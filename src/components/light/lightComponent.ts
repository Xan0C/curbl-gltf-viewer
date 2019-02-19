import {ECS, IComponent} from "curbl-ecs";
import {Color} from "../../math";
import {vec3} from "gl-matrix";

export interface BaseLightConfig  {
    lightColor: [number, number, number]
    lightScale: number,
    lightRotation: number,
    lightPitch: number
}

@ECS.Component()
export class LightComponent implements IComponent{

    private _color:Color;
    private _direction: vec3;
    private _lightColor: [number, number, number];
    private _lightScale: number;
    private _lightRotation: number;
    private _lightPitch: number;

    constructor(config:BaseLightConfig={
        lightColor: [255, 255, 255],
        lightScale: 1.0,
        lightRotation: 75,
        lightPitch: 40
    }){
        this.init(config);
    }

    init(config:BaseLightConfig={
        lightColor: [255, 255, 255],
        lightScale: 1.0,
        lightRotation: 75,
        lightPitch: 40
    }){
        this._direction = vec3.create();
        this._color = new Color();

        this._lightColor = config.lightColor;
        this._lightScale = config.lightScale;
        this._lightRotation = config.lightRotation;
        this._lightPitch = config.lightPitch;
        this.updateLight();
    }

    remove():void {
    }

    public updateLight() {
        this._color.r = this._lightScale * this._lightColor[0]/255;
        this._color.g = this._lightScale * this._lightColor[1]/255;
        this._color.b = this._lightScale * this._lightColor[2]/255;

        const rot = this._lightRotation * Math.PI / 180;
        const pitch = this._lightPitch * Math.PI / 180;

        vec3.set(
            this._direction,
            Math.sin(rot) * Math.cos(pitch),
            Math.sin(pitch),
            Math.cos(rot) * Math.cos(pitch)
        );
    }

    get lightColor(): [number, number, number] {
        return this._lightColor;
    }

    set lightColor(value: [number, number, number]) {
        this._lightColor = value;
    }

    get lightScale(): number {
        return this._lightScale;
    }

    set lightScale(value: number) {
        this._lightScale = value;
    }

    get lightRotation(): number {
        return this._lightRotation;
    }

    set lightRotation(value: number) {
        this._lightRotation = value;
    }

    get lightPitch(): number {
        return this._lightPitch;
    }

    set lightPitch(value: number) {
        this._lightPitch = value;
    }

    public get color():Color {
        return this._color;
    }

    public set color(value:Color) {
        this._color = value;
    }

    get direction(): vec3 {
        return this._direction;
    }

    set direction(value: vec3) {
        this._direction = value;
    }
}
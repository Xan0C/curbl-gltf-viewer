import {ECS, IComponent} from "curbl-ecs";
import {vec3} from "gl-matrix";

export type LookAtCameraConfig = {
    target?:vec3,
    up?:vec3,
    panning?:vec3,
    zoom?:vec3,
    fov?:number,
    near?:number,
    far?:number,
    aspect?:number,
    orthogonal?:boolean;
};

@ECS.Component()
export class LookAtCameraComponent implements IComponent{

    protected _target:vec3;
    protected _up:vec3;
    protected _panning:vec3;
    protected _zooming:vec3;
    protected _zoomPos:number;
    protected _aspect:number;

    constructor(config?:LookAtCameraConfig){
        this.init(config);
    }

    init(config:LookAtCameraConfig=
             {
                 aspect:16/9,
                 target: vec3.create(),
                 up: vec3.fromValues(0,1,0),
                 panning: vec3.create(),
                 zoom: vec3.create(),
                 fov:65 * Math.PI / 180,
                 near:0.045,
                 far:2000,
             }):void {
        this._target = config.target||vec3.create();
        this._up = config.up||vec3.fromValues(0,1,0);
        this._panning = config.panning||vec3.create();
        this._zooming = config.zoom||vec3.create();
        this._aspect = config.aspect||(16/9);
        this._zoomPos = 0;
    }

    remove():void {
    }

    public get target():vec3 {
        return this._target;
    }

    public set target(value:vec3) {
        this._target = value;
    }

    public get up():vec3 {
        return this._up;
    }

    public set up(value:vec3) {
        this._up = value;
    }

    public get panning():vec3 {
        return this._panning;
    }

    public set panning(value:vec3) {
        this._panning = value;
    }

    public get zooming():vec3 {
        return this._zooming;
    }

    public set zooming(value:vec3) {
        this._zooming = value;
    }

    public get zoomPos():number {
        return this._zoomPos;
    }

    public set zoomPos(value:number) {
        this._zoomPos = value;
    }

    public get aspect():number {
        return this._aspect;
    }

    public set aspect(value:number) {
        this._aspect = value;
    }
}
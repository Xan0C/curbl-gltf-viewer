import {ECS, IComponent} from "curbl-ecs";
import {Vector} from "../../math";

export type LookAtCameraConfig = {
    target?:Vector,
    up?:Vector,
    panning?:Vector,
    zoom?:Vector,
    fov?:number,
    near?:number,
    far?:number,
    aspect?:number,
    orthogonal?:boolean;
};

@ECS.Component()
export class LookAtCameraComponent implements IComponent{

    protected _target:Vector;
    protected _up:Vector;
    protected _panning:Vector;
    protected _zooming:Vector;
    protected _zoomPos:number;
    protected _aspect:number;

    constructor(config?:LookAtCameraConfig){
        this.init(config);
    }

    init(config:LookAtCameraConfig=
             {
                 aspect:16/9,
                 target: new Vector(0,0,0),
                 up: new Vector(0,1,0),
                 panning: new Vector(0,0,0),
                 zoom: new Vector(0,0,0),
                 fov:65,
                 near:0.045,
                 far:2000,
             }):void {
        this._target = config.target||new Vector(0,0,0);
        this._up = config.up||new Vector(0,1,0);
        this._panning = config.panning||new Vector(0,0,0);
        this._zooming = config.zoom||new Vector(0,0,0);
        this._aspect = config.aspect||(16/9);
        this._zoomPos = 0;
    }

    remove():void {
    }

    public get target():Vector {
        return this._target;
    }

    public set target(value:Vector) {
        this._target = value;
    }

    public get up():Vector {
        return this._up;
    }

    public set up(value:Vector) {
        this._up = value;
    }

    public get panning():Vector {
        return this._panning;
    }

    public set panning(value:Vector) {
        this._panning = value;
    }

    public get zooming():Vector {
        return this._zooming;
    }

    public set zooming(value:Vector) {
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
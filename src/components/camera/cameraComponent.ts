import {ECS, IComponent} from "curbl-ecs";
import {Matrix} from "../../math";

export type CameraConfig = {
    viewMatrix?:Matrix,
    projMatrix?:Matrix
};

@ECS.Component('CameraComponent')
export class CameraComponent implements IComponent{

    private _viewMatrix:Matrix;
    private _projMatrix:Matrix;

    constructor(config:CameraConfig={}){
       this.init(config);
    }

    init(config?:CameraConfig):void {
        this._viewMatrix = config.viewMatrix||Matrix.setIdentity();
        this._projMatrix = config.projMatrix||Matrix.setPerspective(90,16/9,0.05,1000);
    }

    remove():void {
        this._viewMatrix.identity();
        this._projMatrix.identity();
    }

    public get viewMatrix():Matrix {
        return this._viewMatrix;
    }

    public set viewMatrix(value:Matrix) {
        this._viewMatrix = value;
    }

    public get projMatrix():Matrix {
        return this._projMatrix;
    }

    public set projMatrix(value:Matrix) {
        this._projMatrix = value;
    }
}

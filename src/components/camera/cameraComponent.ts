import {ECS, IComponent} from "curbl-ecs";
import {mat4, vec3} from "gl-matrix";

export type CameraConfig = {
    viewMatrix?:mat4,
    projMatrix?:mat4
};

@ECS.Component('CameraComponent')
export class CameraComponent implements IComponent{

    private _viewMatrix:mat4;
    private _projMatrix:mat4;

    constructor(config:CameraConfig={}){
       this.init(config);
    }

    init(config?:CameraConfig):void {
        if(!config.projMatrix) {
            this._viewMatrix = mat4.create();
            mat4.lookAt(
                this._viewMatrix,
                vec3.fromValues(0,0,8),
                vec3.fromValues(0,0,0),
                vec3.fromValues(0,1,0),
            );
        }else {
            this._viewMatrix = config.viewMatrix;
        }
        if(!config.projMatrix) {
            this._projMatrix = mat4.create();
            mat4.perspective(this._projMatrix, 45.0 * Math.PI / 180.0, 16 / 9, 0.01, 100.0);
        }else {
            this._projMatrix = config.projMatrix;
        }
    }

    remove():void {
        mat4.identity(this._viewMatrix);
        mat4.identity(this._projMatrix);
    }

    public get viewMatrix():mat4 {
        return this._viewMatrix;
    }

    public set viewMatrix(value:mat4) {
        this._viewMatrix = value;
    }

    public get projMatrix():mat4 {
        return this._projMatrix;
    }

    public set projMatrix(value:mat4) {
        this._projMatrix = value;
    }
}

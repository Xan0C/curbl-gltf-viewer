import {ECS, Component} from "curbl-ecs";
import {mat4} from "gl-matrix";

export type CameraConfig = {
    viewMatrix?:mat4,
    projMatrix?:mat4,
    fovy?: number,
    aspect?: number,
    near?: number,
    far?: number
};

@ECS.Component('CameraComponent')
export class CameraComponent implements Component {

    private _viewMatrix:mat4;
    private _projMatrix:mat4;

    constructor(config:CameraConfig={
        fovy: 0.785,
        aspect: 16/9,
        near: 0.01,
        far: 100
    }){
       this.init(config);
    }

    init(config?:CameraConfig):void {
        if(!config.projMatrix) {
            this._viewMatrix = mat4.create();
        }else {
            this._viewMatrix = config.viewMatrix;
        }
        if(!config.projMatrix) {
            this._projMatrix = mat4.create();
            mat4.perspective(this._projMatrix, config.fovy||0.785, config.aspect||(16/9), config.near||0.01, config.far||100);
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

import {ECS, IComponent} from "curbl-ecs";

export type MeshConfig = {key:string};

@ECS.Component()
export class ModelComponent implements IComponent {
    private _key:string;

    constructor(config:MeshConfig){
        this._key = config.key;
    }

    init(config:MeshConfig){
        this._key = config.key;
    }

    remove():void {
    }

    public get key():string {
        return this._key;
    }

    public set key(value:string) {
        this._key = value;
    }
}
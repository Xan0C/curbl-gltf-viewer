import {ECS, Component} from "@curbl/ecs";

export type SceneComponentConfig = {key:string};

@ECS.Component()
export class SceneComponent implements Component {
    private _key:string;

    constructor(config:SceneComponentConfig){
        this._key = config.key;
    }

    init(config:SceneComponentConfig){
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
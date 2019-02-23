import {ECS, IComponent} from "curbl-ecs";

export type SceneConfig = {key:string};

@ECS.Component()
export class SceneComponent implements IComponent {
    private _key:string;

    constructor(config:SceneConfig){
        this._key = config.key;
    }

    init(config:SceneConfig){
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
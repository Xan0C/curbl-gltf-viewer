import {ECS, IComponent} from "curbl-ecs";

export type IBLComponentConfig = {
    specularEnvironment?: string;
    diffuseEnvironment?: string;
    brdfLUT?: string;
};

@ECS.Component()
export class IBLComponent implements IComponent {

    private _specularEnvironment: string;
    private _diffuseEnvironment: string;
    private _brdfLUT: string;

    constructor(config:IBLComponentConfig={}){
        this.init(config);
    }

    init(config: IBLComponentConfig={}): void {
        this._diffuseEnvironment = config.diffuseEnvironment;
        this._specularEnvironment = config.specularEnvironment;
        this._brdfLUT = config.brdfLUT;
    }

    remove(): void {
        this._diffuseEnvironment = undefined;
        this._specularEnvironment = undefined;
        this._brdfLUT = undefined;
    }

    get specularEnvironment(): string {
        return this._specularEnvironment;
    }

    set specularEnvironment(value: string) {
        this._specularEnvironment = value;
    }

    get diffuseEnvironment(): string {
        return this._diffuseEnvironment;
    }

    set diffuseEnvironment(value: string) {
        this._diffuseEnvironment = value;
    }

    get brdfLUT(): string {
        return this._brdfLUT;
    }

    set brdfLUT(value: string) {
        this._brdfLUT = value;
    }
}
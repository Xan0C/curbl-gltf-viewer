import {ECS, IComponent} from "curbl-ecs";
import {BaseLight, BaseLightConfig} from "./baseLight";

@ECS.Component()
export class DirectLightComponent extends BaseLight implements IComponent {

    constructor(config?:BaseLightConfig){
        super(config);
    }
}
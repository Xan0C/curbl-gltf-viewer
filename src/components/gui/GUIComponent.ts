import {ECS, IComponent} from "curbl-ecs";

export type GUIComponentConfig = {
    folder?: string;
    properties: Array<{
        isColor?: boolean;
        prop: any;
        propName: string;
        min?: number;
        max?: number;
        onChange?: (value) => void;
        onFinishChange?: (value) => void;
    }>
};

@ECS.Component()
export class GUIComponent implements IComponent {

    public config: GUIComponentConfig;

    constructor(config: GUIComponentConfig) {
        this.init(config);
    }

    init(config: GUIComponentConfig): void {
        this.config = config;
    }

    remove(): void {
    }
}
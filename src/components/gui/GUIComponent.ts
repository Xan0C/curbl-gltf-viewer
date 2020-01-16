import {ECS, Component} from "@curbl/ecs";

export type GUIComponentConfig = {
    folder?: string;
    properties: Array<{
        isColor?: boolean;
        prop: any;
        propName: string;
        min?: number;
        max?: number;
        items?: Array<string>|{[x:string]:any};
        onChange?: (value) => void;
        onFinishChange?: (value) => void;
    }>
};

@ECS.Component()
export class GUIComponent implements Component {

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
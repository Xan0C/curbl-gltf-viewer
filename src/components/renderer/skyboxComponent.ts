import { ECS, Component } from '@curbl/ecs';

export type SkyboxComponentConfig = {
    texture?: string;
};

@ECS.Component()
export class SkyboxComponent implements Component {
    private _texture: string;

    constructor(config: SkyboxComponentConfig = {}) {
        this.init(config);
    }

    init(config: SkyboxComponentConfig = {}): void {
        this._texture = config.texture;
    }

    remove(): void {
        this._texture = undefined;
    }

    get texture(): string {
        return this._texture;
    }

    set texture(value: string) {
        this._texture = value;
    }
}

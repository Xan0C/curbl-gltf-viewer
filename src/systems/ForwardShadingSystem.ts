import {ECS, System} from "curbl-ecs";
import {Cache} from "../cache";
import {ForwardLightPass} from "./ForwardLightPass";

@ECS.System()
export class ForwardShadingSystem extends System {

    private gl: WebGL2RenderingContext;
    private cache: Cache;

    private forwardLightningPass: ForwardLightPass;

    constructor(config: {gl: WebGL2RenderingContext, cache: Cache}) {
        super();
        this.gl = config.gl;
        this.cache = config.cache;
    }

    setUp(): void {
        this.forwardLightningPass = ECS.addSystem(new ForwardLightPass({gl: this.gl, cache: this.cache}));
    }

    tearDown(): void {
        ECS.removeSystem(this.forwardLightningPass);
        ECS.removeSystem(this);
    }
}
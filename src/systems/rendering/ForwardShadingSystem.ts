import {ECS, System} from "curbl-ecs";
import {Cache} from "../../cache";
import {ForwardLightPass} from "./ForwardLightPass";
import {Shader} from "../../scene/shader";

@ECS.System()
export class ForwardShadingSystem extends System {

    private gl: WebGL2RenderingContext;
    private cache: Cache;
    private forwardLightningPass: ForwardLightPass;
    private shader: Shader;

    constructor(config: {gl: WebGL2RenderingContext, cache: Cache, shader: Shader}) {
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
    }

    setUp(): void {
        this.forwardLightningPass = ECS.addSystem(new ForwardLightPass({gl: this.gl, cache: this.cache, shader: this.shader}));
    }

    tearDown(): void {
        ECS.removeSystem(this.forwardLightningPass);
        ECS.removeSystem(this);
    }
}
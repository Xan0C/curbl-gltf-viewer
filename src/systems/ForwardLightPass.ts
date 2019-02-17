import {ECS, IEntity, System} from "curbl-ecs";
import {LightComponent} from "../components";
import {Cache} from "../cache";
import {ForwardModelPass} from "./ForwardModelPass";
import {Shader} from "../model/shader";

@ECS.System(LightComponent)
export class ForwardLightPass extends System {

    private gl:WebGL2RenderingContext;
    private cache:Cache;
    private modelPass:ForwardModelPass;
    private shader: Shader;

    constructor(config:{gl: WebGL2RenderingContext, cache: Cache, shader: Shader}){
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
    }

    setUp():void{
        this.modelPass = ECS.addSystem(new ForwardModelPass({gl:this.gl,cache:this.cache,shader:this.shader}));
    }

    tearDown():void {
        ECS.removeSystem(this.modelPass);
    }
    
    render():void {

        //this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.shader.bind();
        for(let i=0, light:IEntity; light = this.entities[i]; i++) {
            this.shader.uniforms.u_LightColor = light.get(LightComponent).color.elements;
            this.shader.uniforms.u_LightDirection = light.get(LightComponent).direction.elements;
            this.modelPass.draw();
        }
        this.shader.unbind();

        //this.gl.disable(this.gl.CULL_FACE);
        this.gl.disable(this.gl.DEPTH_TEST);
    }

}
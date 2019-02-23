import {ECS, IEntity, System} from "curbl-ecs";
import {LightComponent} from "../components";
import {Cache} from "../cache";
import {ForwardScenePass} from "./ForwardScenePass";
import {Shader} from "../scene/shader";

@ECS.System(LightComponent)
export class ForwardLightPass extends System {

    private gl:WebGL2RenderingContext;
    private cache:Cache;
    private scenePass:ForwardScenePass;
    private shader: Shader;

    constructor(config:{gl: WebGL2RenderingContext, cache: Cache, shader: Shader}){
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
    }

    setUp():void{
        this.scenePass = ECS.addSystem(new ForwardScenePass({gl:this.gl,cache:this.cache,shader:this.shader}));
    }

    tearDown():void {
        ECS.removeSystem(this.scenePass);
    }
    
    render():void {

        //this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.shader.bind();
        for(let i=0, light:IEntity; light = this.entities[i]; i++) {
            this.shader.uniforms.u_LightColor = light.get(LightComponent).color.elements;
            this.shader.uniforms.u_LightDirection = light.get(LightComponent).direction;
            this.scenePass.draw();
        }
        this.shader.unbind();

        //this.gl.disable(this.gl.CULL_FACE);
        this.gl.disable(this.gl.DEPTH_TEST);
    }

}
import {ECS, IEntity, System} from "curbl-ecs";
import {TransformComponent} from "../components";
import {Cache} from "../cache";
import {PointLightComponent} from "../components/light/pointLightComponent";
import {Vector} from "../math";
import {ForwardModelPass} from "./ForwardModelPass";
import {KhronosPbrShader} from "../shader/khronosPbrShader";

@ECS.System(PointLightComponent, TransformComponent)
export class ForwardLightPass extends System {

    private gl:WebGL2RenderingContext;
    private cache:Cache;
    private modelPass:ForwardModelPass;
    private shader: KhronosPbrShader;

    constructor(config:{gl: WebGL2RenderingContext, cache: Cache}){
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = new KhronosPbrShader(this.gl,this.cache);
    }

    setUp():void{
        this.modelPass = ECS.addSystem(new ForwardModelPass({gl:this.gl,cache:this.cache,shader:this.shader}));
    }

    tearDown():void {
        ECS.removeSystem(this.modelPass);
    }

    /**
     * Clear rendering Context
     * @param colorBuffer
     * @param depthBuffer
     * @param color
     */
    private clearContext(colorBuffer:boolean=true,depthBuffer:boolean=false,color:{r:number,g:number,b:number,a:number}={r:0,g:0,b:0,a:1}){
        this.gl.clearColor(color.r,color.g,color.b,color.a);
        if(colorBuffer && depthBuffer){
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
        }else if(colorBuffer){
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }else if(depthBuffer){
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }
    }

    render():void {
        this.clearContext(true,true,{r:0.2,g:0.2,b:0.2,a:1});

        this.gl.disable(this.gl.BLEND);
        this.gl.depthFunc(this.gl.LESS);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthMask(true);

        const r = 75 * Math.PI / 180;
        const p = 40 * Math.PI / 180;
        const direction = new Vector(Math.sin(r) * Math.cos(p),Math.sin(p),Math.cos(r)*Math.cos(p));


        this.shader.bind();
        //Can only have 1 light currently
        for(let i=0, light:IEntity; light = this.entities[i]; i++) {

            this.shader.uniforms.u_LightPosition = direction.elements;
            this.shader.uniforms.u_LightColor = light.get(PointLightComponent).color.elements;
            this.modelPass.draw();
        }
        this.shader.unbind();

        this.gl.disable(this.gl.BLEND);
        this.gl.depthFunc(this.gl.LESS);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.depthMask(true);
    }

}
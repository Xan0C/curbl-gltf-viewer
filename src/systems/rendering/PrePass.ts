import {ECS, System} from "curbl-ecs";

@ECS.System()
export class PrePass extends System {

    private gl:WebGL2RenderingContext;

    constructor(gl:WebGL2RenderingContext) {
        super();
        this.gl = gl;
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

    render() {
        this.clearContext(true,true, {r: 0, g:0, b: 0, a:0});
    }
}
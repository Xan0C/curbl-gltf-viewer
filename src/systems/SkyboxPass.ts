import {ECS, System} from "curbl-ecs";
import {Shader} from "../scene/shader";
import {GLCube} from "../gl";
import {Cache, CACHE_TYPE} from "../cache";
import {GLOBAL_TEXTURES} from "../viewer/constants";

@ECS.System()
export class SkyboxPass extends System {

    private gl:WebGL2RenderingContext;
    private cache:Cache;
    private shader:Shader;
    private cube:GLCube;

    constructor(config:  {gl: WebGL2RenderingContext, cache: Cache, shader: Shader}){
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
        this.cube = new GLCube(this.gl);
    }

    setUp(){
        this.shader.bind();
        this.cube.vertexArrayObject.bind();
        this.cube.vertexArrayObject.addAttribute(this.cube.vertexBuffer,this.shader.attributes.getAttribute('a_Position'),3,this.gl.FLOAT,false,24,0);
        this.cube.vertexArrayObject.unbind();
        this.shader.unbind();
    }

    tearDown(): void {
    }

    render():void{
        if(this.cache.has(CACHE_TYPE.TEXTURE, GLOBAL_TEXTURES.SKYBOX)) {
            this.gl.depthFunc(this.gl.LEQUAL);

            this.shader.bind();
            this.shader.apply();
            this.cube.draw();
            this.shader.unbind();

            this.gl.depthFunc(this.gl.LESS);
        }
    }
}
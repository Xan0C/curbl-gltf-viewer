import {ECS, IEntity, System} from "curbl-ecs";
import {Cache, CACHE_TYPE} from "../../cache";
import {Model, SceneComponent, Shader} from "../..";
import {GLWiredCube} from "../../gl/primitives/GLWiredCube";

@ECS.System(SceneComponent)
export class DebugBVHThreePass extends System {
    private gl:WebGL2RenderingContext;
    private cache:Cache;
    private shader: Shader;
    private cube: GLWiredCube;

    constructor(config:{gl: WebGL2RenderingContext, cache: Cache, shader: Shader}){
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
        this.cube = new GLWiredCube(this.gl);
    }

    setUp():void{
        this.cube.vertexArrayObject.bind();
        this.cube.vertexArrayObject.addAttribute(this.cube.vertexBuffer,this.shader.attributes.getAttribute('a_Position'),3,this.gl.FLOAT,false,0,0);
        this.cube.vertexArrayObject.unbind();
    }

    render():void{
        for(let i=0, entity:IEntity; entity = this.entities[i]; i++) {
            this.drawScene(entity);
        }
    }

    private drawScene(entity:IEntity):void {
        const key = entity.get(SceneComponent).key;
        const scene = this.cache.get<Model>(CACHE_TYPE.MODEL,key);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.shader.bind();
        scene.bvh.debugRender(this.gl.LINES, this.cube, this.shader, scene.meshes[0].transform.modelMatrix);
        this.shader.unbind();
        this.gl.disable(this.gl.DEPTH_TEST);
    }
}
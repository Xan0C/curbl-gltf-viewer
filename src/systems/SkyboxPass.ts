import {ECS, IEntity, System} from "curbl-ecs";
import {SkyboxComponent} from "../components/renderer/skyboxComponent";
import {Shader} from "../model/shader";
import {GLCube} from "../gl";
import {Cache, CACHE_TYPE} from "../cache";
import {SYSTEM_EVENTS} from "curbl-ecs/lib/Events";
import {CACHED_TEXTURES} from "../viewer/constants";

@ECS.System(SkyboxComponent)
export class SkyboxPass extends System {

    private gl:WebGL2RenderingContext;
    private cache:Cache;
    private shader:Shader;
    private cube:GLCube;
    private _texture:string;

    constructor(config:  {gl: WebGL2RenderingContext, cache: Cache, shader: Shader}){
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
        this.cube = new GLCube(this.gl);
    }

    private initCube():void{
        this.shader.bind();
        this.cube.vertexArrayObject.bind();
        this.cube.vertexArrayObject.addAttribute(this.cube.vertexBuffer,this.shader.attributes.getAttribute('a_Position'),3,this.gl.FLOAT,false,24,0);
        this.cube.vertexArrayObject.unbind();
        this.shader.unbind();
    }

    setUp(){
        this.events.on(SYSTEM_EVENTS.ENTITY_ADDED,this.onEntityAdded,this);
        this.initCube();
    }

    tearDown(): void {
    }

    private onEntityAdded(entity:IEntity):void {
        const skybox = entity.get(SkyboxComponent);
        this.texture = skybox.texture || this._texture;
    }

    set texture(key:string) {
        this._texture = key;
        if (this.cache.has(CACHE_TYPE.TEXTURE, key)) {
            this.cache.add(
                CACHE_TYPE.TEXTURE,
                CACHED_TEXTURES.SKYBOX,
                this.cache.get(CACHE_TYPE.TEXTURE, key)
            );
        }
    }

    render():void{
        if(this.cache.has(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.SKYBOX)) {
            this.gl.depthFunc(this.gl.LEQUAL);

            this.shader.bind();
            this.shader.apply();
            this.cube.draw();
            this.shader.unbind();

            this.gl.depthFunc(this.gl.LESS);
        }
    }
}
import {ECS, IEntity, System} from "curbl-ecs";
import {SceneComponent} from "../../components";
import {Cache, CACHE_TYPE} from "../../cache";
import {SYSTEM_EVENTS} from "curbl-ecs/lib/Events";
import {GL_PRIMITIVES} from "../../gl/constants";
import {Model, Shader} from "../../model";
import {GLBuffer} from "../../gl";


@ECS.System(SceneComponent)
export class ForwardScenePass extends System {

    private gl:WebGL2RenderingContext;
    private cache:Cache;
    private shader: Shader;
    //use the same buffers for all scenes/meshes etc.
    private vertexBuffer:GLBuffer;
    private indexBuffer:GLBuffer;

    constructor(config:{gl: WebGL2RenderingContext, cache: Cache, shader: Shader}){
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
        this.vertexBuffer = GLBuffer.createVertexBuffer(this.gl);
        this.indexBuffer = GLBuffer.createIndexBuffer(this.gl);
    }

    setUp():void{
        this.events.on(SYSTEM_EVENTS.ENTITY_ADDED,this.initEntity,this);
    }

    /**
     * Init Shader for the Meshes
     * @param entity
     */
    private initEntity(entity:IEntity):void{
        const sceneComponent = entity.get(SceneComponent);
        const scene = this.cache.get<Model>(CACHE_TYPE.MODEL,sceneComponent.key);
        if(scene){
            scene.init(this.cache);
            scene.initBuffers(this.gl, this.vertexBuffer, this.indexBuffer);
            scene.upload();
            this.initShaderAttributes(scene);
        }else{
            console.warn('Their is no scene for key '+sceneComponent.key+' in the cache.');
        }
    }

    private initShaderAttributes(scene:Model):void{
        scene.addAttribute(GL_PRIMITIVES.POSITION,this.shader.attributes.getAttribute('a_Position'));
        scene.addAttribute(GL_PRIMITIVES.NORMAL,this.shader.attributes.getAttribute('a_Normal'));
        scene.addAttribute(GL_PRIMITIVES.TANGENT,this.shader.attributes.getAttribute('a_Tangent'));
        scene.addAttribute(GL_PRIMITIVES.TEXCOORD_0,this.shader.attributes.getAttribute('a_UV'));
        scene.addAttribute(GL_PRIMITIVES.JOINTS_0,this.shader.attributes.getAttribute('a_Joint0'));
        scene.addAttribute(GL_PRIMITIVES.WEIGHTS_0,this.shader.attributes.getAttribute('a_Weight0'));
    }

    draw():void{
        for(let i=0, entity:IEntity; entity = this.entities[i]; i++) {
            this.drawScene(entity);
        }
    }

    private drawScene(entity:IEntity):void {
        const key = entity.get(SceneComponent).key;
        const scene = this.cache.get<Model>(CACHE_TYPE.MODEL,key);
        this.shader.apply();
        scene.draw(this.shader);
    }
}
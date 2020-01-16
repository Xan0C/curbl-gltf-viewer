import {ECS, Entity, System} from "curbl-ecs";
import {SceneComponent} from "../../components";
import {Cache, CACHE_TYPE} from "../../cache";
import {SYSTEM_EVENTS} from "curbl-ecs/lib/Events";
import {GL_PRIMITIVES} from "curbl-gl-util";
import {Scene, Shader} from "../../scene";


@ECS.System(SceneComponent)
export class ForwardScenePass extends System {

    private gl:WebGL2RenderingContext;
    private cache:Cache;
    private shader: Shader;
    //use the same data for all scenes/meshes etc.
    // private vertexBuffer:GLBuffer;
    // private indexBuffer:GLBuffer;

    constructor(config:{gl: WebGL2RenderingContext, cache: Cache, shader: Shader}){
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
        // this.vertexBuffer = GLBuffer.createVertexBuffer(this.gl);
        // this.indexBuffer = GLBuffer.createIndexBuffer(this.gl);
    }

    setUp():void{
        this.events.on(SYSTEM_EVENTS.ENTITY_ADDED,this.initEntity,this);
    }

    /**
     * Init Shader for the Meshes
     * @param entity
     */
    private initEntity(entity:Entity):void{
        const sceneComponent = entity.get(SceneComponent);
        const scene = this.cache.get<Scene>(CACHE_TYPE.SCENE,sceneComponent.key);
        if(scene){
            scene.init(this.gl);
            scene.upload();
            this.initShaderAttributes(scene);
        }else{
            console.warn('Their is no scene for key '+sceneComponent.key+' in the cache.');
        }
    }

    private initShaderAttributes(scene:Scene):void{
        scene.addAttribute(GL_PRIMITIVES.POSITION,this.shader.attributes.getAttribute('a_Position'));
        scene.addAttribute(GL_PRIMITIVES.NORMAL,this.shader.attributes.getAttribute('a_Normal'));
        scene.addAttribute(GL_PRIMITIVES.TANGENT,this.shader.attributes.getAttribute('a_Tangent'));
        scene.addAttribute(GL_PRIMITIVES.TEXCOORD_0,this.shader.attributes.getAttribute('a_UV'));
        scene.addAttribute(GL_PRIMITIVES.JOINTS_0,this.shader.attributes.getAttribute('a_Joint0'));
        scene.addAttribute(GL_PRIMITIVES.WEIGHTS_0,this.shader.attributes.getAttribute('a_Weight0'));
    }

    draw():void{
        for(let i=0, entity:Entity; entity = this.entities[i]; i++) {
            this.drawScene(entity);
        }
    }

    private drawScene(entity:Entity):void {
        const key = entity.get(SceneComponent).key;
        const scene = this.cache.get<Scene>(CACHE_TYPE.SCENE,key);
        this.shader.apply();
        scene.draw(this.shader,this.cache);
    }

}
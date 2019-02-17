import {ECS, IEntity, System} from "curbl-ecs";
import {ModelComponent, TransformComponent} from "../components";
import {Cache, CACHE_TYPE} from "../cache";
import {SYSTEM_EVENTS} from "curbl-ecs/lib/Events";
import {Model} from "../model";
import {GL_PRIMITIVES} from "../gl/constants";
import {Shader} from "../model/shader";
import {Matrix} from "../math";
// import {GLBuffer} from "../gl";

@ECS.System(ModelComponent,TransformComponent)
export class ForwardModelPass extends System {

    private gl:WebGL2RenderingContext;
    private cache:Cache;
    private shader: Shader;
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
    private initEntity(entity:IEntity):void{
        let modelComponent = entity.get(ModelComponent);
        let model = this.cache.get<Model>(CACHE_TYPE.MODEL,modelComponent.key);
        if(model){
            model.init(this.gl);
            model.upload();
            this.initShaderAttributes(model);
        }else{
            console.warn('Their is no mesh for key '+modelComponent.key+' in the cache.');
        }
    }

    private initShaderAttributes(model:Model):void{
        model.addAttribute(GL_PRIMITIVES.POSITION,this.shader,this.shader.attributes.getAttribute('a_Position'));
        model.addAttribute(GL_PRIMITIVES.NORMAL,this.shader,this.shader.attributes.getAttribute('a_Normal'));
        model.addAttribute(GL_PRIMITIVES.TANGENT,this.shader,this.shader.attributes.getAttribute('a_Tangent'));
        model.addAttribute(GL_PRIMITIVES.TEXCOORD_0,this.shader,this.shader.attributes.getAttribute('a_UV'));
    }

    draw():void{
        for(let i=0, entity:IEntity; entity = this.entities[i]; i++) {
            this.drawModel(entity);
        }
    }

    private drawModel(entity:IEntity):void {
        const key = entity.get(ModelComponent).key;
        const model = this.cache.get<Model>(CACHE_TYPE.MODEL,key);

        const modelTransform = model.transform.modelMatrix;
        const transformComponent =  entity.get(TransformComponent).modelMatrix;
        this.shader.uniforms.u_ModelMatrix = Matrix.multiply(transformComponent, modelTransform).elements;

        this.shader.apply(model);
        model.draw(this.shader,this.cache);
    }

}
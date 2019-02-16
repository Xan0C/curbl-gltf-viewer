import {ECS, IEntity, System} from "curbl-ecs";
import {CameraComponent, TransformComponent} from "../components";
import {GLUniformBufferObject} from "../gl/GLUniformBufferObject";
import {UBO_BINDINGS} from "../viewer/constants";
import {SYSTEM_EVENTS} from "curbl-ecs/lib/Events";

/**
 * Handle Camera component
 */
@ECS.System(TransformComponent,CameraComponent)
export class CameraSystem extends System {

    /**
     * Active Camera Entity
     */
    private _camera:IEntity;
    private cameraUBO: GLUniformBufferObject;
    private gl:WebGL2RenderingContext;

    constructor(config:{gl: WebGL2RenderingContext}){
        super();
        this.gl = config.gl;
    }

    setUp():void{
        this.cameraUBO = new GLUniformBufferObject(this.gl,UBO_BINDINGS.CAMERA);
        this.cameraUBO.addItem("projectionMatrix","mat4");
        this.cameraUBO.addItem("viewMatrix","mat4");
        this.cameraUBO.addItem("viewPos","vec3");
        this.events.on(SYSTEM_EVENTS.ENTITY_ADDED,this.initEntity,this);
        this.events.on(SYSTEM_EVENTS.ENTITY_REMOVED,this.removeEntity,this);
    }

    initEntity(entity:IEntity):void {
        if(!this._camera){
            this._camera = entity;
            const camera = this._camera.get(CameraComponent);
            const transform = this._camera.get(TransformComponent);
            this.cameraUBO.updateItem("projectionMatrix",camera.projMatrix.elements);
            this.cameraUBO.updateItem("viewMatrix",camera.viewMatrix.elements);
            this.cameraUBO.updateItem("viewPos",transform.modelMatrix.translation.elements);
            this.cameraUBO.upload();
            this.cameraUBO.bindUBO();
        }
    }

    removeEntity(entity:IEntity):void{
        if(entity === this._camera){
            this._camera = undefined;
        }
    }

    render():void {
        if(this._camera) {
            const camera = this._camera.get(CameraComponent);
            const transform = this._camera.get(TransformComponent);
            this.cameraUBO.updateItem("projectionMatrix", camera.projMatrix.elements, true);
            this.cameraUBO.updateItem("viewMatrix", camera.viewMatrix.elements, true);
            this.cameraUBO.updateItem("viewPos", transform.modelMatrix.translation.elements, true);
        }
    }

    public get camera():IEntity {
        return this._camera;
    }

    public set camera(value:IEntity) {
        this._camera = value;
    }
}
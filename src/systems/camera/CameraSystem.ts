import { ECS, Entity, System } from '@curbl/ecs';
import { CameraComponent, TransformComponent } from '../../components';
import { GLUniformBufferObject } from '@curbl/gl-util';
import { UBO_BINDINGS } from '../../viewer/constants';
import { SYSTEM_EVENTS } from '@curbl/ecs/lib/Events';
import { mat4, vec3 } from 'gl-matrix';

/**
 * Handle Camera component
 */
@ECS.System(TransformComponent, CameraComponent)
export class CameraSystem extends System {
    /**
     * Active Camera Entity
     */
    private _camera: Entity;
    private cameraUBO: GLUniformBufferObject;
    private gl: WebGL2RenderingContext;

    private translation: vec3;

    constructor(config: { gl: WebGL2RenderingContext }) {
        super();
        this.gl = config.gl;
        this.translation = vec3.create();
    }

    setUp(): void {
        const initMatrix = mat4.create();
        this.cameraUBO = new GLUniformBufferObject(this.gl, UBO_BINDINGS.CAMERA);
        this.cameraUBO.addItem('projectionMatrix', 'mat4');
        this.cameraUBO.addItem('viewMatrix', 'mat4');
        this.cameraUBO.addItem('viewPos', 'vec3');
        this.cameraUBO.updateItem('projectionMatrix', initMatrix);
        this.cameraUBO.updateItem('viewMatrix', initMatrix);
        this.cameraUBO.updateItem('viewPos', this.translation);
        this.cameraUBO.upload();
        this.cameraUBO.bindUBO();
        this.events.on(SYSTEM_EVENTS.ENTITY_ADDED, this.initEntity, this);
        this.events.on(SYSTEM_EVENTS.ENTITY_REMOVED, this.removeEntity, this);
    }

    initEntity(entity: Entity): void {
        if (!this._camera) {
            this._camera = entity;
            const camera = this._camera.get(CameraComponent);
            const transform = this._camera.get(TransformComponent);
            this.cameraUBO.updateItem('projectionMatrix', camera.projMatrix);
            this.cameraUBO.updateItem('viewMatrix', camera.viewMatrix);
            this.cameraUBO.updateItem('viewPos', mat4.getTranslation(this.translation, transform.modelMatrix));
            this.cameraUBO.upload();
            this.cameraUBO.bindUBO();
        }
    }

    removeEntity(entity: Entity): void {
        if (entity === this._camera) {
            this._camera = undefined;
        }
    }

    render(): void {
        if (this._camera) {
            const camera = this._camera.get(CameraComponent);
            const transform = this._camera.get(TransformComponent);
            this.cameraUBO.updateItem('projectionMatrix', camera.projMatrix, true);
            this.cameraUBO.updateItem('viewMatrix', camera.viewMatrix, true);
            this.cameraUBO.updateItem('viewPos', mat4.getTranslation(this.translation, transform.modelMatrix), true);
        }
    }

    public get camera(): Entity {
        return this._camera;
    }

    public set camera(value: Entity) {
        this._camera = value;
    }
}

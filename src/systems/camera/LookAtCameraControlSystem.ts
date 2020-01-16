import { CameraComponent, LookAtCameraComponent, TransformComponent } from '../../components';
import { ECS, Entity, System } from '@curbl/ecs';
import { DomEvents } from '../../events/DomEvents';
import { mat4, quat, vec3 } from 'gl-matrix';
import { Canvas } from '../../canvas';
import { getVSpherePos, rotateAxisAngle } from '../../math';

@ECS.System(TransformComponent, CameraComponent, LookAtCameraComponent)
export class LookAtCameraControlSystem extends System {
    private lastMouseX: number;
    private lastMouseY: number;
    private drag: boolean;
    private canvas: Canvas;

    constructor(canvas: Canvas) {
        super();
        this.canvas = canvas;
        this.lastMouseX = -1;
        this.lastMouseY = -1;
        this.drag = false;
    }

    setUp(): void {
        this.canvas.element.addEventListener('mousedown', ev => this.onMouseDown(ev));
        this.canvas.element.addEventListener('mouseup', () => this.onMouseUp());
        this.canvas.element.addEventListener('mousemove', ev => this.onMouseMove(ev));

        DomEvents.onWheel.add(this.onMouseWheel, this);
        DomEvents.onKeyDown.add(this.onKeyDown, this);
    }

    public onMouseDown(ev: MouseEvent) {
        this.drag = true;
        if (this.lastMouseX === -1) {
            this.lastMouseX = ev.x;
        }
        if (this.lastMouseY === -1) {
            this.lastMouseY = ev.y;
        }
    }

    private calcTranslation(panning: vec3, zooming: vec3, rotation: quat): vec3 {
        const translation = vec3.create();
        vec3.add(translation, translation, panning);
        vec3.add(translation, translation, zooming);
        const vec3Rotation = vec3.fromValues(rotation[0] / rotation[3], rotation[1] / rotation[3], rotation[2] / rotation[3]);
        return vec3.add(translation, translation, vec3Rotation);
    }

    public onMouseUp() {
        for (let i = 0, entity: Entity; (entity = this.entities[i]); i++) {
            const transform = entity.get(TransformComponent);
            const perspective = entity.get(LookAtCameraComponent);

            const translation = this.calcTranslation(perspective.panning, perspective.zooming, transform.rotation);
            vec3.add(transform.translation, transform.translation, translation);

            vec3.add(perspective.target, perspective.target, perspective.panning);
            quat.set(transform.rotation, 0, 0, 0, transform.rotation[3]);
            vec3.set(perspective.panning, 0, 0, 0);
            vec3.set(perspective.zooming, 0, 0, 0);
        }
        this.drag = false;
        this.lastMouseX = -1;
        this.lastMouseY = -1;
    }

    public onMouseWheel(ev: WheelEvent) {
        for (let i = 0, entity: Entity; (entity = this.entities[i]); i++) {
            const transform = entity.get(TransformComponent);
            const perspective = entity.get(LookAtCameraComponent);

            this.zoom(entity, ev.deltaY, 0.001);
            const translation = this.calcTranslation(perspective.panning, perspective.zooming, transform.rotation);
            vec3.add(transform.translation, transform.translation, translation);
            vec3.set(perspective.zooming, 0, 0, 0);
        }
    }

    public onMouseMove(ev: MouseEvent) {
        if (this.drag) {
            for (let i = 0, entity: Entity; (entity = this.entities[i]); i++) {
                this.rotate(entity, ev.x, ev.y);
                this.lastMouseX = ev.x;
                this.lastMouseY = ev.y;
            }
        }
    }

    public onKeyDown(ev: KeyboardEvent): void {
        let y = 0;
        let x = 0;
        //W
        if (ev.key === 'w') {
            y += 0.1;
        }
        //S
        if (ev.key === 's') {
            y -= 0.1;
        }
        //A
        if (ev.key === 'a') {
            x += 0.1;
        }
        //D
        if (ev.key === 'd') {
            x -= 0.1;
        }

        for (let i = 0, entity: Entity; (entity = this.entities[i]); i++) {
            const perspective = entity.get(LookAtCameraComponent);
            const transform = entity.get(TransformComponent);
            this.pan(entity, x, y);
            const translation = this.calcTranslation(perspective.panning, perspective.zooming, transform.rotation);
            vec3.add(transform.translation, transform.translation, translation);
            vec3.add(perspective.target, perspective.target, perspective.panning);
            vec3.set(perspective.panning, 0, 0, 0);
        }
    }

    /**
     * Calculate the panning-plane
     */
    protected pan(entity: Entity, dx: number, dy: number) {
        const perspective = entity.get(LookAtCameraComponent);
        const transform = entity.get(TransformComponent);

        const aDir = vec3.create();
        vec3.subtract(aDir, perspective.target, transform.translation); //Vektor von Target nach Position
        vec3.normalize(aDir, aDir);
        const aRight = vec3.create();
        vec3.cross(aRight, aDir, perspective.up);
        vec3.normalize(aRight, aRight);
        const aUp = vec3.create();
        vec3.cross(aUp, aDir, aRight);
        //calc out vector(overwriting aRight, aUp)
        vec3.scale(aRight, aRight, dx);
        vec3.scale(aUp, aUp, dy);
        vec3.add(perspective.panning, aRight, aUp);
    }

    /**
     * Calculate camera zoom
     */
    protected zoom(entity: Entity, wheelDelta: number, delta: number) {
        const perspective = entity.get(LookAtCameraComponent);
        const transform = entity.get(TransformComponent);
        const dz = (perspective.zoomPos - wheelDelta) * delta;
        const aDir = vec3.create();
        vec3.subtract(aDir, perspective.target, transform.translation);
        const dist = vec3.length(aDir);
        vec3.normalize(aDir, aDir);
        if (dist - dz <= 1.0) {
            vec3.scale(perspective.zooming, aDir, dist - 1.0);
        } else {
            vec3.scale(perspective.zooming, aDir, dz);
        }
    }

    protected rotate(entity: Entity, x: number, y: number) {
        const perspective = entity.get(LookAtCameraComponent);
        const transform = entity.get(TransformComponent);
        const po = getVSpherePos(this.lastMouseX, this.lastMouseY, this.canvas.width, this.canvas.height);
        const pn = getVSpherePos(x, y, this.canvas.width, this.canvas.height);

        const poPn = vec3.create();
        vec3.subtract(poPn, po, pn);
        if (vec3.squaredLength(poPn) < 0.0001) {
            return;
        }

        let cosangle = vec3.dot(po, pn);
        if (cosangle > 1.0) {
            cosangle = 1;
        } else if (cosangle < -1.0) {
            cosangle = -1;
        }

        const angle = Math.acos(cosangle);
        const rotAxis = vec3.create();
        vec3.cross(rotAxis, pn, po);
        vec3.normalize(rotAxis, rotAxis);
        const subTranslationPerspective = vec3.create();
        vec3.subtract(subTranslationPerspective, transform.translation, perspective.target);
        const diff = vec3.fromValues(0, 0, vec3.length(subTranslationPerspective));
        const rotDiff = rotateAxisAngle(diff, rotAxis, angle);

        const cDir = vec3.create();
        vec3.subtract(cDir, perspective.target, transform.translation);
        vec3.normalize(cDir, cDir);
        const cRight = vec3.create();
        vec3.cross(cRight, cDir, perspective.up);
        vec3.normalize(cRight, cRight);

        const cUp = vec3.create();
        vec3.cross(cUp, cRight, cDir);

        const rotDiffW: vec3 = vec3.fromValues(
            cRight[0] * rotDiff[0] + cUp[0] * rotDiff[1] + -cDir[0] * rotDiff[2],
            cRight[1] * rotDiff[0] + cUp[1] * rotDiff[1] + -cDir[1] * rotDiff[2],
            cRight[2] * rotDiff[0] + cUp[2] * rotDiff[1] + -cDir[2] * rotDiff[2]
        );
        const out = vec3.create();
        vec3.subtract(out, rotDiffW, vec3.subtract(out, transform.translation, perspective.target));
        const w = transform.rotation[3];
        quat.set(transform.rotation, out[0] / w, out[1] / w, out[2] / w, w);
    }

    update(): void {
        for (let i = 0, entity: Entity; (entity = this.entities[i]); i++) {
            const camera = entity.get(CameraComponent);
            const transform = entity.get(TransformComponent);
            const perspective = entity.get(LookAtCameraComponent);

            //Update
            const translation = this.calcTranslation(perspective.panning, perspective.zooming, transform.rotation);
            vec3.add(transform.translation, transform.translation, translation);
            vec3.add(perspective.target, perspective.target, perspective.panning);

            quat.set(transform.rotation, 0, 0, 0, transform.rotation[3]);
            vec3.set(perspective.panning, 0, 0, 0);
            vec3.set(perspective.zooming, 0, 0, 0);

            //Apply to camera localMatrix
            const target = vec3.create();
            vec3.add(target, perspective.target, perspective.panning);
            const position = vec3.create();
            vec3.add(position, perspective.panning, perspective.zooming);
            vec3.add(position, position, transform.translation);
            mat4.lookAt(camera.viewMatrix, position, target, perspective.up);
        }
    }
}

import {CameraComponent, LookAtCameraComponent, TransformComponent} from "../components";
import {ECS, IEntity, ISystem, System} from "curbl-ecs";
import {Math3d} from "../math";
import {DomEvents} from "../events/DomEvents";
import {mat4, quat, vec3} from "gl-matrix";

@ECS.System(TransformComponent,CameraComponent,LookAtCameraComponent)
export class LookAtCameraControlSystem extends System implements ISystem {
    private lastMouseX:number;
    private lastMouseY:number;
    private drag:boolean;
    private display: {width: number, height: number};

    constructor(config:{width: number, height:number}){
        super();
        this.display = config;
        this.lastMouseX = -1;
        this.lastMouseY = -1;
        this.drag = false;
    }

    setUp():void{
        DomEvents.onMouseDown.add(this.onMouseDown,this);
        DomEvents.onMouseUp.add(this.onMouseUp,this);
        //DomEvents.onMouseWheel.add(this.onMouseWheel,this);
        DomEvents.onMouseMove.add(this.onMouseMove,this);
        DomEvents.onKeyDown.add(this.onKeyDown,this);
    }

    public onMouseDown(ev:MouseEvent){
        this.drag = true;
        if(this.lastMouseX===-1){
            this.lastMouseX = ev.x;
        }
        if(this.lastMouseY===-1){
            this.lastMouseY = ev.y;
        }
    }

    private calcTranslation(panning:vec3, zooming:vec3, rotation:quat):vec3 {
        const translation = vec3.create();
        vec3.add(translation, translation, panning);
        vec3.add(translation, translation, zooming);
        const vec3Rotation = vec3.fromValues(
            rotation[0]/rotation[3],
            rotation[1]/rotation[3],
            rotation[2]/rotation[3]
        );
        return vec3.add(translation, translation, vec3Rotation);
    }

    public onMouseUp(ev:MouseEvent){
        for(let i=0,entity:IEntity; entity = this.entities[i]; i++){
            let transform = entity.get(TransformComponent);
            let perspective = entity.get(LookAtCameraComponent);

            const translation = this.calcTranslation(
                perspective.panning,
                perspective.zooming,
                transform.rotation
            );
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

    public onMouseWheel(ev:MouseWheelEvent){
        for(let i=0,entity:IEntity; entity = this.entities[i]; i++) {
            let transform = entity.get(TransformComponent);
            let perspective = entity.get(LookAtCameraComponent);

            const delta = (ev.deltaX + ev.deltaY + ev.deltaZ)/3;
            this.zoom(entity, delta, 0.001);
            const translation = this.calcTranslation(
                perspective.panning,
                perspective.zooming,
                transform.rotation
            );
            vec3.add(transform.translation, transform.translation, translation);
            vec3.set(perspective.zooming, 0, 0, 0);
        }
    }

    public onMouseMove(ev:MouseEvent){
        if(this.drag){
            for(let i=0,entity:IEntity; entity = this.entities[i]; i++) {
                this.rotate(entity,ev.x, ev.y);
                this.lastMouseX = ev.x;
                this.lastMouseY = ev.y;
            }
        }
    }

    public onKeyDown(ev:KeyboardEvent):void{
        let y = 0;
        let x = 0;
        //W
        if(ev.key === "w") {
            y -= 0.1;
        }
        //S
        if(ev.key === "s"){
            y += 0.1;
        }
        //A
        if(ev.key === "a"){
            x -= 0.1;
        }
        //D
        if(ev.key === "d"){
            x += 0.1;
        }

        for(let i=0,entity:IEntity; entity = this.entities[i]; i++) {
            const perspective = entity.get(LookAtCameraComponent);
            const transform = entity.get(TransformComponent);
            this.pan(entity,x, y);
            const translation = this.calcTranslation(
                perspective.panning,
                perspective.zooming,
                transform.rotation
            );
            vec3.add(transform.translation, transform.translation, translation);
            vec3.add(perspective.target, perspective.target, perspective.panning);
            vec3.set(perspective.panning, 0, 0, 0);
        }
    }

    /**
     * Calculate the panning-plane
     */
    protected pan(entity:IEntity,dx:number,dy:number){
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
    protected zoom(entity:IEntity,wheelDelta:number,delta:number){
        const perspective = entity.get(LookAtCameraComponent);
        const transform = entity.get(TransformComponent);
        let dz = (perspective.zoomPos + wheelDelta)*delta;
        const aDir = vec3.create();
        vec3.subtract(aDir, perspective.target, transform.translation);
        const dist = vec3.length(aDir);
        vec3.normalize(aDir, aDir);
        if(dist-dz <= 1.0){
            vec3.scale(perspective.zooming, aDir, dist-1.0);
        }else {
            vec3.scale(perspective.zooming, aDir, dz);
        }
    }

    protected rotate(entity:IEntity,x:number,y:number){
        const perspective = entity.get(LookAtCameraComponent);
        const transform = entity.get(TransformComponent);
        const po = Math3d.getVSpherePos(this.lastMouseX,this.lastMouseY,this.display.width,this.display.height);
        const pn = Math3d.getVSpherePos(x,y,this.display.width,this.display.height);

        const poPn = vec3.create();
        vec3.subtract(poPn, po, pn);
        if(vec3.squaredLength(poPn) < 0.0001 ){
            return;
        }

        let cosangle = vec3.dot(po, pn);
        if(cosangle > 1.0){
            cosangle = 1;
        }
        else if(cosangle < -1.0){
            cosangle = -1;
        }

        let angle = Math.acos(cosangle);
        const rotAxis = vec3.create();
        vec3.cross(rotAxis, pn, po);
        vec3.normalize(rotAxis, rotAxis);
        const subTranslationPerspective = vec3.create();
        vec3.subtract(subTranslationPerspective, transform.translation, perspective.target);
        let diff = vec3.fromValues(0, 0, vec3.length(subTranslationPerspective));
        let rotDiff = Math3d.rotateAxisAngle(diff,rotAxis,angle);

        const cDir = vec3.create();
        vec3.subtract(cDir, perspective.target, transform.translation);
        vec3.normalize(cDir, cDir);
        const cRight = vec3.create();
        vec3.cross(cRight, cDir, perspective.up);
        vec3.normalize(cRight, cRight);

        const cUp = vec3.create();
        vec3.cross(cUp, cRight, cDir);

        const rotDiffW:vec3 = vec3.fromValues(
            cRight[0] * rotDiff[0] + cUp[0] * rotDiff[1] +  -cDir[0] * rotDiff[2],
            cRight[1] * rotDiff[0] + cUp[1] * rotDiff[1] +  -cDir[1] * rotDiff[2],
            cRight[2] * rotDiff[0] + cUp[2] * rotDiff[1] +  -cDir[2] * rotDiff[2],
        );
        const out = vec3.create();
        vec3.subtract(out, rotDiffW, vec3.subtract(out, transform.translation, perspective.target));
        const w = transform.rotation[3];
        quat.set(transform.rotation, out[0]/w, out[1]/w, out[2]/w, w);
    }

    update():void{
        for(let i=0, entity:IEntity; entity = this.entities[i]; i++){
            const camera = entity.get(CameraComponent);
            const transform = entity.get(TransformComponent);
            const perspective = entity.get(LookAtCameraComponent);

            //Update
            const translation = this.calcTranslation(
                perspective.panning,
                perspective.zooming,
                transform.rotation
            );
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
            mat4.lookAt(
                camera.viewMatrix,
                position,
                target,
                perspective.up
            );
        }
    }
}
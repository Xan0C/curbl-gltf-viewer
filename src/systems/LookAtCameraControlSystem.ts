import {CameraComponent, LookAtCameraComponent, TransformComponent} from "../components";
import {ECS, IEntity, ISystem, System} from "curbl-ecs";
import {Math3d, Matrix, Vector} from "../math";
import {DomEvents} from "../events/DomEvents";

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

    public onMouseUp(ev:MouseEvent){
        for(let i=0,entity:IEntity; entity = this.entities[i]; i++){
            let transform = entity.get(TransformComponent);
            let perspective = entity.get(LookAtCameraComponent);

            transform.translation = transform.translation.add(perspective.panning).add(perspective.zooming).add(transform.rotation.toVec3());
            perspective.target = perspective.target.add(perspective.panning);
            transform.rotation.x = transform.rotation.y = transform.rotation.z = 0;
            perspective.panning.x = perspective.panning.y = perspective.panning.z = 0;
            perspective.zooming.x = perspective.zooming.y = perspective.zooming.z = 0;
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
            transform.translation = transform.translation.add(perspective.panning).add(perspective.zooming).add(transform.rotation.toVec3());
            perspective.zooming.x = perspective.zooming.y = perspective.zooming.z = 0;
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
            transform.translation = transform.translation.add(perspective.panning).add(perspective.zooming).add(transform.rotation.toVec3());
            perspective.target = perspective.target.add(perspective.panning);
            perspective.panning.x = perspective.panning.y = perspective.panning.z = 0;
        }
    }

    /**
     * Calculate the panning-plane
     */
    protected pan(entity:IEntity,dx:number,dy:number){
        const perspective = entity.get(LookAtCameraComponent);
        const transform = entity.get(TransformComponent);
        let aDir = perspective.target.substract(transform.translation); //Vektor von Target nach Position
        aDir = aDir.normalize();
        let aRight = aDir.cross(perspective.up);
        aRight = aRight.normalize();
        let aUp = aDir.cross(aRight);
        perspective.panning = aRight.mult(dx).add(aUp.mult(dy));
    }

    /**
     * Calculate camera zoom
     */
    protected zoom(entity:IEntity,wheelDelta:number,delta:number){
        const perspective = entity.get(LookAtCameraComponent);
        const transform = entity.get(TransformComponent);
        let dz = (perspective.zoomPos + wheelDelta)*delta;
        let aDir = perspective.target.substract(transform.translation);
        let dist = aDir.length();
        aDir = aDir.normalize();
        if(dist-dz <= 1.0){
            perspective.zooming = aDir.mult(dist-1.0);
            return;
        }
        perspective.zooming = aDir.mult(dz);
    }

    protected rotate(entity:IEntity,x:number,y:number){
        const perspective = entity.get(LookAtCameraComponent);
        const transform = entity.get(TransformComponent);
        let po = Math3d.getVSpherePos(this.lastMouseX,this.lastMouseY,this.display.width,this.display.height);
        let pn = Math3d.getVSpherePos(x,y,this.display.width,this.display.height);

        if(po.substract(pn).lengthSquared() < 0.0001 ){
            return;
        }

        let cosangle = po.dot(pn);
        if(cosangle > 1.0){
            cosangle = 1;
        }
        else if(cosangle < -1.0){
            cosangle = -1;
        }

        let angle = Math.acos(cosangle);
        let rotAxis = pn.cross(po);
        rotAxis = rotAxis.normalize();
        let diff = new Vector(0,0,transform.translation.substract(perspective.target).length());
        let rotDiff = Math3d.rotateAxisAngle(diff,rotAxis,angle);

        let cDir = perspective.target.substract(transform.translation);
        cDir = cDir.normalize();
        let cUp = perspective.up;
        let cRight = cDir.cross(cUp);
        cRight = cRight.normalize();
        cRight = cRight.normalize();
        cUp = cRight.cross(cDir);

        let rotDiffW:Vector = new Vector();
        rotDiffW.x = cRight.x * rotDiff.x + cUp.x * rotDiff.y +  -cDir.x * rotDiff.z;
        rotDiffW.y = cRight.y * rotDiff.x + cUp.y * rotDiff.y +  -cDir.y * rotDiff.z;
        rotDiffW.z = cRight.z * rotDiff.x + cUp.z * rotDiff.y +  -cDir.z * rotDiff.z;
        transform.rotation.setXYZ(rotDiffW.substract(transform.translation.substract(perspective.target)));
    }

    update():void{
        for(let i=0, entity:IEntity; entity = this.entities[i]; i++){
            const camera = entity.get(CameraComponent);
            const transform = entity.get(TransformComponent);
            const perspective = entity.get(LookAtCameraComponent);

            //Update
            transform.translation = transform.translation.add(perspective.panning).add(perspective.zooming).add(transform.rotation.toVec3());
            perspective.target = perspective.target.add(perspective.panning);
            transform.rotation.x = transform.rotation.y = transform.rotation.z = 0;
            perspective.panning.x = perspective.panning.y = perspective.panning.z = 0;
            perspective.zooming.x = perspective.zooming.y = perspective.zooming.z = 0;

            //Apply to camera localMatrix
            let target =  perspective.target.add(perspective.panning);
            let position = transform.translation.add(perspective.panning).add(perspective.zooming);
            Matrix.setLookAt(position,target,perspective.up,camera.viewMatrix)
        }
    }
}
import {Mesh, Shader} from "../model";
import {UBO_BINDINGS} from "../viewer";
import {BoundingBox} from "../model/mesh/boundingBox";
import {mat4} from "gl-matrix";

export class BBoxShader extends Shader {

    constructor(gl:WebGL2RenderingContext){
        super(gl);
    }

    apply(mesh:Mesh, bbox:BoundingBox):void {
        const model = mat4.create();
        mat4.multiply(model, mesh.transform.modelMatrix, bbox.transform);
        this.uniforms.u_ModelMatrix = model;
        this.applyCamera();
    }

    applyCamera():void{
        this.uniforms.Matrices = UBO_BINDINGS.CAMERA;
    }
}
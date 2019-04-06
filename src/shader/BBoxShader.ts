import {Shader} from "../model";
import {UBO_BINDINGS} from "../viewer";
import {mat4, vec3} from "gl-matrix";

export class BBoxShader extends Shader {

    constructor(gl:WebGL2RenderingContext){
        super(gl);
    }

    apply(modelMatrix: mat4,  color?: vec3):void {
        this.uniforms.u_ModelMatrix = modelMatrix;
        this.uniforms.u_Color = color || vec3.fromValues(0,0,1);
        this.applyCamera();
    }

    applyCamera():void{
        this.uniforms.Matrices = UBO_BINDINGS.CAMERA;
    }
}
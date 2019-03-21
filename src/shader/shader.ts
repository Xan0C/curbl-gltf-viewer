import {GLShader} from "../gl/shader";
import {Mesh} from "../model/mesh/mesh";
import {Material} from "../material";

export interface IShader extends Shader {
    apply(...args):void;
    applyMaterial(material: Material):void;
    applyMesh(mesh: Mesh):void;
}

export class Shader extends GLShader implements IShader {

    constructor(gl: WebGL2RenderingContext, vertexSrc?:string, fragmentSrc?:string){
        super(gl, vertexSrc, fragmentSrc);
    }

    apply(...args):void {}
    applyMaterial(material: Material):void {}
    applyMesh(mesh: Mesh):void {}
}
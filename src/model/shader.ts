import {GLShader} from "../gl/shader";
import {Material} from "../material";

export interface IShader extends Shader {
    applyMaterial(...args):void;
}

export class Shader extends GLShader implements IShader {

    constructor(gl: WebGL2RenderingContext){
        super(gl);
    }

    applyMaterial(material:Material):void {}
    apply(...args):void {}
}
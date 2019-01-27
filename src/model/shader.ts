import {GLShader} from "../gl/shader";

export interface IShader extends Shader {
    apply(...args):void;
}

export class Shader extends GLShader implements IShader {

    constructor(gl:WebGL2RenderingContext,vertexSrc:string,fragmentSrc:string){
        super(gl,vertexSrc,fragmentSrc);
    }

    apply(...args):void {}
}
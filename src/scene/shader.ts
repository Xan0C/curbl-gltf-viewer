import {GLShader} from "curbl-gl-util";
import {Material} from "../material";
import {Mesh} from "./mesh";
import {SceneNode} from "./sceneNode";
import {Scene} from "./scene";

export interface IShader extends Shader {
    applyMaterial(...args):void;
}

export class Shader extends GLShader implements IShader {

    constructor(gl: WebGL2RenderingContext, vertexSrc?:string, fragmentSrc?:string){
        super(gl, vertexSrc, fragmentSrc);
    }

    apply():void {}
    applyMaterial(material: Material):void {}
    applyMesh(mesh: Mesh):void {}
    applyNode(node: SceneNode): void {}
    applyScene(scene: Scene): void {}
}
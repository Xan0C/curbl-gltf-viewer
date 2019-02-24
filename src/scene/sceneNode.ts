import {Transform} from "./transform";
import {Mesh} from "./mesh";
import {Attributes, GL_PRIMITIVES, GLBuffer} from "../gl";
import {Shader} from "./shader";
import GLAttribute = Attributes.GLAttribute;
import {Cache} from "../cache";

export class SceneNode {
    children?: Array<SceneNode>;
    transform?: Transform;
    mesh?:Mesh;
    name:string;

    constructor() {
        this.children = [];
    }

    init(gl: WebGL2RenderingContext, vertexBuffer?: GLBuffer, indexBuffer?:GLBuffer):SceneNode {
        if(this.mesh) {
            this.mesh.init(gl, vertexBuffer, indexBuffer);
        }
        for(let i=0, child:SceneNode; child = this.children[i]; i++) {
            child.init(gl, vertexBuffer, indexBuffer);
        }
        return this;
    }

    upload(): SceneNode {
        if(this.mesh) {
            this.mesh.upload();
        }
        return this;
    }

    draw(shader: Shader, cache:Cache):void {
        if(this.mesh) {
            shader.applyNode(this);
            this.mesh.draw(shader, cache);
        }
        for(let i=0, child:SceneNode; child = this.children[i]; i++) {
            child.draw(shader, cache);
        }
    }

    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key:GL_PRIMITIVES,shader:Shader,glAttribute:GLAttribute):void{
        if(this.mesh) {
            this.mesh.addAttribute(key, shader, glAttribute);
        }
        for(let i=0, child:SceneNode; child = this.children[i]; i++) {
            child.addAttribute(key, shader, glAttribute);
        }
    }

    addChild(child:SceneNode) {
        this.children.push(child);
    }
}
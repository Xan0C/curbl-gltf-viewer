import { Transform } from './transform';
import { Mesh } from './mesh';
import { GLAttribute, GL_PRIMITIVES, GLBuffer } from '@curbl/gl-util';
import { Shader } from './shader';
import { Cache } from '../cache';
import { Skin } from './skin/skin';

export class SceneNode {
    children?: Array<SceneNode>;
    transform?: Transform;
    mesh?: Mesh;
    skin?: Skin;
    name: string;

    constructor() {
        this.children = [];
    }

    init(gl: WebGL2RenderingContext, vertexBuffer?: GLBuffer, indexBuffer?: GLBuffer): SceneNode {
        if (this.mesh) {
            this.mesh.init(gl, vertexBuffer, indexBuffer);
        }
        if (this.skin) {
            this.skin.init(gl);
        }
        for (let i = 0, child: SceneNode; (child = this.children[i]); i++) {
            child.init(gl, vertexBuffer, indexBuffer);
        }
        return this;
    }

    upload(): SceneNode {
        if (this.mesh) {
            this.mesh.upload();
        }
        for (let i = 0, child: SceneNode; (child = this.children[i]); i++) {
            child.upload();
        }
        return this;
    }

    draw(shader: Shader, cache: Cache): void {
        if (this.mesh) {
            shader.applyNode(this);
            this.mesh.draw(shader, cache);
        }
        for (let i = 0, child: SceneNode; (child = this.children[i]); i++) {
            child.draw(shader, cache);
        }
    }

    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key: GL_PRIMITIVES, glAttribute: GLAttribute): void {
        if (this.mesh) {
            this.mesh.addAttribute(key, glAttribute);
        }
        for (let i = 0, child: SceneNode; (child = this.children[i]); i++) {
            child.addAttribute(key, glAttribute);
        }
    }

    addChild(child: SceneNode) {
        this.children.push(child);
    }
}

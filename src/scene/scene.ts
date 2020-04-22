import { SceneNode } from './sceneNode';
import { GLAttribute, GL_PRIMITIVES, GLBuffer } from '@curbl/gl-util';
import { Shader } from './shader';
import { Cache } from '../cache';
import { Mesh } from './mesh';
import { Animation } from './animation';

export class Scene {
    private _name: string;
    private _meshes: Array<Mesh>;
    private _animations: Array<Animation>;
    private _nodes: Array<SceneNode>;

    constructor() {
        this._nodes = [];
        this._meshes = [];
        this._animations = [];
    }

    /**
     * init the scene creating the GPUBuffers(Vertex- and Indexbuffer) or using an existing MeshBuffermap
     * or upload the data to an existing buffer
     * @param {WebGL2RenderingContext} gl
     * @param {GLBuffer} vertexBuffer - use existing VertexBuffer and add the gltf data into it
     * @param {GLBuffer} indexBuffer - use existing IndexBuffer and add the gltf indices into it
     * @returns {Mesh}
     */
    init(gl: WebGL2RenderingContext, vertexBuffer?: GLBuffer, indexBuffer?: GLBuffer): Scene {
        for (let i = 0, node: SceneNode; (node = this._nodes[i]); i++) {
            node.init(gl, vertexBuffer, indexBuffer);
        }
        return this;
    }

    /**
     * Make sure to initialize(init) the Mesh before uploading the data
     * Create the GPU_Buffers and upload this Mesh to the GPU
     * @returns {Mesh}
     */
    upload(): Scene {
        for (let i = 0, node: SceneNode; (node = this._nodes[i]); i++) {
            node.upload();
        }
        return this;
    }

    /**
     * Draws all Meshes in the scene
     * @param {Shader} shader - Shader that should be used for all primitives/Materials
     * @param {Cache} cache - cache to get the materials
     */
    draw(shader: Shader, cache: Cache): void {
        for (let i = 0, node: SceneNode; (node = this._nodes[i]); i++) {
            shader.applyScene(this);
            node.draw(shader, cache);
        }
    }

    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key: GL_PRIMITIVES, glAttribute: GLAttribute): void {
        for (let i = 0, node: SceneNode; (node = this._nodes[i]); i++) {
            node.addAttribute(key, glAttribute);
        }
    }

    addNode(...nodes: SceneNode[]) {
        for (let i = 0, node: SceneNode; (node = nodes[i]); i++) {
            this._nodes.push(node);
        }
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get meshes(): Array<Mesh> {
        return this._meshes;
    }

    set meshes(value: Array<Mesh>) {
        this._meshes = value;
    }

    get animations(): Array<Animation> {
        return this._animations;
    }

    set animations(value: Array<Animation>) {
        this._animations = value;
    }

    get root(): SceneNode {
        return this._nodes[0];
    }
}

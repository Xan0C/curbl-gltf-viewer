import {SceneNode} from "./sceneNode";
import {Attributes, GL_PRIMITIVES, GLBuffer} from "../gl";
import {Shader} from "./shader";
import GLAttribute = Attributes.GLAttribute;
import {Cache} from "../cache";

export class Scene {
    private _name:string;
    private nodes:Array<SceneNode>;

    constructor() {
        this.nodes = [];
    }

    /**
     * init the scene creating the GPUBuffers(Vertex- and Indexbuffer) or using an existing MeshBuffermap
     * or upload the data to an existing buffer
     * @param {WebGL2RenderingContext} gl
     * @param {GLBuffer} vertexBuffer - use existing VertexBuffer and add the gltf data into it
     * @param {GLBuffer} indexBuffer - use existing IndexBuffer and add the gltf indices into it
     * @returns {Mesh}
     */
    init(gl:WebGL2RenderingContext,vertexBuffer?:GLBuffer,indexBuffer?:GLBuffer):Scene {
        for(let i=0, node: SceneNode; node = this.nodes[i]; i++) {
                node.init(gl, vertexBuffer, indexBuffer);
        }
        return this;
    }

    /**
     * Make sure to initialize(init) the Mesh before uploading the data
     * Create the GPU_Buffers and upload this Mesh to the GPU
     * @returns {Mesh}
     */
    upload():Scene {
        for(let i=0, node: SceneNode; node = this.nodes[i]; i++) {
            node.upload();
        }
        return this;
    }

    /**
     * Draws all Meshes in the scene
     * @param {Shader} shader - Shader that should be used for all primitives/Materials
     * @param {Cache} cache - cache to get the materials
     */
    draw(shader: Shader, cache: Cache):void {
        for(let i=0, node: SceneNode; node = this.nodes[i]; i++) {
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
    addAttribute(key:GL_PRIMITIVES,glAttribute:GLAttribute):void{
        for(let i=0, node: SceneNode; node = this.nodes[i]; i++) {
            node.addAttribute(key, glAttribute);
        }
    }

    addNode(...nodes:SceneNode[]) {
        for(let i=0, node:SceneNode; node = nodes[i]; i++) {
            this.nodes.push(node);
        }
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
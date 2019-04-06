import {Attributes, GL_PRIMITIVES, GLBuffer} from "../gl";
import {Shader} from "../shader/shader";
import {Mesh} from "./mesh/mesh";
import {Animation} from "./animation";
import {Cache} from "../cache";
import {BufferView} from "./data";
import {Primitive} from "./mesh";
import {Skin} from "./skin";
import {Transform} from "./transform";
import {Material} from "../material";
import {BVHNode} from "./bvh/bvhNode";
import GLAttribute = Attributes.GLAttribute;

// type RenderList = {
//     material: Material; //apply mat
//     meshes: Array<{
//         mesh: Mesh, //apply mesh
//         primitives: Primitive // draw primitives
//     }>
// }

export class Model {
    private _name:string;
    private _meshes:Array<Mesh>;
    private _animations:Array<Animation>;
    private _bufferViews:Array<BufferView>;
    private _primitives:Array<Primitive>;
    private _skins:Array<Skin>;
    private _transforms:Array<Transform>;
    private _materials:Array<Material>;
    private _bvh:BVHNode;

    constructor() {
        this._meshes = [];
        this._animations = [];
        this._bufferViews = [];
        this._primitives = [];
        this._skins = [];
        this._transforms = [];
        this._materials = [];
        this._bvh = new BVHNode();
    }

    init(cache:Cache) {
        for(let i=0, mesh: Mesh; mesh = this._meshes[i]; i++) {
            mesh.init(cache);
        }
        this._bvh = BVHNode.constructTree(this._primitives);
    }

    /**
     * init the scene creating the GPUBuffers(Vertex- and Indexbuffer) or using an existing MeshBuffermap
     * or upload the data to an existing buffer
     * @param {WebGL2RenderingContext} gl
     * @param {GLBuffer} vertexBuffer - use existing VertexBuffer and add the gltf data into it
     * @param {GLBuffer} indexBuffer - use existing IndexBuffer and add the gltf indices into it
     * @returns {Mesh}
     */
    initBuffers(gl:WebGL2RenderingContext, vertexBuffer?:GLBuffer, indexBuffer?:GLBuffer):Model {
        for(let i=0, bufferView: BufferView; bufferView = this._bufferViews[i]; i++) {
            bufferView.init(gl, vertexBuffer, indexBuffer);
        }
        for(let i=0, skin: Skin; skin = this._skins[i]; i++) {
            skin.init(gl);
        }
        for(let i=0, primitive: Primitive; primitive = this._primitives[i]; i++) {
            primitive.init(gl);
        }
        return this;
    }

    /**
     * Make sure to initialize(init) the Mesh before uploading the data
     * Create the GPU_Buffers and upload this Mesh to the GPU
     * @returns {Mesh}
     */
    upload():Model {
        for(let i=0, bufferView: BufferView; bufferView = this._bufferViews[i]; i++) {
            bufferView.buffer.upload();
        }
        return this;
    }

    /**
     * Draws all Meshes in the scene
     * @param {Shader} shader - Shader that should be used for all primitives/Materials
     */
    draw(shader: Shader):void {
        for(let i=0, mesh: Mesh; mesh = this._meshes[i]; i++) {
            mesh.draw(shader);
        }
    }

    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key:GL_PRIMITIVES,glAttribute:GLAttribute):void{
        for(let i=0, mesh: Mesh; mesh = this._meshes[i]; i++) {
            mesh.addAttribute(key, glAttribute);
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

    get bufferViews(): Array<BufferView> {
        return this._bufferViews;
    }

    set bufferViews(value: Array<BufferView>) {
        this._bufferViews = value;
    }

    get primitives(): Array<Primitive> {
        return this._primitives;
    }

    set primitives(value: Array<Primitive>) {
        this._primitives = value;
    }

    get skins(): Array<Skin> {
        return this._skins;
    }

    set skins(value: Array<Skin>) {
        this._skins = value;
    }

    get transforms(): Array<Transform> {
        return this._transforms;
    }

    set transforms(value: Array<Transform>) {
        this._transforms = value;
    }

    get materials(): Array<Material> {
        return this._materials;
    }

    set materials(value: Array<Material>) {
        this._materials = value;
    }

    get bvh(): BVHNode {
        return this._bvh;
    }

    set bvh(value: BVHNode) {
        this._bvh = value;
    }
}
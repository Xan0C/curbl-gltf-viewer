import {Accessor, IndexAccessor} from "./accessor";
import {GL_PRIMITIVES, GL_TYPES, GLBuffer, GLVertexArrayObject} from "../../gl";

/**
 * GLTF Primitive wrapper
 * Primitive is a Geometric piece of the Mesh that uses a specific material
 * or. a stream of vertices that can be rendered together
 */
export class Primitive {
    private _name:string;
    private _draw_mode:number;
    private _attributes:{[id:string]:Accessor};
    private _indices:IndexAccessor;
    private _material:string;
    private _vertexArrayObject:GLVertexArrayObject;

    constructor(){
        this._attributes = Object.create(null);
        this._draw_mode = 4; //GL_TRIANGLE
        this._material = "__default__";
    }

    /**
     * Check if this mesh has the attribute
     * @param key - name/key of the attribute e.g. TANGENT,NORMAL,POSITION etc.
     */
    hasAttribute(key:GL_PRIMITIVES|string):boolean {
        return !!this._attributes[key];
    }

    /**
     * adds an attribute to the MeshPrimitive, that is later send to the GPU via an VAO
     * @param {GL_PRIMITIVES | string} key
     * @param {number} count
     * @param {GL_TYPES} type
     * @param {boolean} normalized
     * @param {number} stride
     * @param {number} byteOffset
     * @param {number} bufferView
     * @returns {Accessor}
     */
    public addAttribute(key:GL_PRIMITIVES|string, count:number, type:GL_TYPES, normalized:boolean=false, stride:number=0, byteOffset:number=0, bufferView:number):Accessor{
        const accessor = new Accessor();
        accessor.bufferView = bufferView;
        accessor.size = count;
        accessor.type = type;
        accessor.normalized = normalized;
        accessor.stride = stride;
        accessor.byteOffset = byteOffset;
        this._attributes[key] = accessor;
        return this._attributes[key];
    }

    /**
     * Sets the index accessor that is later used for the IndexBuffer as an attribute and send to the GPU
     * @param {number} count
     * @param {GL_TYPES} type
     * @param {number} byteOffset
     * @param {number} bufferView
     * @returns {IndexAccessor}
     */
    public setIndices(count:number, type:GL_TYPES, byteOffset:number=0, bufferView:number):IndexAccessor{
        this._indices = new IndexAccessor();
        this._indices.bufferView = bufferView;
        this._indices.count = count;
        this._indices.type = type;
        this._indices.byteOffset = byteOffset;
        return this._indices;
    }

    initVertexArrayObject(gl:WebGL2RenderingContext,indexBuffer:GLBuffer,vao?:GLVertexArrayObject):void{
        this._vertexArrayObject = vao||new GLVertexArrayObject(gl);
        this._vertexArrayObject.setIndexBuffer(indexBuffer);
    }

    /**
     * Should only be called by the Models draw method, to calculate the actual offset
     * which is the bufferOffset + bufferDataOffset + indexAccessorOffset
     * @param {number} mode
     * @param {number} size
     * @param {number} type
     * @param {number} offset
     */
    draw(mode:number=this._draw_mode,size:number=this._indices.count,type:number=this._indices.type,offset:number=this._indices.byteOffset):void{
        this._vertexArrayObject.bind();
        this._vertexArrayObject.draw(mode,size,type,offset);
        this._vertexArrayObject.unbind();
    }

    public get name():string {
        return this._name;
    }

    public set name(value:string) {
        this._name = value;
    }

    public get draw_mode():number {
        return this._draw_mode;
    }

    public set draw_mode(value:number) {
        this._draw_mode = value;
    }

    public get attributes():{ [p:string]:Accessor } {
        return this._attributes;
    }

    public set attributes(value:{ [p:string]:Accessor }) {
        this._attributes = value;
    }

    public get indices():IndexAccessor {
        return this._indices;
    }

    public set indices(value:IndexAccessor) {
        this._indices = value;
    }

    public get material():string {
        return this._material;
    }

    public set material(value:string) {
        this._material = value;
    }

    public get vertexArrayObject():GLVertexArrayObject {
        return this._vertexArrayObject;
    }

    public set vertexArrayObject(value:GLVertexArrayObject) {
        this._vertexArrayObject = value;
    }
}
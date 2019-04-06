import {Attributes, GL_PRIMITIVES, GLVertexArrayObject} from "../../gl";
import {Accessor, ACCESSOR_TYPE} from "../data/accessor";
import {BoundingBox} from "../bvh/boundingBox";
import {vec3} from "gl-matrix";
import GLAttribute = Attributes.GLAttribute;

/**
 * GLTF Primitive wrapper
 * Primitive is a Geometric piece of the Mesh that uses a specific material
 * or. a stream of vertices that can be rendered together
 */
export class Primitive {
    private _name:string;
    private _draw_mode:number;
    private _attributes:{[id:string]:Accessor};
    private _indices:Accessor;
    private _material:string;
    private _vertexArrayObject:GLVertexArrayObject;
    private _boundingBox: BoundingBox;
    public drawing: boolean = true;

    constructor(){
        this._attributes = Object.create(null);
        this._draw_mode = 4; //GL_TRIANGLE
        this._material = "__default__";
    }

    init(gl: WebGL2RenderingContext) {
        this.initBoundingBox();
        this.initVertexArrayObject(gl);
    }

    private initBoundingBox(): BoundingBox {
        const position = this._attributes[GL_PRIMITIVES.POSITION];
        if(position && position.type === ACCESSOR_TYPE.VEC3) {
            if(position.max && position.min) {
                this._boundingBox = new BoundingBox(
                    vec3.fromValues(position.min[0], position.min[1], position.min[2]),
                    vec3.fromValues(position.max[0], position.max[1], position.max[2])
                );
            }else {
                const min = vec3.fromValues(Infinity, Infinity, Infinity);
                const max = vec3.fromValues(-Infinity, -Infinity, -Infinity);
                const buffer = position.getData();
                for(let i=0; i < buffer.length; i+=3) {
                    min[0] = min[0] > buffer[i] ? buffer[i] : min[0];
                    min[1] = min[1] > buffer[i+1] ? buffer[i+1] : min[1];
                    min[2] = min[2] > buffer[i+2] ? buffer[i+2] : min[2];

                    max[0] = max[0] < buffer[i] ? buffer[i] : max[0];
                    max[1] = max[1] < buffer[i+1] ? buffer[i+1] : max[1];
                    max[2] = max[2] < buffer[i+2] ? buffer[i+2] : max[2];
                }
                this._boundingBox = new BoundingBox(min, max);
            }
        }
        return this._boundingBox;
    }

    hasAttribute(key:GL_PRIMITIVES|string):boolean {
        return !!this._attributes[key];
    }

    addAttribute(key:GL_PRIMITIVES, glAttribute:GLAttribute) {
        const attribute = this._attributes[key];
        if(attribute) {
            this._vertexArrayObject.addAttribute(
                attribute.bufferView.buffer,
                glAttribute,
                attribute.componentTypeSize,
                attribute.componentType,
                attribute.normalized,
                attribute.stride,
                attribute.bufferView.bufferOffset + attribute.byteOffset
            );
        }
    }

    initVertexArrayObject(gl:WebGL2RenderingContext):void{
        this._vertexArrayObject = new GLVertexArrayObject(gl);
        this._vertexArrayObject.setIndexBuffer(this._indices.bufferView.buffer);
    }

    /**
     * Should only be called by the Models draw method, to calculate the actual offset
     * which is the bufferOffset + bufferDataOffset + indexAccessorOffset
     * @param {number} mode
     * @param {number} size
     * @param {number} type
     * @param {number} offset
     */
    draw(mode:number=this._draw_mode, size:number=this._indices.count, type:number=this._indices.componentType, offset:number=this._indices.byteOffset+this._indices.bufferView.bufferOffset):void{
        if(this._vertexArrayObject && this.drawing) {
            this._vertexArrayObject.bind();
            this._vertexArrayObject.draw(mode, size, type, offset);
            this._vertexArrayObject.unbind();
        }
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    get draw_mode():number {
        return this._draw_mode;
    }

    set draw_mode(value:number) {
        this._draw_mode = value;
    }

    get attributes():{ [p:string]:Accessor } {
        return this._attributes;
    }

    set attributes(value:{ [p:string]:Accessor }) {
        this._attributes = value;
    }

    get indices():Accessor {
        return this._indices;
    }

    set indices(value:Accessor) {
        this._indices = value;
    }

    get material():string {
        return this._material;
    }

    set material(value:string) {
        this._material = value;
    }

    get boundingBox(): BoundingBox {
        return this._boundingBox || this.initBoundingBox();
    }

    get vertexArrayObject(): GLVertexArrayObject {
        return this._vertexArrayObject;
    }

    set vertexArrayObject(value: GLVertexArrayObject) {
        this._vertexArrayObject = value;
    }
}
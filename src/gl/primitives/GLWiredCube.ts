import {GLBuffer} from "../GLBuffer";
import {GLVertexArrayObject} from "../GLVertexArrayObject";

export class GLWiredCube {
    private static readonly INDEX_LENGTH:number = 24;
    private gl:WebGL2RenderingContext;
    private _vertexBuffer:GLBuffer;
    private _indexBuffer:GLBuffer;
    private _vertexArrayObject:GLVertexArrayObject;

    constructor(gl:WebGL2RenderingContext){
        this.gl = gl;
        this.createVertexData();
    }

    private createVertexData(){
        const vertices = new Float32Array([
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 1.0,

            0.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            0.0, 1.0, 1.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 1.0,
            0.0, 0.0, 1.0,

            1.0, 1.0, 0.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 0.0, 0.0,

            1.0, 0.0, 1.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 0.0, 1.0,
            0.0, 0.0, 1.0
        ]);

        const indices = new Uint8Array(GLWiredCube.INDEX_LENGTH);
        for(let i=0; i < GLWiredCube.INDEX_LENGTH; i++) {
            indices[i] = i;
        }

        this._vertexBuffer = GLBuffer.createVertexBuffer(this.gl,vertices,this.gl.STATIC_DRAW);
        if(!this._vertexBuffer){
            throw 'Failed to create VertexBuffer Object';
        }
        this._indexBuffer = GLBuffer.createIndexBuffer(this.gl,indices,this.gl.STATIC_DRAW);
        if(!this._indexBuffer){
            throw 'Failed to create IndexBuffer Object!';
        }
        this._vertexArrayObject = new GLVertexArrayObject(this.gl);
        this.vertexArrayObject.setIndexBuffer(this._indexBuffer);
    }

    get vertexBuffer(): GLBuffer {
        return this._vertexBuffer;
    }

    set vertexBuffer(value: GLBuffer) {
        this._vertexBuffer = value;
    }

    get indexBuffer(): GLBuffer {
        return this._indexBuffer;
    }

    set indexBuffer(value: GLBuffer) {
        this._indexBuffer = value;
    }

    get vertexArrayObject(): GLVertexArrayObject {
        return this._vertexArrayObject;
    }

    set vertexArrayObject(value: GLVertexArrayObject) {
        this._vertexArrayObject = value;
    }

    public draw(drawType:number = this.gl.LINES){
        this.vertexArrayObject.bind();
        this.gl.drawElements(drawType,GLWiredCube.INDEX_LENGTH,this.gl.UNSIGNED_BYTE,0);
        this.vertexArrayObject.unbind();
    }
}
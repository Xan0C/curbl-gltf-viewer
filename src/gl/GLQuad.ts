import {GLBuffer} from "./GLBuffer";
import {GLVertexArrayObject} from "./GLVertexArrayObject";
/**
 * Created by Soeren on 12.02.2017.
 */
export class GLQuad {
    private static readonly INDEX_LENGTH:number = 6;
    private readonly gl:WebGL2RenderingContext;
    private _vertexBuffer:GLBuffer;
    private _indexBuffer:GLBuffer;
    private _vertexArrayObject:GLVertexArrayObject;

    constructor(gl:WebGL2RenderingContext){
        this.gl = gl;
        this.createVertexData();
    }

    private createVertexData(){
        let vertices = new Float32Array([
            -1,1,0,1,
            -1,-1,0,0,
            1,1,1,1,
            1,-1,1,0
        ]);
        let indices = new Uint8Array(6);
        indices[0] = 0;
        indices[1] = 1;
        indices[2] = 2;
        indices[3] = 1;
        indices[4] = 2;
        indices[5] = 3;
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

    public draw(){
        this.vertexArrayObject.bind();
        this.gl.drawElements(this.gl.TRIANGLES,GLQuad.INDEX_LENGTH,this.gl.UNSIGNED_BYTE,0);
        this.vertexArrayObject.unbind();
    }
}
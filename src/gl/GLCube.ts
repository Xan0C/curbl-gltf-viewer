import {GLBuffer} from "./GLBuffer";
import {GLVertexArrayObject} from "./GLVertexArrayObject";
import {Vector} from "../math";
/**
 * Created by Soeren on 18.05.2017.
 */
export class GLCube {
    private static readonly INDEX_LENGTH:number = 36;
    private gl:WebGL2RenderingContext;
    private _vertexBuffer:GLBuffer;
    private _indexBuffer:GLBuffer;
    private _vertexArrayObject:GLVertexArrayObject;

    constructor(gl:WebGL2RenderingContext){
        this.gl = gl;
        this.createVertexData();
    }

    private calcVertexData():Float32Array {
        let vertices = [
            1,1,1,
            1,1,-1,
            1,-1,1,
            1,-1,-1,
            -1,-1,1,
            -1,1,1,
            -1,1,-1,
            -1,-1,-1
        ];
        let indices = [];
        //right
        indices[0] = 0;
        indices[1] = 1;
        indices[2] = 2;
        indices[3] = 1;
        indices[4] = 2;
        indices[5] = 3;
        //left
        indices[6] = 4;
        indices[7] = 5;
        indices[8] = 6;
        indices[9] = 4;
        indices[10] = 6;
        indices[11] = 7;
        //top
        indices[12] = 5;
        indices[13] = 6;
        indices[14] = 0;
        indices[15] = 0;
        indices[16] = 6;
        indices[17] = 1;
        //bottom
        indices[18] = 7;
        indices[19] = 2;
        indices[20] = 3;
        indices[21] = 7;
        indices[22] = 2;
        indices[23] = 4;
        //back
        indices[24] = 7;
        indices[25] = 6;
        indices[26] = 3;
        indices[27] = 6;
        indices[28] = 3;
        indices[29] = 1;
        //front
        indices[30] = 5;
        indices[31] = 4;
        indices[32] = 0;
        indices[33] = 0;
        indices[34] = 4;
        indices[35] = 2;

        let a,b,c;
        const fVertices = [];
        for(let i=0; i < indices.length; i+=3){
            a = new Vector();
            a.x = vertices[indices[i]*3];
            a.y = vertices[indices[i]*3+1];
            a.z = vertices[indices[i]*3+2];

            b = new Vector();
            b.x = vertices[indices[i+1]*3];
            b.y = vertices[indices[i+1]*3+1];
            b.z = vertices[indices[i+1]*3+2];

            c = new Vector();
            c.x = vertices[indices[i+2]*3];
            c.y = vertices[indices[i+2]*3+1];
            c.z = vertices[indices[i+2]*3+2];

            let ab = b.substract(a);
            let ac = c.substract(a);

            let normal = ab.cross(ac);
            normal = normal.normalize();

            fVertices.push(a.x,a.y,a.z,normal.x,normal.y,normal.z);
            fVertices.push(b.x,b.y,b.z,normal.x,normal.y,normal.z);
            fVertices.push(c.x,c.y,c.z,normal.x,normal.y,normal.z);
        }
        const arrayBuffer = new Float32Array(fVertices);
        return arrayBuffer;
    }

    private createVertexData(){
        const vertices = this.calcVertexData();
        const indices = new Uint8Array(36);
        for(let i=0; i <36; i++){
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

    public draw(){
        this.vertexArrayObject.bind();
        this.gl.drawElements(this.gl.TRIANGLES,GLCube.INDEX_LENGTH,this.gl.UNSIGNED_BYTE,0);
        this.vertexArrayObject.unbind();
    }
}
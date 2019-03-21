import {GLBuffer} from "../GLBuffer";
import {GLVertexArrayObject} from "../GLVertexArrayObject";

export class GLSphere {
    private readonly gl:WebGL2RenderingContext;
    private _vertexBuffer:GLBuffer;
    private _indexBuffer:GLBuffer;
    private _vertexArrayObject:GLVertexArrayObject;
    private _indexcount:number;

    constructor(gl:WebGL2RenderingContext,radius:number=1,rings:number=12,sectors:number=12){
        this.gl = gl;
        this.createVertexData(radius,rings,sectors)
    }

    private createVertexData(radius:number,rings:number,sectors:number):void{
        let R = 1.0/(rings-1);
        let S = 1.0/(sectors-1);
        let vertexData = new Float32Array(rings * sectors * 8);
        let indexData = new Uint32Array(rings*sectors*6);

        let index = 0;
        for(let r=0; r < rings; r++){
            for(let s=0; s < sectors; s++){
                let x = Math.cos(2*Math.PI * s * S) * Math.sin(Math.PI * r * R);
                let y = Math.sin((-Math.PI/2) + (Math.PI * r * R));
                let z = Math.sin(2*Math.PI * s * S) * Math.sin(Math.PI * r * R);

                vertexData[index++] = x*radius;
                vertexData[index++] = y*radius;
                vertexData[index++] = z*radius;

                vertexData[index++] = x;
                vertexData[index++] = y;
                vertexData[index++] = z;

                vertexData[index++] = s*S;
                vertexData[index++] = r*R;
            }
        }

        this._indexcount = 0;
        for(let r=0; r < rings-1; r++){
            for(let s=0; s < sectors-1; s++){
                indexData[this._indexcount++] = r * sectors + s;
                indexData[this._indexcount++] = (r+1) * sectors + s;
                indexData[this._indexcount++] = (r+1) * sectors + (s+1);

                indexData[this._indexcount++] = r * sectors + s;
                indexData[this._indexcount++] = (r+1) * sectors + (s+1);
                indexData[this._indexcount++] = r * sectors + (s+1);
            }
        }

        this._vertexBuffer = GLBuffer.createVertexBuffer(this.gl,vertexData,this.gl.STATIC_DRAW);
        if(!this._vertexBuffer){
            throw 'Failed to create VertexBuffer Object';
        }
        this._indexBuffer = GLBuffer.createIndexBuffer(this.gl,indexData,this.gl.STATIC_DRAW);
        if(!this._indexBuffer){
            throw 'Failed to create IndexBuffer Object!';
        }
        this._vertexArrayObject = new GLVertexArrayObject(this.gl);
        this._vertexArrayObject.setIndexBuffer(this._indexBuffer);
    }

    public draw(drawType: number = this.gl.TRIANGLES){
        this.vertexArrayObject.bind();
        this.gl.drawElements(drawType,this._indexcount,this.gl.UNSIGNED_INT,0);
        this.vertexArrayObject.unbind();
    }

    public get vertexBuffer():GLBuffer {
        return this._vertexBuffer;
    }

    public set vertexBuffer(value:GLBuffer) {
        this._vertexBuffer = value;
    }

    public get indexBuffer():GLBuffer {
        return this._indexBuffer;
    }

    public set indexBuffer(value:GLBuffer) {
        this._indexBuffer = value;
    }

    public get vertexArrayObject():GLVertexArrayObject {
        return this._vertexArrayObject;
    }

    public set vertexArrayObject(value:GLVertexArrayObject) {
        this._vertexArrayObject = value;
    }

    public get indexcount():number {
        return this._indexcount;
    }

    public set indexcount(value:number) {
        this._indexcount = value;
    }
}
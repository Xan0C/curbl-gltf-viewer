import {GL_BUFFERS, GL_TYPES} from "../../gl/constants";
import {GLBuffer} from "../../gl";

/**
 * Describes which buffer to create for the GPU
 */
export class BufferView {
    /**
     * GLBuffer for this BufferView
     */
    buffer?:GLBuffer;
    /**
     * BufferOffset of the GLBuffer
     */
    bufferOffset:number;

    data:ArrayBuffer|ArrayBufferView;

    target?:GL_BUFFERS;

    drawType:GL_BUFFERS;

    componentType?:GL_TYPES;

    private uploaded:boolean;

    constructor(){
        this.bufferOffset = 0;
        this.drawType = GL_BUFFERS.STATIC_DRAW;
        this.uploaded = false;
    }

    upload():void {
        if(!this.uploaded) {
            if (this.buffer === undefined || this.buffer === null || !this.buffer) {
                throw "Mesh has not been initialized! Missing Buffers, make sure to initialize the model buffers first!";
            }
            this.buffer.upload();
            this.uploaded = true;
        }
    }

    init(gl:WebGL2RenderingContext, vertexBuffer?:GLBuffer, indexBuffer?:GLBuffer):void {
        if(!this.buffer) {
            if (this.target === GL_BUFFERS.ARRAY_BUFFER) {
                this.buffer = vertexBuffer || GLBuffer.create(gl, this.target, null, this.drawType);
            } else {
                this.buffer = indexBuffer || GLBuffer.create(gl, this.target, null, this.drawType);
            }
            this.bufferOffset = this.buffer.byteLength;
            this.buffer.addData(this.data);
        }
    }
}
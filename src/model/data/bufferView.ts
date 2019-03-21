import {GL_BUFFERS} from "../../gl/constants";
import {GLBuffer} from "../../gl";

/**
 * Describes which buffer to create for the GPU
 */
export class BufferView {
    buffer?:GLBuffer;
    bufferOffset:number;

    data:ArrayBuffer;
    target?:GL_BUFFERS;
    drawType:GL_BUFFERS;

    constructor(){
        this.bufferOffset = 0;
        this.drawType = GL_BUFFERS.STATIC_DRAW;
    }

    init(gl: WebGL2RenderingContext, vertexBuffer?:GLBuffer, indexBuffer?:GLBuffer) {
        if(!this.buffer){
            if(this.target === GL_BUFFERS.ARRAY_BUFFER){
                this.buffer = vertexBuffer||GLBuffer.create(gl,this.target,null,this.drawType);
            }else{
                this.buffer = indexBuffer||GLBuffer.create(gl,this.target,null,this.drawType);
            }
            this.bufferOffset = this.buffer.byteLength;
            this.buffer.addData(this.data);
        }
    }
}
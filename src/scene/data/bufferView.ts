import {GL_BUFFERS} from "../../gl/constants";
import {GLBuffer} from "../../gl";

/**
 * Describes which buffer to create for the GPU
 */
export class BufferView {
    /**
     * idx of the GLBuffer for this BufferView
     */
    buffer?:GLBuffer;
    /**
     * BufferOffset of the GLBuffer
     */
    bufferOffset:number;

    data:ArrayBuffer;
    target?:GL_BUFFERS;
    drawType:GL_BUFFERS;

    constructor(){
        this.bufferOffset = 0;
        this.drawType = GL_BUFFERS.STATIC_DRAW;
    }
}
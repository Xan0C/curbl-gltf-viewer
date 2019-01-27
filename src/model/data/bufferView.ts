import {GL_BUFFERS, GL_TYPES} from "../../gl/constants";

/**
 * Describes which buffer to create for the GPU
 */
export class BufferView {
    /**
     * Idx of the buffer for this BufferView
     */
    buffer?:number;
    bufferOffset:number;
    /**
     * index of the Databuffer that should be used(dont confuse with GLBuffer)
     */
    dataIdx:number;
    byteOffset:number;
    byteLength:number;
    byteStride?:number;
    target?:GL_BUFFERS;
    drawType:GL_BUFFERS;
    componentType?:GL_TYPES;

    constructor(){
        this.dataIdx = 0;
        this.bufferOffset = 0;
        this.byteOffset = 0;
        this.byteLength = 0;
        this.drawType = GL_BUFFERS.STATIC_DRAW;
    }
}
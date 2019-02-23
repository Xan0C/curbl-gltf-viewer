import {GL_BUFFERS, GL_TYPES} from "../../gl/constants";

/**
 * Describes which buffer to create for the GPU
 */
export class BufferView {
    /**
     * Idx of the GLBuffer for this BufferView
     */
    buffer?:number;
    /**
     * BufferOffset of the GLBuffer that stored this BufferView
     */
    bufferOffset:number;

    data:ArrayBuffer|ArrayBufferView;

    target?:GL_BUFFERS;

    drawType:GL_BUFFERS;

    componentType?:GL_TYPES;

    constructor(){
        this.bufferOffset = 0;
        this.drawType = GL_BUFFERS.STATIC_DRAW;
    }
}
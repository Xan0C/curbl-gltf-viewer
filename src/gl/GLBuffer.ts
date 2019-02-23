/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

export class GLBuffer {

    private gl:WebGL2RenderingContext;
    /**
     * Type of the buffer
     * @member {gl.ARRAY_BUFFER|gl.ELEMENT_ARRAY_BUFFER}
     */
    private type:number;
    private arrayBuffers:Array<ArrayBuffer|ArrayBufferView>;
    /**
     * The draw type of the buffer
     * @member {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
     */
    private drawType:number;
    private buffer:WebGLBuffer;
    private _byteLength:number;

    constructor(gl:WebGL2RenderingContext, type=gl.ARRAY_BUFFER, data?:ArrayBuffer|ArrayBufferView, drawType=gl.STATIC_DRAW){
        this.gl = gl;
        this.type = type;
        this.arrayBuffers = [];
        this._byteLength = 0;
        this.buffer = gl.createBuffer();
        this.drawType = drawType;
        if(data){
            this.upload(data);
        }
    }

    /**
     * Add Data to the Buffermap that should be uploaded
     * @param {ArrayBuffer | ArrayBufferView} data
     */
    public addData(data:ArrayBuffer|ArrayBufferView):void{
        this.arrayBuffers.push(data);
        this._byteLength += data.byteLength;
    }

    /**
     * Remove data from the Buffermap
     * @param {ArrayBuffer | ArrayBufferView} data
     */
    public removeData(data:ArrayBuffer|ArrayBufferView):void {
        const index = this.arrayBuffers.indexOf(data);
        if(index > -1){
            const data = this.arrayBuffers[index];
            this._byteLength -= data.byteLength;
            this.arrayBuffers.splice(index,1);
        }
    }

    /**
     * Uploads the new data to the GPU and all the previous data
     * @param data {ArrayBuffer|ArrayBufferView} an array of data to upload
     */
    public upload(data?:ArrayBuffer|ArrayBufferView):number{
        if(data) {
            this.addData(data);
        }
        this.bind();
        let gl = this.gl;
        gl.bufferData(this.type,this._byteLength,this.drawType);
        let offset = 0;
        for(let i=0,data:ArrayBufferView; data = this.arrayBuffers[i] as ArrayBufferView; i++){
            gl.bufferSubData(this.type,offset,data);
            offset+=data.byteLength;
        }
        this.unbind();
        return this._byteLength;
    }

    public bind(){
        this.gl.bindBuffer(this.type,this.buffer);
    }

    public unbind(){
        this.gl.bindBuffer(this.type,null);
    }

    public destroy(){
        if(this.gl.isBuffer(this.buffer)){
            this.gl.deleteBuffer(this.buffer);
        }
        this.gl = null;
        this.buffer = null;
    }

    /**
     * sum of the ByteLength of all ArrayBuffers stored in this GLBuffer
     * @returns {number}
     */
    public get byteLength():number {
        return this._byteLength;
    }

    /**
     * Length of the ArrayBuffers stored in this Buffermap
     * @returns {number}
     */
    public get length():number{
        return this.arrayBuffers.length;
    }

    public static createVertexBuffer(gl:WebGL2RenderingContext, data:ArrayBuffer|ArrayBufferView=null, drawType=gl.STATIC_DRAW):GLBuffer{
        return new GLBuffer(gl,gl.ARRAY_BUFFER,data,drawType);
    }

    public static createIndexBuffer(gl:WebGL2RenderingContext, data:ArrayBuffer|ArrayBufferView=null, drawType=gl.STATIC_DRAW):GLBuffer{
        return new GLBuffer(gl,gl.ELEMENT_ARRAY_BUFFER,data,drawType);
    }

    public static create(gl:WebGL2RenderingContext, type:number, data:ArrayBuffer|ArrayBufferView=null, drawType=gl.STATIC_DRAW):GLBuffer{
        return new GLBuffer(gl,type,data,drawType);
    }
}
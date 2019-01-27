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
 */
import {GLTexture} from "./GLTexture";
import {GLCubemap} from "./GLCubemap";


export class GLFramebuffer{
    private readonly drawBuffers:Array<number>;
    private gl:WebGL2RenderingContext;
    private width:number;
    private height:number;
    private framebuffer:WebGLFramebuffer;
    private renderbuffer:WebGLRenderbuffer;
    private _textures:Array<GLTexture|GLCubemap>;

    constructor(gl:WebGL2RenderingContext,width=512,height=512){
        this.drawBuffers = [];
        this.gl = gl;
        this.width = width;
        this.height = height;
        this.framebuffer = gl.createFramebuffer();
        this.renderbuffer = null;
        this._textures = [];
    }

    checkStatus():boolean{
        const gl = this.gl;
        let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        switch(status){
            case gl.FRAMEBUFFER_COMPLETE:
                return true;
            case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                console.warn("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                return false;
            case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                console.warn("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                return false;
            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                console.warn("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                return false;
            case gl.FRAMEBUFFER_UNSUPPORTED:
                console.warn("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
                return false;
            default:
                console.warn("Incomplete framebuffer: " + status);
                return false
        }
    }

    /**
     * Creates a frame buffer with a texture containing the given data
     *
     * @static
     * @param {WebGL2RenderingContext} gl - The current WebGL rendering context
     * @param {number} width - the width of the drawing area of the frame buffer
     * @param {number} height - the height of the drawing area of the frame buffer
     * @param {number} textureID - texture target
     * @param {number} attachment - COLOR_ATTACHMENT
     * @param {number} internalformat
     * @param {number} format
     * @param {number} type
     * @return {GLFramebuffer} The new framebuffer.
     */
    public static createRGBA(gl:WebGL2RenderingContext, width:number, height:number,textureID:number=0,attachment:number=gl.COLOR_ATTACHMENT0,internalformat?:number,format?:number,type?:number):GLFramebuffer
    {
        return GLFramebuffer.createFloat32(gl, width, height, null,textureID,attachment,format,type);
    }

    /**
     * Creates a frame buffer with a texture containing the given data
     *
     * @static
     * @param {WebGL2RenderingContext} gl - The current WebGL rendering context
     * @param {number} width - the width of the drawing area of the frame buffer
     * @param {number} height - the height of the drawing area of the frame buffer
     * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView} data - an array of data
     * @param {number} textureID - texture target
     * @param {number} attachment - COLOR_ATTACHMENT
     * @param {number} internalformat
     * @param {number} format
     * @param {number} type
     * @return {GLFramebuffer} The new framebuffer.
     */
    public static createFloat32(gl:WebGL2RenderingContext, width:number, height:number, data:any,textureID:number=0,attachment:number=gl.COLOR_ATTACHMENT0,internalformat?:number,format?:number,type?:number):GLFramebuffer
    {
        const texture = GLTexture.fromData(gl, data, width, height,textureID,internalformat,format,type);

        texture.enableNearestScaling();
        texture.enableWrapClamp();

        // now create the framebuffer object and attach the texture to it.
        const fbo = new GLFramebuffer(gl, width, height);

        fbo.addTargetTexture(texture,attachment);
        fbo.unbind();

        return fbo;
    }

    /**
     * Adds a texture to the framebuffer.
     * @param {GLTexture} texture - the texture to add.
     * @param {Number} attachment - COLOR_ATTACHMENT
     * @param {Number} face if used for 3d Textures
     * @param {Boolean} setDrawBuffer - adds the attachment to the drawBuffer
     */
    addTargetTexture(texture?:GLTexture|GLCubemap,attachment:number=this.gl.COLOR_ATTACHMENT0,face?:number,setDrawBuffer:boolean=true):GLFramebuffer
    {
        const gl = this.gl;

        if(this._textures.indexOf(texture) > -1){
            this.bind();
            return this;
        }

        this._textures.push(texture || new GLTexture(gl,0));
        let tex = this._textures[this._textures.length-1].bind();
        this.bind();

        if(face || face === 0){
            gl.framebufferTexture2D(gl.FRAMEBUFFER,attachment,gl.TEXTURE_CUBE_MAP_POSITIVE_X+face,tex.texture,0);
        }else {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, tex.texture, 0);
        }
        if(setDrawBuffer) {
            this.drawBuffers.push(attachment);
            this.gl.drawBuffers(this.drawBuffers);
        }

        return this;
    }

    setDrawBuffer(drawBuffers:Array<number>=this.drawBuffers):void{
        this.gl.drawBuffers(drawBuffers);
    }
    /**
     * Initialises the stencil buffer
     */
    createRenderbuffer():GLFramebuffer
    {
        if (this.renderbuffer) {
            return null;
        }

        const gl = this.gl;

        this.bind();

        this.renderbuffer = gl.createRenderbuffer();

        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);

        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height);

        this.unbind();

        return this;
    }

    /**
     * Erases the drawing area and fills it with a colour
     *
     * @param {number} r - the red value of the clearing colour
     * @param {number} g - the green value of the clearing colour
     * @param {number} b - the blue value of the clearing colour
     * @param {number} a - the alpha value of the clearing colour
     * @param {boolean} depthBuffer - clear DepthBuffer default: false
     * @param {boolean} stencilBuffer - clear StencilBuffer default: false
     */
    clear(r = 0, g = 0, b = 0, a = 1,depthBuffer:boolean=false,stencilBuffer:boolean=false):GLFramebuffer
    {
        this.bind();

        const gl = this.gl;

        gl.clearColor(r, g, b, a);
        if(depthBuffer && stencilBuffer){
            gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);
        }else if(depthBuffer){
            gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        }else if(stencilBuffer){
            gl.clear(gl.COLOR_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);
        }else{
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        return this;
    }

    /**
     * Binds the frame buffer to the WebGL context
     */
    bind(target:number=this.gl.FRAMEBUFFER):GLFramebuffer
    {
        const gl = this.gl;

        for (let texture of this._textures) {
            texture.unbind();
        }

        gl.bindFramebuffer(target, this.framebuffer);
        return this;
    }

    /**
     * Unbinds the frame buffer to the WebGL context
     */
    unbind(target:number=this.gl.FRAMEBUFFER):GLFramebuffer
    {
        this.gl.bindFramebuffer(target, null);
        return this;
    }

    /**
     * Resizes the drawing area of the buffer to the given width and height
     *
     * @param {number} width - the new width
     * @param {number} height - the new height
     */
    resize(width, height):GLFramebuffer
    {
        const gl = this.gl;

        this.width = width;
        this.height = height;

        for(let texture of this._textures){
            texture.uploadData(null, width, height);
        }

        if (this.renderbuffer)
        {
            // update the stencil buffer width and height
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
        }
        return this;
    }

    /**
     * Destroys this buffer
     */
    destroy()
    {
        for(let texture of this._textures){
            texture.destroy();
        }

        this.gl.deleteFramebuffer(this.framebuffer);

        this.gl = undefined;
        this.framebuffer = undefined;
        this.renderbuffer = undefined;
        this.drawBuffers.length = 0;
        this._textures.length = 0;
    }

    public getTexture(idx:number=0): GLTexture|GLCubemap {
        return this._textures[idx];
    }

    public setTexture(value: GLTexture|GLCubemap,idx:number=0) {
        this._textures[idx] = value;
    }

    public get texture():GLTexture|GLCubemap{
        return this._textures[0];
    }

    public set texture(value:GLTexture|GLCubemap){
        this._textures[0] = value;
    }

    public get textures():Array<GLTexture | GLCubemap> {
        return this._textures;
    }

    public set textures(value:Array<GLTexture | GLCubemap>) {
        this._textures = value;
    }
}
import {MAG_FILTER, MIN_FILTER, TEXTURE_WRAP} from "./constants/GLConstants";

export class GLTexture {
    protected gl:WebGL2RenderingContext;
    protected _textureID:number;
    protected _texture:WebGLTexture;
    protected mipmap:boolean;
    protected miplevel:number;
    protected _premultiplyAlpha:boolean;
    protected _width:number;
    protected _height:number;
    protected format:number;
    protected internalformat:number;
    protected type:number;

    constructor(gl:WebGL2RenderingContext, textureID:number=0, width:number = -1, height:number = -1, internalformat:number = gl.RGBA, format:number = gl.RGBA, type:number = gl.UNSIGNED_BYTE){
        this.gl = gl;
        this._textureID = textureID;
        this._texture = gl.createTexture();
        this.mipmap = false;
        this._premultiplyAlpha = false;
        this._width = width;
        this._height = height;
        this.internalformat = internalformat;
        this.format = format;
        this.type = type;
        this.miplevel = 0;
    }

    /**
     * Uploads this texture to the GPU
     * @param source {HTMLImageElement|ImageData|HTMLVideoElement}
     */
    public upload(source:HTMLImageElement|ImageData|HTMLVideoElement){
        this.bind();
        let gl = this.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this._premultiplyAlpha as any as GLint);
        let newWidth = source.width;
        let newHeight = source.height;
        if(newHeight !== this._height || newWidth !== this._width){
            gl.texImage2D(gl.TEXTURE_2D,this.miplevel,this.internalformat,this.format,this.type,source);
        }else{
            gl.texSubImage2D(gl.TEXTURE_2D,this.miplevel,0,0,this.format,this.type,source);
        }
        this._width = newWidth;
        this._height = newHeight;
        this.unbind();
    }

    /**
     * Use a data source and uploads this texture to the GPU
     * @param data {TypedArray} data to upload to the texture
     * @param width {number} new width of the texture
     * @param height {number} new height of the texture
     */
    public uploadData(data:Float32Array,width:number,height:number){
        this.bind();
        let gl = this.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this._premultiplyAlpha as any as GLint);
        if(width !== this._width || height !== this._height){
            gl.texImage2D(gl.TEXTURE_2D,this.miplevel,this.internalformat,width,height,0,this.format,this.type,data||null);
        }else{
            gl.texSubImage2D(gl.TEXTURE_2D,this.miplevel,0,0,width,height,this.format,this.type,data||null);
        }
        this._width = width;
        this._height = height;
        this.unbind();
    }

    /**
     * Binds the texture
     * @param location
     */
    public bind(location:number=this._textureID):GLTexture{
        let gl = this.gl;
        if(location !== undefined){
            gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(gl.TEXTURE_2D,this._texture);
        return this;
    }

    public unbind(location:number=this._textureID):GLTexture{
        let gl = this.gl;
        if(location !== undefined){
            gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(gl.TEXTURE_2D,null);
        return this;
    }

    /**
     * @param linear {boolean} if we want to use linear filtering or nearest neighbour interpolation
     */
    public minFilter(linear:boolean){
        this.bind();
        let gl = this.gl;
        if(this.mipmap){
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,linear?gl.LINEAR_MIPMAP_LINEAR:gl.NEAREST_MIPMAP_NEAREST);
        }else{
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear?gl.LINEAR:gl.NEAREST);
        }
        this.unbind();
    }

    public setMinFilter(filter:MIN_FILTER):void{
        if(!this.mipmap && (filter === MIN_FILTER.LINEAR_MIPMAP_LINEAR
            || filter === MIN_FILTER.LINEAR_MIPMAP_NEAREST
            || filter === MIN_FILTER.NEAREST_MIPMAP_LINEAR
            ||filter === MIN_FILTER.NEAREST_MIPMAP_NEAREST)
        ){
            this.enableMipmap();
        }
        this.bind();
        let gl = this.gl;
        if(this.mipmap) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        }else{
            //If there is no mipamp e.g. non power of 2 use LINEAR or NEAREST
            const linear = filter === MIN_FILTER.LINEAR || MIN_FILTER.LINEAR_MIPMAP_LINEAR || MIN_FILTER.LINEAR_MIPMAP_NEAREST;
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear?gl.LINEAR:gl.NEAREST);
        }
        this.unbind();
    }

    /**
     * @param linear {boolean} if we want to use linear or nearest neighbour interpolation
     */
    public magFilter(linear:boolean){
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,linear?gl.LINEAR:gl.NEAREST);
        this.unbind();
    }

    public setMagFilter(filter:MAG_FILTER):void{
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,filter);
        this.unbind();
    }
    /**
     * Enables mipmapping
     */
    public enableMipmap(){
        if(GLTexture.isPowerOf2(this._width) && GLTexture.isPowerOf2(this._height) && (this.internalformat === this.gl.RGB || this.internalformat === this.gl.RGBA)) {
            let gl = this.gl;
            this.bind();
            this.mipmap = true;
            gl.generateMipmap(gl.TEXTURE_2D);
            this.unbind();
        }
    }

    /**
     * Enables linear filtering
     */
    public enableLinearScaling(){
        this.minFilter(true);
        this.magFilter(true);
    }

    /**
     * Enabled nearest neighbour interpolation
     */
    public enableNearestScaling(){
        this.minFilter(false);
        this.magFilter(false);
    }

    /**
     * Enables clamping on the texture wo WebGL will not repeat it
     */
    public enableWrapClamp(){
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
        this.unbind();
    }

    /**
     * Enable tiling on the texture
     */
    public enableWrapRepeat(){
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
        this.unbind();
    }

    public enableWrapMirrorRepeat(){
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.MIRRORED_REPEAT);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.MIRRORED_REPEAT);
        this.unbind();
    }

    public setWrapS(mode:TEXTURE_WRAP):void{
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,mode);
        this.unbind();
    }

    public setWrapT(mode:TEXTURE_WRAP):void{
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,mode);
        this.unbind();
    }

    public flipY(flip:number){
        let gl = this.gl;
        this.bind();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,flip);
        this.unbind();
    }

    /**
     * Destroys this texture
     */
    public destroy(){
        let gl = this.gl;
        gl.deleteTexture(this._texture);
    }

    public static isPowerOf2(value:number):boolean{
        return (value & (value-1)) === 0;
    }

    public static nextHighestPowerOfTwo(x:number):number {
        --x;
        for (var i = 1; i < 32; i <<= 1) {
            x = x | x >> i;
        }
        return x + 1;
    }

    public get textureID():number {
        return this._textureID;
    }

    public set textureID(value:number) {
        this._textureID = value;
    }

    public get texture():WebGLTexture {
        return this._texture;
    }

    public set texture(value:WebGLTexture) {
        this._texture = value;
    }

    public get premultiplyAlpha():boolean {
        return this._premultiplyAlpha;
    }

    public set premultiplyAlpha(value:boolean) {
        this._premultiplyAlpha = value;
    }

    public get width():number {
        return this._width;
    }

    public get height():number {
        return this._height;
    }

    /**
     *
     * @param gl {WebGL2RenderingContext} the current webgl context
     * @param source {HTMLImageElement|ImageData} the source image of the texture
     * @param premultiplyAlpha {Boolean} If we want to use pre-multiplied alpha
     * @param textureID {number} textureID to use multiple textures in a shader
     * @param internalformat {number} optional interal format RGBA8,RGB16 etc.
     * @param format {number} optional the Format to use for the texture RGBA etc.
     * @param type {number} texture type GL_FLOAT etc
     * @returns {GLTexture}
     */
    public static fromSource(gl:WebGL2RenderingContext, source:HTMLImageElement|ImageData, premultiplyAlpha:boolean=false, textureID:number=0,internalformat?:number, format?:number, type?:number):GLTexture{
        let texture = new GLTexture(gl,textureID,null,null,internalformat,format,type);
        texture._premultiplyAlpha = premultiplyAlpha;
        texture.upload(source);
        return texture;
    }

    /**
     * @param {WebGL2RenderingContext} gl - webgl context
     * @param {Float32Array} data - data for the texture
     * @param {number} width - width of the texture
     * @param {number} height - height of the texture
     * @param {number} textureID - textureID
     * @param {number} internalformat - optional format to use RGBA,RGB etc.
     * @param {number} format - optional format to use RGBA,RGB etc.
     * @param {number} type - data type default: UNSIGNED_BYTE
     * @param {boolean} premultiplyAlpha - If we want to use pre-multiplied alpha
     * @returns {GLTexture}
     */
    public static fromData(gl:WebGL2RenderingContext, data:Float32Array, width:number, height:number, textureID:number=0,internalformat?:number, format?:number, type?:number,premultiplyAlpha?:boolean):GLTexture{
        let texture = new GLTexture(gl,textureID,null,null,internalformat,format,type);
        texture._premultiplyAlpha = premultiplyAlpha;
        texture.uploadData(data,width,height);
        return texture;
    }
}
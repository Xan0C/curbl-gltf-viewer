import {GLTexture} from "./GLTexture";

export class GLCubemap extends GLTexture {
    public static readonly RIGHT_FACE: number = 0;
    public static readonly LEFT_FACE: number = 1;
    public static readonly TOP_FACE: number = 2;
    public static readonly BOTTOM_FACE: number = 3;
    public static readonly BACK_FACE: number = 4;
    public static readonly FRONT_FACE: number = 5;

    protected gl: WebGL2RenderingContext;
    protected _textureID: number;
    protected _texture: WebGLTexture;
    protected mipmap: boolean;
    protected _width: number;
    protected _height: number;
    protected format: number;
    protected internalformat: number;
    protected type: number;
    public premultiplyAlpha: boolean;

    constructor(gl: WebGL2RenderingContext, textureID: number = 0, width: number = -1, height: number = -1, internalFormat: number = gl.RGBA, format: number = gl.RGBA, type: number = gl.UNSIGNED_BYTE) {
        super(gl, textureID, width, height, internalFormat, format, type);
        this.gl = gl;
        this._textureID = textureID;
        this._texture = gl.createTexture();
        this.mipmap = false;
        this.premultiplyAlpha = false;
        this._width = width;
        this._height = height;
        this.format = format;
        this.type = type;
    }

    /**
     * Uploads this texture to the GPU
     * @param source {HTMLImageElement|ImageData|HTMLVideoElement}
     * @param flip - {boolean} flip the texture
     * @param face {number}
     * @param level {number} mipmap level
     */
    public upload(source: HTMLImageElement | ImageData | HTMLVideoElement, flip: boolean = false, face: number = 0, level: number = 0) {
        this.bind();
        let gl = this.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha as any as GLint);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flip as any as GLint);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, level, this.internalformat, this.format, this.type, source);
        if (level === 0) {
            this._width = source.width;
            this._height = source.height;
        }
        this.unbind();
    }

    /**
     * Use a data source and uploads this texture to the GPU
     * @param data {TypedArray} data to upload to the texture
     * @param width {number} new width of the texture
     * @param height {number} new height of the texture
     * @param flip - {boolean} flip the texture
     * @param face {number}
     */
    public uploadData(data: Float32Array, face: number, width: number = this._width, height: number = this._height, flip: boolean = false, level: number = 0) {
        this.bind();
        let gl = this.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha as any as GLint);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flip as any as GLint);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, this.internalformat, width, height, 0, this.format, this.type, data || null);
        if (level === 0) {
            this._width = width;
            this._height = height;
        }
        this.unbind();
    }

    /**
     * Binds the texture
     * @param location
     */
    public bind(location: number = this._textureID): GLCubemap {
        let gl = this.gl;
        if (location !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
        return this;
    }

    public unbind(location: number = this._textureID): GLCubemap {
        let gl = this.gl;
        if (location !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        return this;
    }

    /**
     * Enables linear filtering
     */
    public enableLinearScaling() {
        this.minFilter(true);
        this.magFilter(true);
    }

    /**
     * Enabled nearest neighbour interpolation
     */
    public enableNearestScaling() {
        this.minFilter(false);
        this.magFilter(false);
    }

    /**
     * @param linear {boolean} if we want to use linear filtering or nearest neighbour interpolation
     */
    public minFilter(linear: boolean) {
        this.bind();
        let gl = this.gl;
        if (this.mipmap) {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
        } else {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST);
        }
        this.unbind();
    }

    /**
     * @param linear {boolean} if we want to use linear or nearest neighbour interpolation
     */
    public magFilter(linear: boolean) {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST);
        this.unbind();
    }

    /**
     * Enables mipmapping
     */
    public enableMipmap() {
        let gl = this.gl;
        this.bind();
        this.mipmap = true;
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        this.unbind();
    }

    /**
     * Enables clamping on the texture wo WebGL will not repeat it
     */
    public enableWrapClamp() {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
        this.unbind();
    }

    /**
     * Enable tiling on the texture
     */
    public enableWrapRepeat() {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.REPEAT);
        this.unbind();
    }

    public enableWrapMirrorRepeat() {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.MIRRORED_REPEAT);
        this.unbind();
    }

    /**
     * Destroys this texture
     */
    public destroy() {
        let gl = this.gl;
        gl.deleteTexture(this._texture);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public uploadLevel(source: Array<HTMLImageElement | ImageData> | HTMLImageElement | ImageData, level: number,
                       flip: boolean = false): void
    {
        const sources = [].concat(source);
        for (let i = 0, source; source = sources[i]; i++) {
            this.upload(source, flip, i, level);
        }
    }

    /**
     * create CubeMap from source data
     * @param gl
     * @param source - the src
     * @param flip - flip the texture default: false
     * @param premultiplyAlpha - premultiplyAlpha
     * @param textureID - textureID
     * @param internalformat
     * @param format
     * @param type
     */
    public static cubemapFromSource(gl: WebGL2RenderingContext,
                                    source: Array<HTMLImageElement | ImageData> | HTMLImageElement | ImageData,
                                    flip: boolean = false, premultiplyAlpha: boolean = false, textureID: number = 0,
                                    internalformat?: number, format?: number, type?: number): GLCubemap
    {
        const cubemap = new GLCubemap(gl, textureID, null, null, internalformat, format, type);
        const sources = [].concat(source);
        cubemap.premultiplyAlpha = premultiplyAlpha;
        for (let i = 0, source; source = sources[i]; i++) {
            cubemap.upload(source, flip, i, 0);
        }
        if (GLTexture.isPowerOf2(source[0].width) && GLTexture.isPowerOf2(source[0].height)) {
            cubemap.enableMipmap();
            cubemap.enableWrapRepeat();
        } else {
            cubemap.enableWrapClamp();
        }
        cubemap.enableLinearScaling();
        return cubemap;
    }

    public static cubemapFromData(gl: WebGL2RenderingContext, data: Array<Float32Array> | Float32Array, width: number,
                                  height: number, flip: boolean = false, textureID: number = 0, internalformat?: number,
                                  format?: number, type?: number): GLCubemap
    {
        let texture = new GLCubemap(gl, textureID, null, null, format, type);
        let datas = [].concat(data);
        for (let i = 0; i < 6; i++) {
            texture.uploadData(datas[i], i, width, height, flip);
        }
        return texture;
    }
}
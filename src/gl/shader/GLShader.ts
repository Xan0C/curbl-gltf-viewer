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
import {ProgramCompiler} from "./programCompiler";
import {Attributes} from "./GLAttribute";
import {Uniforms} from "./uniform";
import UniformAccessObject = Uniforms.UniformAccessObject;

export class GLShader {

    /**
     * @protected
     * @member {WebGL2RenderingContext}
     */
    protected gl:WebGL2RenderingContext;
    /**
     * Shader Program
     * @protected
     * @member {WebGLProgram}
     */
    protected _program:WebGLProgram;
    protected _attributes:Attributes.AttributeMap;
    protected _uniforms:UniformAccessObject;
    protected _defines:{[x:string]:string|number};

    private _vertexSrc:string;
    private _fragmentSrc:string;

    constructor(gl: WebGL2RenderingContext, vertexSrc?:string, fragmentSrc?:string){
        this.gl = gl;
        this._defines = Object.create(null);
        this._vertexSrc = vertexSrc;
        this._fragmentSrc = fragmentSrc;
    }

    private getDefinesString() {
        let defineString = "";
        for(let key in this._defines) {
               defineString += "#define " + key + " " + this._defines[key] + "\n";
        }
        return defineString;
    }

    private getShaderSrcWithDefines(src:string):string {
        const shaderDefines = this.getDefinesString();
        const secondLineIdx = src.indexOf("\n");

        const firstLine = src.substr(0, secondLineIdx);
        const shaderSrc = src.substr(secondLineIdx);

        if(firstLine.indexOf("#version") != -1) {
            return firstLine + shaderDefines + shaderSrc;
        }

        return shaderDefines + firstLine + shaderSrc;
    }

    public upload(): GLShader {
        const gl = this.gl;

        const vertexSrcWithDefines = this.getShaderSrcWithDefines(this._vertexSrc);
        const fragmentSrcWithDefines = this.getShaderSrcWithDefines(this._fragmentSrc);

        this._program = ProgramCompiler.compile(gl, vertexSrcWithDefines, fragmentSrcWithDefines);
        this._attributes = Attributes.extract(gl,this._program);
        const uniformData = Uniforms.extract(gl,this._program);
        this._uniforms = Uniforms.generateUniformAccessObject(gl,uniformData,this._program);
        return this;
    }

    public addDefine(def:string, value: string|number) {
        this._defines[def] = value;
    }

    public removeDefine(def:string, value: string|number) {
        delete this._defines[def];
    }

    public get program():WebGLProgram{
        return this._program;
    }

    public set program(program:WebGLProgram){
        this._program = program;
    }

    public set attributes(attributes:Attributes.AttributeMap){
        this._attributes = attributes;
    }

    public get attributes():Attributes.AttributeMap{
        return this._attributes;
    }

    public set uniforms(uniforms:UniformAccessObject|any){
        this.uniforms = uniforms;
    }

    public get uniforms():UniformAccessObject|any{
        return this._uniforms;
    }

    get defines(): { [p: string]: string | number } {
        return this._defines;
    }

    set defines(value: { [p: string]: string | number }) {
        this._defines = value;
    }

    /**
     * Bind this shader and tells the WebGLContext to use it
     */
    public bind():GLShader{
        this.gl.useProgram(this.program);
        return this;
    }

    /**
     * Unbinds this Shader and tells the WebGLContext to use no shader
     */
    public unbind():GLShader{
        this.gl.useProgram(null);
        return this;
    }

    /**
     * Destroy the program unloads it from the gpu
     */
    public unload() {
        this.gl.deleteProgram(this.program);
        this._program = null;
        this._attributes = null;
        this._uniforms = null;
        this._defines = Object.create(null);
    }

    /**
     * Destroys the program in the WebGLContext nulls all objects in the Shader
     */
    public destroy(){
        this.gl.deleteProgram(this.program);
        this.gl = null;
        this._program = null;
        this._attributes = null;
        this._uniforms = null;
        this._defines = null;
        this._vertexSrc = null;
        this._fragmentSrc = null;
    }

    get vertexSrc(): string {
        return this._vertexSrc;
    }

    set vertexSrc(value: string) {
        this._vertexSrc = value;
    }

    get fragmentSrc(): string {
        return this._fragmentSrc;
    }

    set fragmentSrc(value: string) {
        this._fragmentSrc = value;
    }
}

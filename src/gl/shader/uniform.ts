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

import {MapType} from "../gl_util/mapType";
import {DefaultValue} from "../gl_util/defaultValue";

export module Uniforms {
    var getterTemplate = [
        'return this.data.%%.value;'
    ].join('\n');
    var setterTemplate = [
        'this.data.%%.value = value;',
        'var location = this.data.%%.location;'
    ].join('\n');
    var GLSL_TO_SINGLE_SETTERS = {

        'float':    'uniform1f(location, value)',

        'vec2':     'uniform2f(location, value[0], value[1])',
        'vec3':     'uniform3f(location, value[0], value[1], value[2])',
        'vec4':     'uniform4f(location, value[0], value[1], value[2], value[3])',

        'int':      'uniform1i(location, value)',
        'ivec2':    'uniform2i(location, value[0], value[1])',
        'ivec3':    'uniform3i(location, value[0], value[1], value[2])',
        'ivec4':    'uniform4i(location, value[0], value[1], value[2], value[3])',

        'bool':     'uniform1i(location, value)',
        'bvec2':    'uniform2i(location, value[0], value[1])',
        'bvec3':    'uniform3i(location, value[0], value[1], value[2])',
        'bvec4':    'uniform4i(location, value[0], value[1], value[2], value[3])',

        'mat2':     'uniformMatrix2fv(location, false, value)',
        'mat3':     'uniformMatrix3fv(location, false, value)',
        'mat4':     'uniformMatrix4fv(location, false, value)',

        'sampler2D':'uniform1i(location, value)',

        'ubo':'uniformBlockBinding(this.program, location, value)'
    };

    var GLSL_TO_ARRAY_SETTERS = {

        'float':    'uniform1fv(location, value)',

        'vec2':     'uniform2fv(location, value)',
        'vec3':     'uniform3fv(location, value)',
        'vec4':     'uniform4fv(location, value)',

        'int':      'uniform1iv(location, value)',
        'ivec2':    'uniform2iv(location, value)',
        'ivec3':    'uniform3iv(location, value)',
        'ivec4':    'uniform4iv(location, value)',

        'bool':     'uniform1iv(location, value)',
        'bvec2':    'uniform2iv(location, value)',
        'bvec3':    'uniform3iv(location, value)',
        'bvec4':    'uniform4iv(location, value)',

        'sampler2D':'uniform1iv(location, value)'
    };

    export class Uniform{
        public type:string;
        public size:number;
        public location:WebGLUniformLocation;
        public value:Float32Array|Int32Array|Array<boolean>|number|boolean;

        constructor(type:string,size:number,location:WebGLUniformLocation,value:Float32Array|Int32Array|Array<boolean>|number|boolean){
            this.type = type;
            this.size = size;
            this.location = location;
            this.value = value;
        }
    }

    export class UniformMap {
        protected uniformMap:{};
        constructor(){
            this.uniformMap = {};
        }

        public add(key:string,attribute:Uniform){
            this.uniformMap[key] = attribute;
        }

        public get(key:string):Uniform{
            return this.uniformMap[key];
        }

        public remove(key:string){
            if(this.uniformMap[key]){
                this.uniformMap[key] = undefined;
            }
        }

        public get keys(){
            return Object.keys(this.uniformMap);
        }
    }

    export class UniformAccessObject {
        private _program:WebGLProgram;
        protected _gl:WebGL2RenderingContext;
        public data:any;

        constructor(gl?:WebGL2RenderingContext,program?:WebGLProgram){
            this.data = {};
            this._gl = gl;
            this._program = program;
        }

        public get gl():WebGL2RenderingContext{
            return this._gl;
        }

        public set gl(gl:WebGL2RenderingContext){
            this._gl = gl;
        }

        get program(): WebGLProgram {
            return this._program;
        }

        set program(value: WebGLProgram) {
            this._program = value;
        }
    }

    export function extract(gl:WebGL2RenderingContext, program:WebGLProgram):UniformMap{
        const uniforms = new UniformMap();

        //Get Uniform Blocks
        const ubos = gl.getProgramParameter(program,gl.ACTIVE_UNIFORM_BLOCKS);
        for(let i=0; i < ubos; i++){
            let name = gl.getActiveUniformBlockName(program,i);
            name = name.replace(/\[.*?\]/,"");
            uniforms.add(name, new Uniform("ubo",1,i,null));
        }

        //Get uniforms
        const totalUniforms = gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);
        for(let i=0; i < totalUniforms; i++){
            const uniformData = gl.getActiveUniform(program,i);
            const name = uniformData.name.replace(/\[.*?\]/,"");
            const type = MapType.map(gl,uniformData.type);
            const location = gl.getUniformLocation(program,name); //null if its a uniform block value
            if(location !== undefined && location !== null) {
                uniforms.add(name, new Uniform(type, uniformData.size, gl.getUniformLocation(program, name), DefaultValue.value(type, uniformData.size)))
            }
        }
        return uniforms;
    }

    export function generateUniformAccessObject(gl:WebGL2RenderingContext, uniformData:UniformMap, program:WebGLProgram):UniformAccessObject{
        const uniforms = new UniformAccessObject(gl,program);
        const uniformKeys = uniformData.keys;
        for(let i=0; i < uniformKeys.length; i++){
            const fullName = uniformKeys[i];
            const nameTokens = fullName.split(".");
            const name = nameTokens[nameTokens.length-1];
            const uniformGroup = getUniformGroup(nameTokens,uniforms);
            const uniform:Uniform = uniformData.get(fullName);
            uniformGroup.data[name] = uniform;
            uniformGroup.gl = gl;
            Object.defineProperty(uniformGroup,name,generatePropertyDescriptor(name,uniform));
        }
        return uniforms;
    }

    function getUniformGroup(nameTokens:string[],uniform:UniformAccessObject):UniformAccessObject{
        let cur = uniform;
        for(let i=0; i < nameTokens.length-1; i++){
            const o = cur[nameTokens[i]] || {data:{}};
            cur[nameTokens[i]] = o;
            cur = o;
        }
        return cur;
    }

    function generatePropertyDescriptor(name:string,uniform:Uniform):PropertyDescriptor{
        return {
            get: generateGetter(name) as ()=>any,
            set: generateSetter(name,uniform) as (v:any)=>void
        };
    }

    function generateGetter(name:string):Function{
        let template = getterTemplate.replace('%%',name);
        return new Function(template);
    }

    function generateSetter(name:string,uniform:Uniform):Function{
        let template = setterTemplate.replace(/%%/g,name);
        let setTemplate;

        if(uniform.size === 1){
            setTemplate = GLSL_TO_SINGLE_SETTERS[uniform.type];
        }else{
            setTemplate = GLSL_TO_ARRAY_SETTERS[uniform.type];
        }

        if(setTemplate){
            template += "\nthis.gl."+setTemplate+";";
        }

        return new Function('value',template);
    }
}
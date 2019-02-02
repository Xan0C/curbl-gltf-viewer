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

/**
 * Maps the WebGL Types to the convenient GLSL Types
 */
export module MapType {
    var GL_TABLE = null;
    var GL_TO_GLSL_TYPES = {
        'FLOAT':       'float',
        'FLOAT_VEC2':  'vec2',
        'FLOAT_VEC3':  'vec3',
        'FLOAT_VEC4':  'vec4',

        'INT':         'int',
        'INT_VEC2':    'ivec2',
        'INT_VEC3':    'ivec3',
        'INT_VEC4':    'ivec4',

        'BOOL':        'bool',
        'BOOL_VEC2':   'bvec2',
        'BOOL_VEC3':   'bvec3',
        'BOOL_VEC4':   'bvec4',

        'FLOAT_MAT2':  'mat2',
        'FLOAT_MAT3':  'mat3',
        'FLOAT_MAT4':  'mat4',

        'SAMPLER_2D':  'sampler2D',
        'SAMPLER_CUBE': 'samplerCube'
    };
    export function map(gl:WebGL2RenderingContext, type:number):string{
        if(!GL_TABLE){
            let typeNames = Object.keys(GL_TO_GLSL_TYPES);
            GL_TABLE = {};
            for(let i=0; i < typeNames.length;i++){
                let tn = typeNames[i];
                GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
            }
        }
        return GL_TABLE[type];
    }
}
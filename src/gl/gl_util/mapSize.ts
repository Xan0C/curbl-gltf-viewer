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
export module MapSize {
    var GLSL_TO_SIZE = {
        'float':    1,
        'vec2':     2,
        'vec3':     3,
        'vec4':     4,

        'int':      1,
        'ivec2':    2,
        'ivec3':    3,
        'ivec4':    4,

        'bool':     1,
        'bvec2':    2,
        'bvec3':    3,
        'bvec4':    4,

        'mat2':     4,
        'mat3':     9,
        'mat4':     16,

        'sampler2D':  1
    };

    /**
     * Returns the size in Bytes needed for the provided GLSL Type in WebGL
     * @param type
     * @returns {any}
     */
    export function map(type:string):number{
        return GLSL_TO_SIZE[type];
    }
}
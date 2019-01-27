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

export module ProgramCompiler {
    /**
     * @class
     * @param gl {WebGL2RenderingContext} The current WebGL context {WebGLProgram}
     * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
     * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
     * @return {WebGLProgram} the shader program
     */
    export function compile(gl:WebGL2RenderingContext, vertexSrc:string, fragmentSrc:string):WebGLProgram{
        let glVertShader = compileShader(gl,gl.VERTEX_SHADER,vertexSrc);
        let glFragShader = compileShader(gl,gl.FRAGMENT_SHADER,fragmentSrc);

        if(!glVertShader || !glFragShader){
            return;
        }

        let program = gl.createProgram(); //Create Program which combines two compiled Shaders
        if(!program){
            console.error('Failed to create Programm');
            return null;
        }
        gl.attachShader(program,glVertShader); //Attach OBJ_Vertex Shader
        gl.attachShader(program,glFragShader); //Attach Fragment Shader
        gl.linkProgram(program); // Then Link the program to the webgl context

        //Check if linking succeeded
        if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
            console.error('Shader Program Linking failed. Could not initialize Shader.');
            console.error("gl.VALIDATE_STATUS "+gl.getProgramParameter(program,gl.VALIDATE_STATUS));
            console.error('gl.getError(): '+gl.getError());
            //check if their is a program info log
            if(gl.getProgramInfoLog(program) !== ''){
                console.warn('gl.getProgramInfoLog(): '+gl.getProgramInfoLog(program));
            }
            gl.deleteProgram(program);
            program = null;
        }
        //Clean up the created shader
        gl.deleteShader(glVertShader);
        gl.deleteShader(glFragShader);
        //Finally return the compiled program
        return program;
    }

    /**
     * @private
     * @param gl {WebGL2RenderingContext} The current WebGL context {WebGLProgram}
     * @param type {Number} the type, can be either VERTEX_SHADER or FRAGMENT_SHADER
     * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
     * @return {WebGLShader} the shader
     */
    function compileShader(gl:WebGL2RenderingContext, type:number, vertexSrc:string):WebGLShader{
        let shader = gl.createShader(type);
        if(shader == null){
            console.error("Unable to create shader");
            return null;
        }
        gl.shaderSource(shader,vertexSrc);
        gl.compileShader(shader);
        if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
            console.error("Failed to compile shader: "+gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
}
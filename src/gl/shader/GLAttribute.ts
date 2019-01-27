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
import {MapType} from "../gl_util/mapType";
import {MapSize} from "../gl_util/mapSize";

export module Attributes{

    export class AttributeMap{
        protected attributeMap:{};
        constructor(){
            this.attributeMap = {};
        }

        public add(key:string,attribute:GLAttribute){
            this.attributeMap[key] = attribute;
        }
        public remove(key:string){
            if(this.attributeMap[key]){
                this.attributeMap[key] = undefined;
            }
        }
        public hasAttribute(key:string):boolean {
            return !!this.attributeMap[key];
        }
        public getAttribute(key:string):GLAttribute{
            if(!this.attributeMap[key]){
                console.warn('Attribute '+key+' does not exist in bound shader');
            }
            return this.attributeMap[key];
        }
    }

    export class GLAttribute{
        protected gl:WebGL2RenderingContext;
        public type:string;
        public size:number;
        public location:number;

        constructor(gl:WebGL2RenderingContext, type:string, size:number, location:number){
            this.gl = gl;
            this.type = type;
            this.size = size;
            this.location = location;
        }

        public pointer(type:number,normalized:boolean,stride:number,start:number){
            this.gl.vertexAttribPointer(this.location,this.size,type||this.gl.FLOAT,normalized||false,stride||0,start||0);
        }
    }

    export function extract(gl:WebGL2RenderingContext, program:WebGLProgram):AttributeMap{
        const attributes = new AttributeMap();
        const totalAttributes = gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);
        for(let i=0; i < totalAttributes;i++){
            const attribData = gl.getActiveAttrib(program,i);
            const type = MapType.map(gl,attribData.type);
            attributes.add(attribData.name,new GLAttribute(gl,type,MapSize.map(type),gl.getAttribLocation(program,attribData.name)));
        }
        return attributes;
    }
}
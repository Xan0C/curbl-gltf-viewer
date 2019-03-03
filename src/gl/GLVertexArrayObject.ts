import {GLBuffer} from "./GLBuffer";
import {Attributes} from "./shader/GLAttribute";
import Attribute = Attributes.GLAttribute;

export interface IAttribute {
    buffer:GLBuffer,
    attribute:Attribute,
    size:number,
    type:number,
    normalized:boolean,
    stride:number,
    offset:number,
    initialize:boolean
}

export class GLVertexArrayObject {
    private gl: WebGL2RenderingContext;
    private vao: WebGLVertexArrayObject;
    private attributes: Array<IAttribute>;
    private indexBuffer:GLBuffer;
    private dirty:boolean;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.vao = this.gl.createVertexArray();
        this.attributes = [];
        this.dirty = false;
    }

    /**
     * Binds the VAO, if its dirty it will initialize the attributes for the data
     */
    public bind(): GLVertexArrayObject {
        if (this.vao) {
            this.gl.bindVertexArray(this.vao);
            if(this.dirty){
                this.activate();
                this.dirty = false;
                this.bind();
            }
        }
        return this;
    }

    /**
     * Activates the vao,
     * binds the data and applies the Attributes
     */
    protected activate(){
        const gl = this.gl;
        let lastBuffer:GLBuffer =  null;
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);
        for(let i=0,attribute:IAttribute; attribute = this.attributes[i]; i++){
            if(lastBuffer !== attribute.buffer){
                //unbind previous buffer we dont want to apply the attribute to both buffers
                if(lastBuffer) {
                    lastBuffer.unbind();
                }
                //bind attribute buffer
                attribute.buffer.bind();
                //update lastBuffer
                lastBuffer = attribute.buffer;
            }
            GLVertexArrayObject.setVertexAttribArray(gl,attribute);
        }
        if(lastBuffer) {
            lastBuffer.unbind();
        }
        this.indexBuffer.bind();
        return this;
    }

    /**
     * Deactivates the non native VertexArrayObject
     */
    protected deactivate(){
        const gl = this.gl;
        let lastBuffer =  null;
        for(let i=0, attribute:IAttribute; attribute = this.attributes[i]; i++){
            if(lastBuffer !== attribute.buffer){
                attribute.buffer.unbind();
                lastBuffer = attribute.buffer;
            }
            GLVertexArrayObject.setVertexAttribArray(gl,attribute,true);
        }
        this.indexBuffer.unbind();
        return this;
    }

    /**
     * Unbind the VAO
     */
    public unbind(force:boolean=false) {
        if (this.vao) {
            this.gl.bindVertexArray(null);
        }else if(!this.vao || force){
            this.deactivate();
        }
        return this;
    }

    public addAttribute(buffer: GLBuffer, attribute: Attribute, size: number, type: number, normalized: boolean, stride: number, offset: number,initialize:boolean=true):GLVertexArrayObject {
        this.attributes.push({
            buffer,
            attribute,
            size,
            type,
            normalized,
            stride,
            offset,
            initialize
        });
        this.dirty = true;
        return this;
    }

    public setIndexBuffer(buffer:GLBuffer):GLVertexArrayObject{
        this.indexBuffer = buffer;
        return this;
    }

    public draw(mode:number,size:number,type:number,offset:number):GLVertexArrayObject{
        const gl = this.gl;
        gl.drawElements(mode,size,type,offset);
        return this;
    }

    /**
     * Removes all attributes from this vao
     * and deactivates the GLAttributes
     */
    public clear(){
        //Bind vao
        if(this.vao){
            this.gl.bindVertexArray(this.vao);
        }
        //Remove attributes
        this.deactivate();
        //clear attributes
        this.attributes.length = 0;
        //Remove indexBuffer
        this.indexBuffer = null;
        //Unbind vao
        if(this.vao){
            this.gl.bindVertexArray(null);
        }
    }

    /**
     * Clears the buffer the removes all references
     * making it free for gc
     */
    public destroy(){
        this.clear();
        if(this.vao){
            this.gl.deleteVertexArray(this.vao);
        }
        this.gl = undefined;
        this.indexBuffer = undefined;
        this.attributes = undefined;
        this.vao = undefined;
    }

    public static setVertexAttribArrays(gl:WebGL2RenderingContext, attributes:Array<IAttribute>, unbind:boolean=false):void{
        for(let i=0, attribute:IAttribute; attribute = attributes[i]; i++){
            GLVertexArrayObject.setVertexAttribArray(gl,attribute,unbind);
        }
    }

    public static setVertexAttribArray(gl:WebGL2RenderingContext,attribute:IAttribute,unbind:boolean=false):void{
        if(attribute.initialize && attribute.attribute){
            gl.vertexAttribPointer(attribute.attribute.location,attribute.size,attribute.type,attribute.normalized,attribute.stride,attribute.offset);
            attribute.initialize = false;
        }
        if(unbind && attribute.attribute){
            gl.disableVertexAttribArray(attribute.attribute.location);
        }else if(attribute.attribute){
            gl.enableVertexAttribArray(attribute.attribute.location);
        }
    }
}
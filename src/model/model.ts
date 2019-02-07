import {BufferView, Modelbuffer} from "./data";
import {AttributeAccessor, Primitive} from "./mesh";
import {Attributes, GL_BUFFERS, GL_PRIMITIVES, GLBuffer} from "../gl";
import {Material} from "../material";
import GLAttribute = Attributes.GLAttribute;
import {Transform} from "./transform";
import {Cache, CACHE_TYPE} from "../cache";
import {Shader} from "./shader";


export class Model {
    private _buffer:Modelbuffer;
    private _meshes:Array<Primitive>;
    private _transform?:Transform;

    constructor(){
        this._buffer = new Modelbuffer();
        this._meshes = [];
    }

    /**
     * init this modell by creating the GPUBuffers(Vertex- and Indexbuffer)
     * ot upload the data to an existing buffer
     * @param {WebGL2RenderingContext} gl
     * @param {GLBuffer} vertexBuffer - use existing VertexBuffer and add the model data into it
     * @param {GLBuffer} indexBuffer - use existing IndexBuffer and add the model indices into it
     * @returns {Model}
     */
    public init(gl:WebGL2RenderingContext,vertexBuffer?:GLBuffer,indexBuffer?:GLBuffer):Model {
        this.initBuffers(gl,vertexBuffer,indexBuffer);
        this.setIndexBuffers(gl);
        return this;
    }

    /**
     * Create the GLBuffers from the model data(bufferviews)
     * @param {WebGL2RenderingContext} gl
     */
    private initBuffers(gl:WebGL2RenderingContext,vertexBuffer?:GLBuffer,indexBuffer?:GLBuffer):void{
        for(let i=0,view:BufferView; view = this._buffer.views[i]; i++){
            if(view.buffer === null || view.buffer === undefined){
                let buffer:GLBuffer;
                if(view.target === GL_BUFFERS.ARRAY_BUFFER){
                    buffer = vertexBuffer||GLBuffer.create(gl,view.target,null,view.drawType);
                }else{
                    buffer = indexBuffer||GLBuffer.create(gl,view.target,null,view.drawType);
                }
                view.bufferOffset = buffer.byteLength;
                let data = this.sliceBuffer(view);
                buffer.addData(data);
                let length = this._buffer.buffers.push(buffer);
                view.buffer = length-1;
            }
        }
    }

    /**
     * Slice up the Model data ArrayBuffer into smaller ArrayBuffers
     * @param {BufferView} view
     * @returns {ArrayBuffer}
     */
    private sliceBuffer(view:BufferView):ArrayBuffer{
        let data = this._buffer.data[view.dataIdx];
        if(data instanceof ArrayBuffer){
            return data.slice(view.byteOffset,view.byteOffset+view.byteLength);
        }else {
            return data['buffer'].slice(view.byteOffset,view.byteOffset+view.byteLength);
        }
    }

    /**
     * Create all the VAO for the IndexBuffers
     * @param {WebGL2RenderingContext} gl
     */
    private setIndexBuffers(gl:WebGL2RenderingContext):void{
        for(let i=0,mesh:Primitive; mesh = this._meshes[i]; i++){
            if(mesh.indices && mesh.indices.bufferView !== undefined && mesh.indices.bufferView !== null) {
                let view = this._buffer.views[mesh.indices.bufferView];
                mesh.initVertexArrayObject(gl, this._buffer.buffers[view.buffer]);
            }
        }
    }

    /**
     * Make sure to initialize(init) the Model before uploading the data
     * Create the GPU_Buffers and upload this Model to the GPU
     * @returns {Model}
     */
    public upload():Model{
        for(let i=0, view:BufferView; view = this._buffer.views[i]; i++){
            if(view.buffer === undefined || view.buffer === null || !this._buffer.buffers[view.buffer]){
                throw "Modell has not been initialized missing Buffers, make sure to initialize the modell buffers!";
            }
            let buffer = this._buffer.buffers[view.buffer];
            //Upload the data into the buffer
            buffer.upload();
        }
        return this;
    }

    /**
     * Draws all Meshes that form the Model
     * @param {Shader} shader - Shader that should be used for all meshes/Materials
     * @param {Cache} cache - cache to get the materials
     */
    public draw(shader: Shader, cache: Cache):void {
        let offset = 0;
        let view:BufferView;
        for(let i=0, mesh:Primitive; mesh = this._meshes[i]; i++){
            view = this._buffer.views[mesh.indices.bufferView];
            offset = view.bufferOffset + mesh.indices.byteOffset;
            shader.applyMaterial(cache.get<Material>(CACHE_TYPE.MATERIAL, mesh.material));
            mesh.draw(mesh.draw_mode,mesh.indices.count,mesh.indices.type,offset);
        }
    }

    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key:GL_PRIMITIVES,shader:Shader,glAttribute:GLAttribute):void{
        shader.bind();
        for(let i=0, mesh:Primitive; mesh = this._meshes[i]; i++){
            let attribute:AttributeAccessor = mesh.attributes[key];
            if(attribute !== null && attribute !== undefined) {
                let view:BufferView = this._buffer.views[attribute.bufferView];
                let buffer:GLBuffer = this._buffer.buffers[view.buffer];
                let offset = view.bufferOffset + attribute.byteOffset;
                mesh.vertexArrayObject.addAttribute(buffer, glAttribute, attribute.size, attribute.type, attribute.normalized, attribute.stride, offset);
            }else{
                console.warn('Primitive has no Attribute'+key);
            }
        }
        shader.unbind();
    }

    /**
     * check if any mesh in this model has the attribute
     * @param key - key of the attribute e.g. TANGENT,NORMAL, etc.
     */
    hasAttribute(key:GL_PRIMITIVES|string):boolean {
        for(let i=0, mesh:Primitive; mesh = this._meshes[i]; i++){
           if(mesh.hasAttribute(key)){
               return true;
           }
        }
        return false;
    }

    public unload():void{
        //TODO: destroy buffers and each mesh vao
    }

    public addMesh(mesh:Primitive):Primitive{
        this._meshes.push(mesh);
        return mesh;
    }

    public get buffer():Modelbuffer {
        return this._buffer;
    }

    public set buffer(value:Modelbuffer) {
        this._buffer = value;
    }

    public get meshes():Array<Primitive> {
        return this._meshes;
    }

    public set meshes(value:Array<Primitive>) {
        this._meshes = value;
    }

    public get transform():Transform {
        return this._transform;
    }

    public set transform(value:Transform) {
        this._transform = value;
    }
}
import {BufferView} from "./data";
import {Primitive} from "./primitive";
import {GL_BUFFERS, GL_PRIMITIVES, GLAttribute, GLBuffer} from "@curbl/gl-util";
import {Material, MATERIAL_MAPS} from "../material";
import {Cache, CACHE_TYPE} from "../cache";
import {Shader} from "./shader";
import {Accessor} from "./data/accessor";

export class Mesh {
    //TODO still not sure if keeping bufferViews on mesh level or on primitive level
    private _bufferViews:{[idx:number]:BufferView};
    private _primitives:Array<Primitive>;
    private _name:string;

    constructor(){
        this._primitives = [];
        this._bufferViews = Object.create(null);
    }

    /**
     * init this modell by creating the GPUBuffers(Vertex- and Indexbuffer)
     * ot upload the data to an existing buffer
     * @param {WebGL2RenderingContext} gl
     * @param {GLBuffer} vertexBuffer - use existing VertexBuffer and add the gltf data into it
     * @param {GLBuffer} indexBuffer - use existing IndexBuffer and add the gltf indices into it
     * @returns {Mesh}
     */
    public init(gl:WebGL2RenderingContext,vertexBuffer?:GLBuffer,indexBuffer?:GLBuffer):Mesh {
        this.initBuffers(gl,vertexBuffer,indexBuffer);
        this.setIndexBuffers(gl);
        return this;
    }

    private initBuffers(gl: WebGL2RenderingContext, vertexBuffer?:GLBuffer, indexBuffer?:GLBuffer) {
        const keys = Object.keys(this._bufferViews);
        for(let i=0, view:BufferView; view = this._bufferViews[keys[i]]; i++) {
            if(view.buffer === null || view.buffer === undefined){
                let buffer:GLBuffer;
                if(view.target === GL_BUFFERS.ARRAY_BUFFER){
                    buffer = vertexBuffer||GLBuffer.create(gl,view.target,null,view.drawType);
                }else{
                    buffer = indexBuffer||GLBuffer.create(gl,view.target,null,view.drawType);
                }
                view.bufferOffset = buffer.byteLength;
                buffer.addData(view.data);
                view.buffer = buffer;
            }
        }
    }

    /**
     * Create all the VAO for the IndexBuffers
     * @param {WebGL2RenderingContext} gl
     */
    private setIndexBuffers(gl:WebGL2RenderingContext):void{
        for(let i=0,primitive:Primitive; primitive = this._primitives[i]; i++){
            if(primitive.indices && primitive.indices.bufferView !== undefined && primitive.indices.bufferView !== null) {
                const view = this._bufferViews[primitive.indices.bufferView];
                primitive.initVertexArrayObject(gl, view.buffer);
            }
        }
    }

    /**
     * Make sure to initialize(init) the Mesh before uploading the data
     * Create the GPU_Buffers and upload this Mesh to the GPU
     * @returns {Mesh}
     */
    public upload():Mesh {
        const keys = Object.keys(this._bufferViews);
        for(let i=0, view:BufferView; view = this._bufferViews[keys[i]]; i++){
            if(!view.buffer) {
                throw "Failed to upload buffer for bufferView, did you forget to initialize the buffer first?";
            }
            view.buffer.upload();
        }
        return this;
    }

    /**
     * Draws all Meshes that form the Mesh
     * @param {Shader} shader - Shader that should be used for all primitives/Materials
     * @param {Cache} cache - cache to get the materials
     */
    public draw(shader: Shader, cache: Cache):void {
        shader.applyMesh(this);
        for(let i=0, primitive:Primitive; primitive = this._primitives[i]; i++){
            const view = this._bufferViews[primitive.indices.bufferView];
            const offset = view.bufferOffset + primitive.indices.byteOffset;
            shader.applyMaterial(cache.get<Material>(CACHE_TYPE.MATERIAL, primitive.material));
            primitive.draw(primitive.draw_mode, primitive.indices.count, primitive.indices.componentType, offset);
        }
    }

    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key:GL_PRIMITIVES, glAttribute: GLAttribute):void{
        for(let i=0, primitive:Primitive; primitive = this._primitives[i]; i++){
            const attribute:Accessor = primitive.attributes[key];
            if(attribute !== null && attribute !== undefined) {
                const view:BufferView = this._bufferViews[attribute.bufferView];
                const buffer:GLBuffer = view.buffer;
                const offset = view.bufferOffset + attribute.byteOffset;
                primitive.vertexArrayObject.addAttribute(buffer, glAttribute, attribute.componentTypeCount, attribute.componentType, attribute.normalized, attribute.stride, offset);
            }
        }
    }

    /**
     * check if any primitive in this mesh has the attribute
     * @param key - key of the attribute e.g. TANGENT,NORMAL, etc.
     */
    hasAttribute(key:GL_PRIMITIVES|string):boolean {
        for(let i=0, primitive:Primitive; primitive = this._primitives[i]; i++){
           if(primitive.hasAttribute(key)){
               return true;
           }
        }
        return false;
    }

    /**
     * check if any material used by a primitve has the map with the specified key
     * @param cache - cache to get the material from
     * @param key - key of the map e.g ALBEDO, METALIC_ROUGHNESS etc.
     */
    hasMap(cache:Cache,key:MATERIAL_MAPS): boolean {
        for(let i=0, primitive:Primitive; primitive = this._primitives[i]; i++) {
            const material = cache.get<Material>(CACHE_TYPE.MATERIAL, primitive.material);
            if(material) {
                return material.hasMap(key);
            }
        }
    }

    public unload():void{
        //TODO: destroy data and each mesh vao
    }

    public addPrimitive(mesh:Primitive):Primitive{
        this._primitives.push(mesh);
        return mesh;
    }

    public get primitives():Array<Primitive> {
        return this._primitives;
    }

    public set primitives(value:Array<Primitive>) {
        this._primitives = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    addBufferView(idx:number,bufferView:BufferView) {
        this._bufferViews[idx] = bufferView;
    }
}
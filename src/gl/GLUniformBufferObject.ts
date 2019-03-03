
export type UBOType = "float"|"int"|"bool"|"boolean"|"mat4"|"mat3"|"vec2"|"vec3"|"vec4";

export interface UBOItem {
    type:UBOType;
    offset?:number;
    alignment?: number;
    blockSize?: number;
    alignedByteLength?: number;
    data:ArrayBufferView|ArrayBuffer;
}

export class GLUniformBufferObject {

    private static TYPE_TO_SIZE = {
        float: [4,4],
        int: [4,4],
        bool: [4,4],
        boolean: [4,4],
        mat4: [64,64],
        mat3: [48,48],
        vec4: [16,16],
        vec3: [16,12],
        vec2: [8,8]
    };

    private gl:WebGL2RenderingContext;

    private items:{[id:string]:UBOItem};

    /**
     * The draw type of the buffer
     * @member {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
     */
    private drawType:number;
    private type:number;
    private buffer:WebGLBuffer;
    private _bindingPoint:number;
    private _byteLength:number;

    constructor(gl:WebGL2RenderingContext,bindPoint:number=0, drawType:number=gl.DYNAMIC_DRAW){
        this.gl = gl;
        this.type = gl.UNIFORM_BUFFER;
        this.buffer = gl.createBuffer();
        this.items = {};
        this.drawType = drawType;
        this._bindingPoint = bindPoint;
        this._byteLength = 0;
    }


    /**
     * Add an item/property to the UBO
     * make sure that the order of the items is right
     */
    public addItem(name:string,type:UBOType,data?:ArrayBuffer|ArrayBufferView):void{
        this.items[name] = {type:type, offset:0, blockSize: 0, alignedByteLength: 0, data:data};
    }

    /**
     * Add an block of items/properties to the UBO
     * make sure the order is the same as in the shader
     */
    public addBlock(items:Array<{name:string,type:UBOType,data?:ArrayBuffer|ArrayBufferView}>):void {
        for(let i=0, item; item = items[i]; i++){
            this.addItem(item.name,item.type,item.data);
        }
    }

    /**
     * Update the item data
     * @param name - name of the item
     * @param data - new data
     * @param updateGL -
     */
    public updateItem(name:string,data:ArrayBuffer|ArrayBufferView,updateGL:boolean=false):void {
        this.items[name].data = data;
        if(updateGL){
            this.updateGL(name);
        }
    }

    public hasItem(name:string):boolean {
        return !!this.items[name];
    }

    public removeItem(name:string,updateGL:boolean=false):void {
        delete this.items[name];
        this.upload();
    }

    /**
     * Update the Buffer for a single item
     * @param name
     */
    public updateGL(name:string):void {
        const item = this.items[name];
        if(item.data) {
            this.bind();
            this.gl.bufferSubData(this.type, item.offset, item.data as ArrayBufferView);
            this.unbind();
        }
    }

    /**
     * upload one buffer instead of adding multiple small items
     * @param data - the buffer containing all values
     * @param byteLength - the aligned componentTypeCount of the UBO
     */
    public uploadBuffer(byteLength:number, data?:ArrayBufferView|ArrayBuffer, length?:number):number {
        this._byteLength = byteLength;
        const gl = this.gl;
        this.bind();
        gl.bufferData(this.type, this._byteLength, this.drawType);
        if(data) {
            gl.bufferSubData(this.type, 0, data as ArrayBufferView, length);
        }
        this.unbind();
        return this._byteLength;
    }

    /**
     * Uploads all data to the gpu
     */
    public upload():number{
        this._byteLength = this.updateItemAlignment();
        this.bind();
        const gl = this.gl;
        gl.bufferData(this.type,this._byteLength,this.drawType);
        for(let i=0, item:UBOItem; item = this.items[i]; i++){
            if(item.data) {
                gl.bufferSubData(this.type, item.offset, item.data as ArrayBufferView);
            }
        }
        this.unbind();
        return this._byteLength;
    }

    public bindUBO(bindingPoint:number=this._bindingPoint, offset:number=0, size:number=this._byteLength):void {
        if(offset === 0 && size === this._byteLength){
            this.gl.bindBufferBase(this.type,bindingPoint,this.buffer);
        }else {
            this.gl.bindBufferRange(this.type, bindingPoint, this.buffer, offset, size);
        }
    }

    private bind(){
        this.gl.bindBuffer(this.type,this.buffer);
    }

    private unbind(){
        this.gl.bindBuffer(this.type,null);
    }

    public destroy(){
        if(this.gl.isBuffer(this.buffer)){
            this.gl.deleteBuffer(this.buffer);
        }
        this.gl = null;
        this.buffer = null;
    }

    private updateItemAlignment():number {
        let prevItem:UBOItem = null;
        let byteLength = 0;

        const keys = Object.keys(this.items);
        for(let i=0, item:UBOItem; item = this.items[keys[i]]; i++){
            if(!item.data){
                continue;
            }

            const sizes = GLUniformBufferObject.TYPE_TO_SIZE[item.type];
            item.alignment = item.alignedByteLength = sizes[0];
            item.blockSize = sizes[1];

            //check if array
            if(item.data.byteLength !== item.blockSize){
                const length = item.data.byteLength / item.blockSize;
                item.alignedByteLength = item.alignment * length;
            }

            if(prevItem) {
                item.offset = prevItem.alignedByteLength + prevItem.offset;
            }

            prevItem = item;
            byteLength += item.alignedByteLength;
        }

        return byteLength;
    }


    get bindingPoint(): number {
        return this._bindingPoint;
    }

    set bindingPoint(value: number) {
        this._bindingPoint = value;
    }

    get byteLength(): number {
        return this._byteLength;
    }

    set byteLength(value: number) {
        this._byteLength = value;
    }
}
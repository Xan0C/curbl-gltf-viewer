import {IGLTF_BufferView} from "./model";
import {BufferView} from "../model/data";
import {GL_BUFFERS} from "../gl/constants";
import {GLTFModel} from "./GLTFModel";

export class GLTFBufferViewProcessor {

    private model:GLTFModel;
    private _buffers:Array<BufferView>;

    constructor(model:GLTFModel) {
        this._buffers = [];
        this.model = model;
    }

    /**
     * get/create the BufferViewObject for this accessor
     * @param accessor
     * @param idx
     * @param isIndexBuffer
     */
    getBufferView(idx:number, isIndexBuffer:boolean=false): BufferView {
        const gltf = this.model.gltf;

        if(!this._buffers[idx]) {
            this._buffers[idx] = this.createBufferView(gltf.bufferViews[idx]);
            this._buffers[idx].target = isIndexBuffer ? GL_BUFFERS.ELEMENT_ARRAY_BUFFER :GL_BUFFERS.ARRAY_BUFFER;
        }

        return this._buffers[idx];
    }

    /**
     * Create a Bufferfiew from the GLTF_Bufferview
     * @param {Array<ArrayBuffer|ArrayBufferView>} buffers
     * @param {IGLTF_BufferView} bufferView
     * @returns {BufferView}
     */
    private createBufferView(bufferView:IGLTF_BufferView): BufferView {
        const view = new BufferView();
        view.data = this.sliceBuffer(bufferView);
        view.target = bufferView.target;
        return view;
    }

    /**
     * Slice up the Mesh data ArrayBuffer into smaller ArrayBuffers
     * @param {Array<ArrayBuffer|ArrayBufferView>} buffers
     * @param {BufferView} view
     * @returns {ArrayBuffer}
     */
    private sliceBuffer(view:IGLTF_BufferView): ArrayBuffer {
        const data = this.model.data[view.buffer];
        const offset = view.byteOffset||0;
        if(data instanceof ArrayBuffer){
            return data.slice(offset,offset+view.byteLength);
        }else {
            return data['buffer'].slice(offset,offset+view.byteLength);
        }
    }

    get buffers(): Array<BufferView> {
        return this._buffers;
    }

    set buffers(value: Array<BufferView>) {
        this._buffers = value;
    }
}
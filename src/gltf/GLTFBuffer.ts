import {BufferView} from "../scene/data";
import {GL_BUFFERS} from "../gl/constants";
import {IGLTF_Accessor, IGLTF_BufferView, IGLTF_Model} from "./model";
import {Buffermap} from "../scene/data/buffermap";

export class GLTFBuffer {

    private gltfModel:IGLTF_Model;
    private buffers:Array<ArrayBufferView|ArrayBuffer>;
    private buffermap:Buffermap;

    constructor(gltfModel:IGLTF_Model, buffers:Array<ArrayBufferView|ArrayBuffer>) {
        this.buffermap = new Buffermap();
        this.gltfModel = gltfModel;
        this.buffers = buffers;
        this.createBufferViews();
    }

    private createBufferViews() {
        for(let i=0, bufferView:IGLTF_BufferView; bufferView = this.gltfModel.bufferViews[i]; i++) {
            const view = this.createBufferView(bufferView);
            this.buffermap.views.push(view);
        }
    }
    /**
     * map the bufferview used by the accessor to the given map
     * @param {IGLTF_Model} model
     * @param {Array<ArrayBuffer|ArrayBufferView>} buffers
     * @param {Buffermap} buffermap
     * @param {number} accessor
     * @param {boolean} isIndexBuffer - if the arrayBuffer is for a vertexBuffer(ARRAY_BUFFER) or indexBuffer(ELEMENT_ARRAY_BUFFER)
     */
    public mapBufferViewToMap(
        buffermap: Buffermap,
        accessor:IGLTF_Accessor,
        isIndexBuffer:boolean=false
    ):void {
        //only create new bufferview if not already referenced
        const view = this.buffermap.views[accessor.bufferView];
        //set target for the BufferView IndexBuffer or Vertex/ArrayBuffer
        view.target = isIndexBuffer ? view.target||GL_BUFFERS.ELEMENT_ARRAY_BUFFER : view.target||GL_BUFFERS.ARRAY_BUFFER;
        //BufferView needs the same type as its accessor
        if(view.componentType === undefined || view.componentType === null) {
            view.componentType = accessor.componentType;
        }
        //map accessor bufferViewIdx to new Buffer
        accessor.bufferView = buffermap.views.push(view) - 1;
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
        const data = this.buffers[view.buffer];
        const offset = view.byteOffset||0;
        if(data instanceof ArrayBuffer){
            return data.slice(offset,offset+view.byteLength);
        }else {
            return data['buffer'].slice(offset,offset+view.byteLength);
        }
    }
}
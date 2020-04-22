import { IGLTF_Accessor, IGLTF_BufferView } from './model';
import { BufferView, GLTF_ACCESORTYPE_SIZE } from '../scene/data';
import { GL_BUFFERS, GL_TYPES } from '@curbl/gl-util';
import { GLTFModel, TypedArray } from './GLTFModel';

export class GLTFAccessorProcessor {
    private model: GLTFModel;
    private buffers: Array<BufferView>;

    constructor(model: GLTFModel) {
        this.buffers = [];
        this.model = model;
    }

    /**
     * get/create the BufferViewObject for this accessor
     * @param accessor
     * @param idx
     * @param isIndexBuffer
     */
    public getBufferView(idx: number, isIndexBuffer = false): BufferView {
        const gltf = this.model.gltf;

        if (!this.buffers[idx]) {
            this.buffers[idx] = this.createBufferView(gltf.bufferViews[idx]);
        }
        //get the bufferView
        const view = this.buffers[idx];
        //set target for the BufferView IndexBuffer or Vertex/ArrayBuffer
        view.target = isIndexBuffer ? view.target || GL_BUFFERS.ELEMENT_ARRAY_BUFFER : view.target || GL_BUFFERS.ARRAY_BUFFER;
        return view;
    }

    public getAccessorData(accessor: IGLTF_Accessor): TypedArray {
        return this.accessor2TypedArray(
            this.getBufferView(accessor.bufferView).data,
            accessor.byteOffset,
            GLTF_ACCESORTYPE_SIZE[accessor.type] * accessor.count,
            accessor.componentType
        );
    }

    /**
     * Create a Bufferfiew from the GLTF_Bufferview
     * @param {Array<ArrayBuffer|ArrayBufferView>} buffers
     * @param {IGLTF_BufferView} bufferView
     * @returns {BufferView}
     */
    private createBufferView(bufferView: IGLTF_BufferView): BufferView {
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
    private sliceBuffer(view: IGLTF_BufferView): ArrayBuffer {
        const data = this.model.data[view.buffer];
        const offset = view.byteOffset || 0;
        if (data instanceof ArrayBuffer) {
            return data.slice(offset, offset + view.byteLength);
        } else {
            return data['buffer'].slice(offset, offset + view.byteLength);
        }
    }

    private accessor2TypedArray(buffer: ArrayBuffer, byteOffset: number, count: number, componentType: GL_TYPES): TypedArray {
        switch (componentType) {
            case GL_TYPES.BYTE:
                return new Int8Array(buffer, byteOffset, count);
            case GL_TYPES.UNSIGNED_BYTE:
                return new Uint8Array(buffer, byteOffset, count);
            case GL_TYPES.SHORT:
                return new Int16Array(buffer, byteOffset, count);
            case GL_TYPES.UNSIGNED_SHORT:
                return new Int16Array(buffer, byteOffset, count);
            case GL_TYPES.INT:
                return new Int32Array(buffer, byteOffset, count);
            case GL_TYPES.UNSIGNED_INT:
                return new Int32Array(buffer, byteOffset, count);
            case GL_TYPES.FLOAT:
                return new Float32Array(buffer, byteOffset, count);
        }
    }
}

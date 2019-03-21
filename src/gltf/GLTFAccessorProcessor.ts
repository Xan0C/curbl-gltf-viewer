import {Accessor} from "../model/data";
import {GL_TYPES} from "../gl/constants";
import {GLTFModel, TypedArray} from "./GLTFModel";

export class GLTFAccessorProcessor {

    private model:GLTFModel;
    private accessors:Array<Accessor>;

    constructor(model:GLTFModel) {
        this.accessors = [];
        this.model = model;
    }

    getAccessor(idx:number, indexBuffer?:boolean): Accessor {
        const gltf = this.model.gltf;

        if(this.accessors[idx]) {
            return this.accessors[idx];
        }

        const accessor = new Accessor();
        const gltfAccessor = gltf.accessors[idx];

        accessor.count = gltfAccessor.count;
        accessor.type = gltfAccessor.type;
        accessor.bufferView = this.model.getBufferView(gltfAccessor.bufferView, indexBuffer);
        accessor.byteOffset = gltfAccessor.byteOffset||0;
        accessor.componentType = gltfAccessor.componentType;
        accessor.max = gltfAccessor.max;
        accessor.min = gltfAccessor.min;
        accessor.normalized = gltfAccessor.normalized;
        accessor.stride = gltf.bufferViews[gltfAccessor.bufferView].byteStride||0;

        this.accessors[idx] = accessor;
        return this.accessors[idx];
    }

    getAccessorData(accessor: Accessor): TypedArray {
        return this.accessor2TypedArray(
            accessor.bufferView.data,
            accessor.byteOffset,
            accessor.componentTypeSize * accessor.count,
            accessor.componentType
        );
    }

    private accessor2TypedArray(buffer:ArrayBuffer, byteOffset:number, count:number, componentType:GL_TYPES): TypedArray {
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
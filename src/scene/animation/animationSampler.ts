import {Accessor} from "../data/accessor";
import {Buffermap} from "../data";
import {GL_TYPES} from "../../gl/constants";
import {quat, vec4} from "gl-matrix";

export enum Interpolation {
    LINEAR = "LINEAR",
    STEP = "STEP",
    CUBICSPLINE = "CUBICSPLINE"
}

export type TypedArray = Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array;

type LerpFunc = (out:quat|vec4, a:vec4, b:vec4, t:number) => quat|vec4;

//TODO: clean up, we can initialize this earlier and be smarter when we create the AnimationSampler
//TODO: maybe even store the input- and outputData in a list of vectors?
//TODO: maybe use UBO? and calculate animations on the gpu
export class AnimationSampler {
    buffer: Buffermap;
    input: Accessor;
    output: Accessor;
    interpolation:"LINEAR"|"STEP"|"CUBICSPLINE";
    inputData?:TypedArray;
    outputData?:TypedArray;

    private prevValue:vec4;
    private nextValue:vec4;
    private _value:vec4|quat;
    private _duration:number;

    constructor() {
        this.interpolation = Interpolation.LINEAR;
        this.buffer = new Buffermap();
        this.prevValue = vec4.create();
        this.nextValue = vec4.create();
        this._value = vec4.create();
        this._duration = 0;
    }

    private getAccessorData(accessor: Accessor) {
        //TODO is this always an ArrayBuffer?
        return this.accessor2TypedArray(
            this.buffer.views[accessor.bufferView].data as ArrayBuffer,
            accessor.byteOffset,
            accessor.componentTypeCount * accessor.count,
            accessor.type
        )
    }

    private accessor2TypedArray(buffer:ArrayBuffer, byteOffset:number, count:number, componentType:GL_TYPES) {
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

    private updateValue(idx:number, t:number) {
        const typeCount = this.output.componentTypeCount;
        const prevIdx = idx * typeCount;
        const nextIdx = (prevIdx + typeCount + 2) <= this.outputData.length ? prevIdx + typeCount : prevIdx;
        const lerp:LerpFunc = (typeCount === 4 ? quat.slerp : vec4.lerp) as LerpFunc;

        vec4.set(
            this.prevValue,
            this.outputData[prevIdx],
            this.outputData[prevIdx+1],
            this.outputData[prevIdx+2],
            typeCount === 3 ? 0 : this.outputData[prevIdx+3]
        );

        vec4.set(
            this.nextValue,
            this.outputData[nextIdx],
            this.outputData[nextIdx+1],
            this.outputData[nextIdx+2],
            typeCount === 3 ? 0 : this.outputData[nextIdx+3]
        );

        lerp(this._value, this.prevValue, this.nextValue, t);
    }

    init() {
        this.inputData = this.getAccessorData(this.input);
        this.outputData = this.getAccessorData(this.output);
        this._duration = this.inputData[this.inputData.length-1];
    }

    update(t:number) {
        let idx = 0;

        while(idx < this.inputData.length - 2 && t >= this.inputData[idx + 1]) {
            idx++;
        }

        const previousTime = this.inputData[idx];
        const nextTime = this.inputData[idx+1];
        const interpolationTime = Math.min(Math.max( 0, (t - previousTime) / (nextTime - previousTime)),1);
        this.updateValue(idx, interpolationTime);
    }

    get value(): number[] {
        return this._value as any as number[];
    }

    get duration(): number {
        return this._duration;
    }
}
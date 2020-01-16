import { quat, vec4 } from 'gl-matrix';
import { TypedArray } from '../../gltf/GLTFModel';

export enum Interpolation {
    LINEAR = 'LINEAR',
    STEP = 'STEP',
    CUBICSPLINE = 'CUBICSPLINE',
}

type LerpFunc = (out: quat | vec4, a: vec4, b: vec4, t: number) => quat | vec4;

export class AnimationSampler {
    private _interpolation: 'LINEAR' | 'STEP' | 'CUBICSPLINE';
    private _inputData: TypedArray;
    private _outputData: TypedArray;
    private _componentTypeCount: number;

    private prevValue: vec4;
    private nextValue: vec4;
    private _value: vec4 | quat;
    private _duration: number;

    constructor() {
        this._interpolation = Interpolation.LINEAR;
        this.prevValue = vec4.create();
        this.nextValue = vec4.create();
        this._value = vec4.create();
        this._duration = 0;
    }

    private updateValue(idx: number, t: number) {
        const typeCount = this._componentTypeCount;
        const prevIdx = idx * typeCount;
        const nextIdx = prevIdx + typeCount + 2 <= this._outputData.length ? prevIdx + typeCount : prevIdx;
        const lerp: LerpFunc = (typeCount === 4 ? quat.slerp : vec4.lerp) as LerpFunc;

        vec4.set(
            this.prevValue,
            this._outputData[prevIdx],
            this._outputData[prevIdx + 1],
            this._outputData[prevIdx + 2],
            typeCount === 3 ? 0 : this._outputData[prevIdx + 3]
        );

        vec4.set(
            this.nextValue,
            this._outputData[nextIdx],
            this._outputData[nextIdx + 1],
            this._outputData[nextIdx + 2],
            typeCount === 3 ? 0 : this._outputData[nextIdx + 3]
        );

        lerp(this._value, this.prevValue, this.nextValue, t);
    }

    update(t: number) {
        let idx = 0;

        while (idx < this._inputData.length - 2 && t >= this._inputData[idx + 1]) {
            idx++;
        }

        const previousTime = this._inputData[idx];
        const nextTime = this._inputData[idx + 1];
        const interpolationTime = Math.min(Math.max(0, (t - previousTime) / (nextTime - previousTime)), 1);
        this.updateValue(idx, interpolationTime);
    }

    get value(): number[] {
        return (this._value as any) as number[];
    }

    get duration(): number {
        return this._duration;
    }

    set duration(duration: number) {
        this._duration = duration;
    }

    get interpolation(): 'LINEAR' | 'STEP' | 'CUBICSPLINE' {
        return this._interpolation;
    }

    set interpolation(value: 'LINEAR' | 'STEP' | 'CUBICSPLINE') {
        this._interpolation = value;
    }

    get inputData(): TypedArray {
        return this._inputData;
    }

    set inputData(value: TypedArray) {
        this._inputData = value;
    }

    get outputData(): TypedArray {
        return this._outputData;
    }

    set outputData(value: TypedArray) {
        this._outputData = value;
    }

    get componentTypeCount(): number {
        return this._componentTypeCount;
    }

    set componentTypeCount(value: number) {
        this._componentTypeCount = value;
    }
}

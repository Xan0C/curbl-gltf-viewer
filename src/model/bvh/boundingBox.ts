import {mat4, vec3} from "gl-matrix";
import {BoundingVolume} from "./boundingVolume";

export class BoundingBox implements BoundingVolume<{ min: vec3, max: vec3 }> {
    private _min: vec3;
    private _max: vec3;
    private readonly _transform: mat4;
    private readonly _center: vec3;

    constructor(min: vec3, max: vec3) {
        this._min = min;
        this._max = max;
        this._transform = mat4.create();
        this._center = vec3.create();
        this.update(this);
    }

    update(bbox: { min: vec3, max: vec3 }): void {
        vec3.min(this._min, this._min, bbox.min);
        vec3.min(this._max, this._max, bbox.max);
        this.calculateTransform();
        this.calculateCenter();
    }

    private calculateTransform(): mat4 {
        // scale
        this._transform[0] = this._max[0] - this._min[0];
        this._transform[5] = this._max[1] - this._min[1];
        this._transform[10] = this._max[2] - this._min[2];
        // translate
        this._transform[12] = this._min[0];
        this._transform[13] = this._min[1];
        this._transform[14] = this._min[2];

        return this._transform;
    }

    private calculateCenter(): vec3 {
        this._center[0] = (this._min[0] + this._max[0]) / 2.0;
        this._center[1] = (this._min[1] + this._max[1]) / 2.0;
        this._center[2] = (this._min[2] + this._max[2]) / 2.0;

        return this._center;
    }

    get min(): vec3 {
        return this._min;
    }

    set min(value: vec3) {
        this._min = value;
    }

    get max(): vec3 {
        return this._max;
    }

    set max(value: vec3) {
        this._max = value;
    }

    get transform(): mat4 {
        return this.calculateTransform();
    }

    get center(): vec3 {
        return this.calculateCenter();
    }

    getAABB(matrix: mat4): BoundingBox {
        return BoundingBox.getAABBFromOBB(this, matrix);
    }

    static getAABBFromOBB(obb:BoundingBox, matrix: mat4): BoundingBox {
        const transformRight = vec3.create();
        const transformUp = vec3.create();
        const transformBackward = vec3.create();

        const tmpVec3a = vec3.create();
        const tmpVec3b = vec3.create();

        vec3.set(transformRight, matrix[0], matrix[1], matrix[2]);
        vec3.set(transformUp, matrix[4], matrix[5], matrix[6]);
        vec3.set(transformBackward, matrix[8], matrix[9], matrix[10]);

        const min = vec3.fromValues(matrix[12], matrix[13], matrix[14]);  // init with matrix translation
        const max = vec3.clone(min);

        vec3.scale(tmpVec3a, transformRight, obb.min[0]);
        vec3.scale(tmpVec3b, transformRight, obb.max[0]);
        vec3.min(transformRight, tmpVec3a, tmpVec3b);
        vec3.add(min, min, transformRight);
        vec3.max(transformRight, tmpVec3a, tmpVec3b);
        vec3.add(max, max, transformRight);

        vec3.scale(tmpVec3a, transformUp, obb.min[1]);
        vec3.scale(tmpVec3b, transformUp, obb.max[1]);
        vec3.min(transformUp, tmpVec3a, tmpVec3b);
        vec3.add(min, min, transformUp);
        vec3.max(transformUp, tmpVec3a, tmpVec3b);
        vec3.add(max, max, transformUp);

        vec3.scale(tmpVec3a, transformBackward, obb.min[2]);
        vec3.scale(tmpVec3b, transformBackward, obb.max[2]);
        vec3.min(transformBackward, tmpVec3a, tmpVec3b);
        vec3.add(min, min, transformBackward);
        vec3.max(transformBackward, tmpVec3a, tmpVec3b);
        vec3.add(max, max, transformBackward);

        const bbox = new BoundingBox(min, max);
        bbox.calculateTransform();
        return bbox;
    }
}
import {mat4} from "gl-matrix";
import {GLUniformBufferObject} from "../../gl/GLUniformBufferObject";
import {UBO_BINDINGS} from "../../viewer/constants";
import {Transform} from "../transform";

const NUM_MAX_JOINTS = 65;

export class Skin {
    private _data:Float32Array;
    private _joints:Array<Transform>;
    private _skeleton:Transform;
    private _inverseBindMatrices:Array<mat4>;
    private _jointMatrices:Array<mat4>;
    private _ubo:GLUniformBufferObject;
    private _dirty:boolean;

    constructor() {
        this._joints = [];
        this._inverseBindMatrices = [];
        this._jointMatrices = [];
        this._data = new Float32Array(NUM_MAX_JOINTS * 16);
        this._dirty = true;
    }

    init(gl: WebGL2RenderingContext) {
        for(let i=0; i < this._joints.length; i++) {
            this._jointMatrices.push(mat4.create());
        }
        this._ubo = new GLUniformBufferObject(gl, UBO_BINDINGS.SKIN);
        this._ubo.addItem('matrix', 'mat4', this._data);
        this._ubo.upload();
        this._ubo.bindUBO();

        //this.update();
    }

    update(transform: Transform):void {
        if(!this._dirty) {
            return;
        }

        const inverseTransformMatrix = mat4.create();
        //TODO: skin.skeleton.transform.modelMatrix if skeleton provided
        mat4.invert(inverseTransformMatrix, transform.modelMatrix);

        for(let i=0, join:Transform; join = this._joints[i]; i++) {
            const joinMatrix = this._jointMatrices[i];
            mat4.mul(joinMatrix, join.modelMatrix, this._inverseBindMatrices[i]);
            mat4.mul(joinMatrix, inverseTransformMatrix, joinMatrix);
            this._data.set(joinMatrix, i*16);
        }

        this._ubo.updateItem("matrix", this._data, true);
        this._dirty = true;
    }

    get joints(): Array<Transform> {
        return this._joints;
    }

    set joints(value: Array<Transform>) {
        this._joints = value;
    }

    get skeleton(): Transform {
        return this._skeleton;
    }

    set skeleton(value: Transform) {
        this._skeleton = value;
    }

    get inverseBindMatrices() {
        return this._inverseBindMatrices;
    }

    set inverseBindMatrices(value) {
        this._inverseBindMatrices = value;
    }

    get jointMatrices(): Array<mat4> {
        return this._jointMatrices;
    }

    set jointMatrices(value: Array<mat4>) {
        this._jointMatrices = value;
    }

    get ubo(): GLUniformBufferObject {
        return this._ubo;
    }

    set ubo(value: GLUniformBufferObject) {
        this._ubo = value;
    }
}
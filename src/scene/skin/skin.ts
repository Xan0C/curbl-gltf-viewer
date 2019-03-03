import {SceneNode} from "../sceneNode";
import {mat4} from "gl-matrix";
import {GLUniformBufferObject} from "../../gl/GLUniformBufferObject";
import {UBO_BINDINGS} from "../../viewer/constants";

const NUM_MAX_JOINTS = 65;

export class Skin {
    private _data:Float32Array;
    private _joints:Array<SceneNode>;
    private _skeleton:SceneNode;
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

    update():void {
        if(!this._dirty) {
            return;
        }

        for(let i=0, jointMatrix:mat4; jointMatrix = this._jointMatrices[i]; i++) {
            this._data.set(jointMatrix, i*16);
        }

        this._ubo.updateItem("matrix", this._data, true);
        this._dirty = false;
    }

    get joints(): Array<SceneNode> {
        return this._joints;
    }

    set joints(value: Array<SceneNode>) {
        this._joints = value;
    }

    get skeleton(): SceneNode {
        return this._skeleton;
    }

    set skeleton(value: SceneNode) {
        this._skeleton = value;
    }

    get inverseBindMatrices() {
        return this._inverseBindMatrices;
    }

    set inverseBindMatrices(value) {
        this._inverseBindMatrices = value;
    }

    get jointMatrices(): Array<mat4> {
        this._dirty = true;
        return this._jointMatrices;
    }

    set jointMatrices(value: Array<mat4>) {
        this._dirty = true;
        this._jointMatrices = value;
    }

    get ubo(): GLUniformBufferObject {
        return this._ubo;
    }

    set ubo(value: GLUniformBufferObject) {
        this._ubo = value;
    }
}
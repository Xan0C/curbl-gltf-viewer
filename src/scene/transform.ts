import { mat4, quat, vec3 } from 'gl-matrix';

export type TransformConfig = {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number; w: number };
    scale: { x: number; y: number; z: number };
};

export class Transform {
    private _level: number;
    private _parent: Transform;
    private _children: Transform[];
    private _localMatrix: mat4;
    private _worldMatrix: mat4;
    private _rotation: quat;
    private _translation: vec3;
    private _scale: vec3;
    private _dirty: boolean;

    constructor(
        config: TransformConfig = {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0, w: 1 },
            scale: { x: 1, y: 1, z: 1 },
        }
    ) {
        this.init(config);
    }

    init(
        config: TransformConfig = {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0, w: 1 },
            scale: { x: 1, y: 1, z: 1 },
        }
    ): void {
        //M=T*R*S
        this._localMatrix = mat4.create();
        if (!config) {
            config = Object.create(null);
        }
        if (!config.position) {
            config.position = { x: 0, y: 0, z: 0 };
        }
        if (!config.rotation) {
            config.rotation = { x: 0, y: 0, z: 0, w: 1 };
        }
        if (!config.scale) {
            config.scale = { x: 1, y: 1, z: 1 };
        }

        this._rotation = quat.fromValues(config.rotation.x, config.rotation.y, config.rotation.z, config.rotation.w);
        this._translation = vec3.fromValues(config.position.x, config.position.y, config.position.z);
        this._scale = vec3.fromValues(config.scale.x, config.scale.y, config.scale.z);
        this._children = [];
        this._level = 0;
        this._dirty = true;
        this._worldMatrix = mat4.create();
        this.apply();
    }

    public addChild(child: Transform): void {
        if (child._parent) {
            child._parent.removeChild(child);
        }
        child._parent = this;
        child._level = this._level + 1;
        this._children.push(child);
    }

    public removeChild(child: Transform): void {
        const index = this._children.indexOf(child);
        if (index > -1) {
            child._level = 0;
            child._parent = undefined;
            this._children.splice(index, 1);
        }
    }

    private apply(): mat4 {
        if (this._dirty) {
            mat4.fromRotationTranslationScale(this._localMatrix, this._rotation, this._translation, this._scale);
            this._dirty = false;
        }
        return this._localMatrix;
    }

    //TODO: check if we need to recalculate worldMatrix
    get worldMatrix(): mat4 {
        if (!this._parent) {
            return this.apply();
        } else {
            return mat4.multiply(this._worldMatrix, this._parent.worldMatrix, this.localMatrix);
        }
    }

    get modelMatrix(): mat4 {
        return this.worldMatrix;
    }

    /**
     * Returns the LocalTransformation Matrix
     * @returns {Matrix}
     */
    public get localMatrix(): mat4 {
        return this.apply();
    }

    public set localMatrix(value: mat4) {
        mat4.getRotation(this._rotation, value);
        mat4.getTranslation(this._translation, value);
        mat4.getScaling(this._scale, value);
        this._dirty = true;
    }

    public get translation(): vec3 {
        this._dirty = true;
        return this._translation;
    }

    public set translation(value: vec3) {
        this._dirty = true;
        this._translation = value;
    }

    public get rotation(): quat {
        this._dirty = true;
        return this._rotation;
    }

    public set rotation(value: quat) {
        this._dirty = true;
        this._rotation = value;
    }

    public get scale(): vec3 {
        this._dirty = true;
        return this._scale;
    }

    public set scale(value: vec3) {
        this._dirty = true;
        this._scale = value;
    }

    get level(): number {
        return this._level;
    }

    get parent(): Transform {
        return this._parent;
    }

    set parent(value: Transform) {
        this._parent = value;
    }

    get children(): Transform[] {
        return this._children;
    }

    set children(value: Transform[]) {
        this._children = value;
    }

    get dirty(): boolean {
        return this._dirty;
    }
}

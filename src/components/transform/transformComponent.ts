import { ECS, Component } from '@curbl/ecs';
import { mat4, quat, vec3 } from 'gl-matrix';

export type TransformComponentConfig = {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number; w: number };
    scale: { x: number; y: number; z: number };
};

@ECS.Component()
export class TransformComponent implements Component {
    private _level: number;
    private _parent: TransformComponent;
    private _children: TransformComponent[];
    private _localMatrix: mat4;
    private _rotation: quat;
    private _translation: vec3;
    private _scale: vec3;
    private _dirty: boolean;

    constructor(
        config: TransformComponentConfig = {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0, w: 1 },
            scale: { x: 1, y: 1, z: 1 },
        }
    ) {
        this.init(config);
    }

    init(
        config: TransformComponentConfig = {
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
        this.apply();
    }

    remove(): void {}

    public addChild(child: TransformComponent): void {
        if (child._parent) {
            child._parent.removeChild(child);
        }
        child._parent = this;
        child._level = this._level + 1;
        this._children.push(child);
    }

    public removeChild(child: TransformComponent): void {
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

    public get globalMatrix(): mat4 {
        if (!this._parent) {
            return this.apply();
        } else {
            //TODO: check if this is right or do we need to calculcate the parent globalMatrix?
            return mat4.multiply(mat4.create(), this._parent.localMatrix, this._localMatrix);
        }
    }

    public get modelMatrix(): mat4 {
        return this.globalMatrix;
    }

    /**
     * Returns the LocalTransformation Matrix
     * @returns {Matrix}
     */
    public get localMatrix(): mat4 {
        return this.apply();
    }

    public set localMatrix(value: mat4) {
        this._localMatrix = value;
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

    get parent(): TransformComponent {
        return this._parent;
    }

    set parent(value: TransformComponent) {
        this._parent = value;
    }

    get children(): TransformComponent[] {
        return this._children;
    }

    set children(value: TransformComponent[]) {
        this._children = value;
    }
}

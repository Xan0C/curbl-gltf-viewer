import {Primitive} from "../mesh";
import {BoundingBox} from "./boundingBox";
import {mat4, vec3} from "gl-matrix";
import {GLWiredCube} from "../../gl/primitives/GLWiredCube";
import {Shader} from "../..";
import {Frustum, FRUSTUM_INTERSECT} from "./frustum";

export class BVHNode {
    public static readonly MAX_VOLUMES_PER_NODE = 4;
    private _primitives: Array<Primitive>;
    private _volume: BoundingBox;
    private _left?: BVHNode;
    private _right?: BVHNode;
    private _debugColor: vec3;

    constructor() {
        this._primitives = [];
        this._debugColor = vec3.fromValues(Math.random(), Math.random(), Math.random());
    }

    frustumTestPrimitives(frustum: Frustum, modelMat: mat4): Array<Primitive> {
        switch(frustum.intersectAABB(this._volume.getAABB(modelMat))) {
            case FRUSTUM_INTERSECT.OUTSIDE:
                return [];
            case FRUSTUM_INTERSECT.INSIDE:
                return this._primitives;
            case FRUSTUM_INTERSECT.INTERSECTING:
                if(this._left && this._right) {
                    return [].concat(
                        this._left.frustumTestPrimitives(frustum, modelMat),
                        this._right.frustumTestPrimitives(frustum, modelMat)
                    );
                } else {
                    return this._primitives;
                }
        }
    }

    debugRender(drawMode: number, cube: GLWiredCube, shader: Shader, modelMatrix: mat4): void {
        const model = mat4.mul(mat4.create(), modelMatrix, this._volume.transform);
        shader.apply(model, this._debugColor);
        cube.draw(drawMode);
        if(this._left) {
            this._left.debugRender(drawMode, cube, shader, modelMatrix);
        }
        if(this._right) {
            this._right.debugRender(drawMode, cube, shader, modelMatrix);
        }
    }

    get volume(): BoundingBox {
        return this._volume;
    }

    set volume(value: BoundingBox) {
        this._volume = value;
    }

    get left(): BVHNode {
        return this._left;
    }

    set left(value: BVHNode) {
        this._left = value;
    }

    get right(): BVHNode {
        return this._right;
    }

    set right(value: BVHNode) {
        this._right = value;
    }

    get primitives(): Array<Primitive> {
        return this._primitives;
    }

    set primitives(value: Array<Primitive>) {
        this._primitives = value;
    }

    static constructTree(primitives: Array<Primitive>, weightLeft?: boolean): BVHNode {
        const root = new BVHNode();
        const aabb = BVHNode.getMaxAABB(primitives);
        root.volume = aabb;
        root.primitives = primitives;

        if(primitives.length < BVHNode.MAX_VOLUMES_PER_NODE) {
            return root;
        }

        const sortDimension = BVHNode.calculateSortingDimension(aabb);
        primitives = primitives.sort((a,b) => a.boundingBox.max[sortDimension] - b.boundingBox.max[sortDimension]);

        const midIndex = weightLeft ? Math.ceil(primitives.length / 2) : Math.floor(primitives.length / 2);
        root.left = BVHNode.constructTree(primitives.slice(0, midIndex), !weightLeft);
        root.right = BVHNode.constructTree(primitives.slice(midIndex, primitives.length), !weightLeft);

        return root;
    }

    private static calculateSortingDimension(box: BoundingBox): number {
        const max = Math.max(...box.max);
        if(max === box.max[0]) {
            return 0;
        } else if(max === box.max[1]) {
            return 1;
        } else {
            return 2;
        }
    }

    private static getMaxAABB(primitives: Array<Primitive>): BoundingBox {
        const box = new BoundingBox(
            vec3.fromValues(Infinity, Infinity, Infinity),
            vec3.fromValues(-Infinity, -Infinity, -Infinity)
        );

        for(let i=0, primitive: Primitive; primitive = primitives[i]; i++) {
            const pBox = primitive.boundingBox;
            box.min[0] = box.min[0] < pBox.min[0] ? box.min[0] : pBox.min[0];
            box.min[1] = box.min[1] < pBox.min[1] ? box.min[1] : pBox.min[1];
            box.min[2] = box.min[2] < pBox.min[2] ? box.min[2] : pBox.min[2];

            box.max[0] = box.max[0] > pBox.max[0] ? box.max[0] : pBox.max[0];
            box.max[1] = box.max[1] > pBox.max[1] ? box.max[1] : pBox.max[1];
            box.max[2] = box.max[2] > pBox.max[2] ? box.max[2] : pBox.max[2];
        }

        return box;
    }
}
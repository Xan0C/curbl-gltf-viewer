import {Matrix, Quaternion, Vector} from "../math";


export type TransformConfig = {
    position:{x:number,y:number,z:number},
    rotation:{x:number,y:number,z:number,w:number},
    scale:{x:number,y:number,z:number}
};

export class Transform {
    private _level:number;
    private _parent:Transform;
    private _children:Transform[];
    private _localMatrix:Matrix;
    private _rotation:Quaternion;
    private _translation:Vector;
    private _scale:Vector;
    private _dirty:boolean;

    constructor(config:TransformConfig={
        position: {x:0,y:0,z:0},
        rotation: {x:0,y:0,z:0,w:1},
        scale: {x:1,y:1,z:1}
    }){
        this.init(config);
    }

    init(config:TransformConfig={
        position: {x:0,y:0,z:0},
        rotation: {x:0,y:0,z:0,w:1},
        scale: {x:1,y:1,z:1}
    }):void{
        //M=T*R*S
        this._localMatrix = new Matrix();
        if(!config){
            config = Object.create(null);
        }
        if(!config.position){
            config.position = {x:0,y:0,z:0}
        }
        if(!config.rotation){
            config.rotation = {x:0,y:0,z:0,w:1};
        }
        if(!config.scale){
            config.scale = {x:1,y:1,z:1};
        }

        this._rotation = new Quaternion(config.rotation.x,config.rotation.y,config.rotation.z,config.rotation.w);
        this._translation = new Vector(config.position.x,config.position.y,config.position.z);
        this._scale = new Vector(config.scale.x,config.scale.y,config.scale.z);
        this._children = [];
        this._level = 0;
        this._dirty = true;
        this.apply();
    }

    public addChild(child:Transform):void {
        if(child._parent) {
            child._parent.removeChild(child);
        }
        child._parent = this;
        child._level = this._level+1;
        this._children.push(child);
    }

    public removeChild(child:Transform):void {
        const index = this._children.indexOf(child);
        if (index > -1) {
            child._level = 0;
            child._parent = undefined;
            this._children.splice(index, 1);
        }
    }

    private apply():Matrix{
        if(this._dirty) {
            Matrix.setScale(this._scale, this._localMatrix);
            //TODO: set rotation by quaternion
            this._localMatrix.translate(this._translation);
            this._dirty = false;
        }
        return this._localMatrix;
    }

    public get globalMatrix():Matrix {
        if(!this._parent){
            return this.apply();
        }else{
            return this._parent.globalMatrix.multiply(this.localMatrix);
        }
    }

    public get modelMatrix():Matrix {
        return this.globalMatrix;
    }

    /**
     * Returns the LocalTransformation Matrix
     * @returns {Matrix}
     */
    public get localMatrix():Matrix {
        return this.apply();
    }

    public set localMatrix(value:Matrix) {
        this._localMatrix = value;
    }

    public get translation():Vector {
        this._dirty = true;
        return this._translation;
    }

    public set translation(value:Vector) {
        this._dirty = true;
        this._translation = value;
    }

    public get rotation():Quaternion {
        this._dirty = true;
        return this._rotation;
    }

    public set rotation(value:Quaternion) {
        this._dirty = true;
        this._rotation = value;
    }

    public get scale():Vector {
        this._dirty = true;
        return this._scale;
    }

    public set scale(value:Vector) {
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
}
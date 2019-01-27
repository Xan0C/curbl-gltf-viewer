/**
 * Created by Soeren on 29.10.2017.
 */
import {Vector} from "./vector";

export class Quaternion {
    private _elements:Float32Array;

    constructor(x:number = 0, y:number = 0, z:number = 0, w:number = 1) {
        this._elements = new Float32Array([x, y, z, w]);
    }

    public get x():number {
        return this._elements[0];
    }

    public set x(x:number) {
        this._elements[0] = x;
    }

    public get y():number {
        return this._elements[1];
    }

    public set y(y:number) {
        this._elements[1] = y;
    }

    public get z():number {
        return this._elements[2];
    }

    public set z(z:number) {
        this._elements[2] = z;
    }

    public get w():number{
        return this._elements[3];
    }

    public set w(w:number){
        this._elements[3] = w;
    }

    public toVec3():Vector{
        let w  = this.w;
        return new Vector(this.x/w,this.y/w,this.z/w);
    }

    public setXYZ(v:Vector):void{
        this.x = v.x/this.w;
        this.y = v.y/this.w;
        this.z = v.z/this.w;
    }

    public set(x:number,y:number,z:number,w:number){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public dot(other:Quaternion):number {
        return (this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w);
    }

    public lengthSquared():number {
        return (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    public length():number {
        return Math.sqrt(this.lengthSquared());
    }

    public normalize():Quaternion {
        let length = this.length();
        this.x = this.x / length;
        this.y = this.y / length;
        this.z = this.z / length;
        this.w = this.w / length;
        return this;
    }

    public mult(f:number):Quaternion {
        return new Quaternion(this.x * f, this.y * f, this.z * f, this.w * f);
    }

    public div(f:number):Quaternion {
        return this.mult(1 / f);
    }

    public add(other:Quaternion):Quaternion {
        return new Quaternion(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    }

    public substract(other:Quaternion):Quaternion {
        return new Quaternion(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    }

    public get elements():Float32Array {
        return this._elements;
    }

    public set elements(value:Float32Array) {
        this._elements = value;
    }

    public toString():string {
        return "{Quaternion: [X: " + this.x + " Y: " + this.y + " Z: " + this.z + " W: " + this.w + " ]}";
    }
}
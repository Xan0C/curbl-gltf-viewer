import {EmitSignal} from "../../events/EmitSignal";
import * as EventEmitter from "eventemitter3";

export enum CACHE_EVENTS {
    ADDED = "ADDED",
    REMOVED = "REMOVED"
}

export interface  IBaseCache<T> {
    onAdded:EmitSignal;
    onRemoved:EmitSignal;
    add(key:string,data:T):void;
    addMultiple(elements:Array<T>, mapFunc:(e:T)=>{key:string,data:T});
    remove(key:string):void;
    get(key:string):T;
    getAll():{[x:string]:T};
}

export class BaseCache<T> implements IBaseCache<T> {

    protected cache:{[x:string]:T};
    protected emitter:EventEmitter;
    private _onAdded:EmitSignal<(key:string,data:T)=>void>;
    private _onRemoved:EmitSignal<(key:string,data:T)=>void>;

    constructor(){
        this.cache = {};
        this.emitter = new EventEmitter();
        this._onAdded = new EmitSignal(this.emitter,CACHE_EVENTS.ADDED);
        this._onRemoved = new EmitSignal(this.emitter,CACHE_EVENTS.REMOVED);
    }

    get onAdded(): EmitSignal<(key:string,data: T) => void> {
        return this._onAdded;
    }

    get onRemoved(): EmitSignal<(key:string,data: T) => void> {
        return this._onRemoved;
    }

    public add(key:string,data:T):void{
        this.cache[key] = data;
        this._onAdded.emit(key,data);
    }

    public addMultiple(elements:Array<T>,mapFunc: (e: T) => { key: string; data: T }) {
        for(let i=0, element:T; element = elements[i]; i++) {
            const value = mapFunc(element);
            this.add(value.key, value.data);
        }
    }

    public remove(key:string):void {
        const data = this.cache[key];
        delete this.cache[key];
        this._onRemoved.emit(key,data);
    }

    public get(key:string):T{
        return this.cache[key];
    }

    public getAll():{[x:string]:T}{
        return this.cache;
    }

}
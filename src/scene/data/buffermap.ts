import {BufferView} from "./bufferView";

/*
 * Stores corresponding Bufferviews
 */
export class Buffermap {
    private _views:Array<BufferView>;

    constructor(){
        this._views = [];
    }

    public get views():Array<BufferView> {
        return this._views;
    }

    public set views(value:Array<BufferView>) {
        this._views = value;
    }
}
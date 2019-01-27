import {GLBuffer} from "../../gl";
import {BufferView} from "./bufferView";

/**
 * Stores the GLBuffers and corresponding Bufferviews for one model
 */
export class Modelbuffer {
    private _data:Array<ArrayBufferView|ArrayBuffer>;
    private _buffers:Array<GLBuffer>;
    private _views:Array<BufferView>;

    constructor(){
        this._data = [];
        this._buffers = [];
        this._views = [];
    }

    public get data():Array<ArrayBufferView | ArrayBuffer> {
        return this._data;
    }

    public set data(value:Array<ArrayBufferView | ArrayBuffer>) {
        this._data = value;
    }

    public get buffers():Array<GLBuffer> {
        return this._buffers;
    }

    public set buffers(value:Array<GLBuffer>) {
        this._buffers = value;
    }

    public get views():Array<BufferView> {
        return this._views;
    }

    public set views(value:Array<BufferView>) {
        this._views = value;
    }
}
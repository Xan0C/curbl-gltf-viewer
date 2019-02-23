import {GLBuffer} from "../../gl";
import {BufferView} from "./bufferView";

/**
 * Stores the GLBuffers and corresponding Bufferviews for one scene
 */
export class Buffermap {
    private _buffers:Array<GLBuffer>;
    private _views:Array<BufferView>;

    constructor(){
        this._buffers = [];
        this._views = [];
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
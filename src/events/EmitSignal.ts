import * as EventEmitter from 'eventemitter3';

/**
 * EmitSignal wrapper for a single event of an EventEmitter
 */
export class EmitSignal<EventFunction extends EventEmitter.ListenerFn = (...args: Array<any>) => void> {
    private _type: string | symbol;
    private _emitter: EventEmitter;

    constructor(emitter: EventEmitter, type: string | symbol) {
        this._type = type;
        this._emitter = emitter;
    }

    emit(...args: any[]): boolean {
        return this._emitter.emit(this._type, ...args);
    }

    /**
     * function alias for emit
     * @param args
     */
    dispatch(...args: any[]): boolean {
        return this.emit(...args);
    }

    on(fn: EventFunction, context?: any): this {
        this._emitter.on(this._type, fn, context);
        return this;
    }

    /**
     * alias for on
     * @param fn - EventFunction
     * @param context - context to call the function with
     */
    add(fn: EventFunction, context?: any): this {
        return this.on(fn, context);
    }

    once(fn: EventFunction, context?: any): this {
        this._emitter.once(this._type, fn, context);
        return this;
    }

    /**
     * alias for once
     * @param fn
     * @param context
     */
    addOnce(fn: EventFunction, context?: any): this {
        return this.once(fn, context);
    }

    removeAllListeners(): this {
        this._emitter.removeAllListeners(this._type);
        return this;
    }

    removeListener(fn?: EventFunction, context?: any, once?: boolean): this {
        this._emitter.removeListener(this._type, fn, context, once);
        return this;
    }

    get type(): string | symbol {
        return this._type;
    }

    get emitter(): EventEmitter {
        return this._emitter;
    }
}

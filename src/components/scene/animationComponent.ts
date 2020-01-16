import {ECS, Component} from "@curbl/ecs";
import {SceneComponentConfig} from "./sceneComponent";

@ECS.Component()
export class AnimationComponent implements Component {

    private _key:string;

    private _startTime:number;
    private _pauseStart: number;
    private _pauseEnd:number;
    private _running:boolean;
    private _paused:boolean;
    private _loop:boolean;
    private _autoStart:boolean;

    constructor(config:{key:string}){
        this.init(config);
    }

    init(config:SceneComponentConfig){
        this._key = config.key;
        this._running = false;
        this._paused = false;
        this._startTime = 0;
        this._pauseStart = 0;
        this._pauseEnd = 0;
        this._autoStart = true;
        this._loop = true;
    }

    remove():void {
    }

    start() {
        this._running = true;
        this._startTime = performance.now();
    }

    stop() {
        this._running = false;
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
    }

    get running(): boolean {
        return this._running;
    }

    get paused(): boolean {
        return this._paused;
    }

    set paused(value: boolean) {
        if(this._paused === value){
            return;
        }
        if(value === true) {
            this._pauseStart = performance.now();
        }else{
            this._pauseEnd = performance.now();
        }
        this._paused = value;
    }

    get pauseStart(): number {
        return this._pauseStart;
    }

    get pauseEnd(): number {
        return this._pauseEnd;
    }

    get startTime(): number {
        return this._startTime;
    }

    get loop(): boolean {
        return this._loop;
    }

    set loop(value: boolean) {
        this._loop = value;
    }

    get autoStart(): boolean {
        return this._autoStart;
    }

    set autoStart(value: boolean) {
        this._autoStart = value;
    }
}
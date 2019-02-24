import {AnimationSampler} from "./animationSampler";
import {AnimationChannel} from "./animationChannel";
import {SceneNode} from "../sceneNode";
import {quat, vec3} from "gl-matrix";

export class Animation {
    name: string;
    private samplers: Array<AnimationSampler>;
    private channels: Array<AnimationChannel>;
    private _duration: number;

    constructor() {
        this.samplers = [];
        this.channels = [];
        this._duration = 0;
    }

    init() {
        for(let i=0, sampler:AnimationSampler; sampler = this.samplers[i]; i++) {
            sampler.init();
            if(sampler.duration > this._duration) {
                this._duration = sampler.duration;
            }
        }
    }

    addSampler(sampler: AnimationSampler) {
        this.samplers.push(sampler);
    }

    addChannel(channel: AnimationChannel) {
        this.channels.push(channel);
    }

    /*
     * apply the animation
     * delta time in microseconds
     */
    animate(t:number) {
        const time = t * 0.001;

        for(let i=0, sampler:AnimationSampler; sampler = this.samplers[i]; i++) {
            sampler.update(time);
        }
        for(let i=0, channel: AnimationChannel; channel = this.channels[i]; i++) {
            const sampler = this.samplers[channel.sampler];
            const node:SceneNode = channel.node;

            switch(channel.path) {
                case "rotation":
                    quat.copy(node.transform.rotation, sampler.value as any);
                    break;
                case "translation":
                    vec3.copy(node.transform.translation, sampler.value);
                    break;
                case "scale":
                    vec3.copy(node.transform.scale, sampler.value);
                    break;
            }
        }
    }

    get duration(): number {
        return this._duration;
    }

    get durationMS(): number {
        return this._duration * 1000;
    }
}
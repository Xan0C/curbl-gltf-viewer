import { AnimationSampler } from './animationSampler';
import { AnimationChannel } from './animationChannel';
import { SceneNode } from '../sceneNode';
import { quat, vec3 } from 'gl-matrix';

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

    addSampler(sampler: AnimationSampler) {
        this.samplers.push(sampler);
    }

    addChannel(channel: AnimationChannel) {
        this.channels.push(channel);
    }

    animate(t: number) {
        const time = t * 0.001;

        for (let i = 0, sampler: AnimationSampler; (sampler = this.samplers[i]); i++) {
            sampler.update(time);
        }
        for (let i = 0, channel: AnimationChannel; (channel = this.channels[i]); i++) {
            const sampler = this.samplers[channel.sampler];
            const node: SceneNode = channel.node;

            switch (channel.path) {
                case 'rotation':
                    quat.copy(node.transform.rotation, sampler.value as any);
                    break;
                case 'translation':
                    vec3.copy(node.transform.translation, sampler.value);
                    break;
                case 'scale':
                    vec3.copy(node.transform.scale, sampler.value);
                    break;
            }
        }
    }

    get duration(): number {
        return this._duration;
    }

    set duration(duration: number) {
        this._duration = duration;
    }

    get durationMS(): number {
        return this._duration * 1000;
    }

    set durationMS(durationMS: number) {
        this._duration = durationMS * 0.001;
    }
}

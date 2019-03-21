import {IGLTF_AnimationSampler, IGLTF_Channel} from "./model/GLTF_Animation";
import {AnimationSampler, Interpolation} from "../model/animation/animationSampler";
import {AnimationChannel} from "../model/animation/animationChannel";
import {Animation} from "../model/animation";
import {GLTFModel} from "./GLTFModel";
import {IBaseCache} from "../cache/caches";
import {CACHE_TYPE} from "../cache";

export class GLTFAnimationProcessor {

    private model:GLTFModel;
    private cache:IBaseCache<Animation>;
    private _animations:Array<Animation>;

    constructor(model:GLTFModel) {
        this.model = model;
        this.cache = this.model.cache.getCache(CACHE_TYPE.ANIMATION);
    }

    processAnimations():Array<Animation> {
        this._animations = [];
        const gltf = this.model.gltf;

        gltf.animations = gltf.animations||[];
        for(let i=0; i < gltf.animations.length; i++) {
            this._animations.push(this.processAnimation(i));
        }

        return this._animations;
    }

    private processAnimation(idx:number): Animation {
        const animation = new Animation();
        const gltfAnimation = this.model.gltf.animations[idx];
        animation.name = gltfAnimation.name||"animation"+idx;

        for(let i=0, sampler:IGLTF_AnimationSampler; sampler = gltfAnimation.samplers[i]; i++) {
            const animationSampler = this.processSampler(sampler);
            animation.addSampler(animationSampler);
            animation.duration = animation.duration < animationSampler.duration ? animationSampler.duration : animation.duration;
        }

        for(let i=0, channel:IGLTF_Channel; channel = gltfAnimation.channels[i]; i++) {
            animation.addChannel(this.processChannel(channel));
        }

        this.cache.add(animation.name, animation);
        return animation;
    }

    private processSampler(sampler: IGLTF_AnimationSampler): AnimationSampler {
        const animationSampler = new AnimationSampler();
        animationSampler.interpolation = sampler.interpolation||Interpolation.LINEAR;

        const inputAccessor = this.model.getAccessor(sampler.input);
        const outputAccessor = this.model.getAccessor(sampler.output);

        animationSampler.inputData = inputAccessor.getData();
        animationSampler.outputData = outputAccessor.getData();

        animationSampler.componentTypeCount = outputAccessor.componentTypeSize;
        animationSampler.duration = animationSampler.inputData[animationSampler.inputData.length-1];

        return animationSampler;
    }

    private processChannel(channel: IGLTF_Channel): AnimationChannel {
        const animationChannel = new AnimationChannel();

        animationChannel.sampler = channel.sampler;
        animationChannel.transform = this.model.getNode(channel.target.node).transform;
        animationChannel.path = channel.target.path;

        return animationChannel;
    }

    get animations(): Array<Animation> {
        return this._animations;
    }

    set animations(value: Array<Animation>) {
        this._animations = value;
    }
}
import {IGLTF_AnimationSampler, IGLTF_Channel} from "./model/GLTF_Animation";
import {IGLTF_Accessor} from "./model";
import {AnimationSampler, Interpolation} from "../scene/animation/animationSampler";
import {Accessor} from "../scene/data/accessor";
import {AnimationChannel} from "../scene/animation/animationChannel";
import {Animation} from "../scene/animation";
import {GLTFModel} from "./GLTFModel";
import {IBaseCache} from "../cache/caches";
import {CACHE_TYPE} from "../cache";

export class GLTFAnimationProcessor {

    private model:GLTFModel;
    private cache:IBaseCache<Animation>;

    constructor(model:GLTFModel) {
        this.model = model;
        this.cache = this.model.cache.getCache(CACHE_TYPE.ANIMATION);
    }

    processAnimations():Array<Animation> {
        const animations = [];
        const gltf = this.model.gltf;

        gltf.animations = gltf.animations||[];
        for(let i=0; i < gltf.animations.length; i++) {
            animations.push(this.processAnimation(i));
        }

        return animations;
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
        const gltf = this.model.gltf;

        const animationSampler = new AnimationSampler();
        animationSampler.interpolation = sampler.interpolation||Interpolation.LINEAR;

        const inputAccessor = this.createAccessor(gltf.accessors[sampler.input]);
        const outputAccessor = this.createAccessor(gltf.accessors[sampler.output]);

        animationSampler.inputData = this.model.getAccessorData(inputAccessor);
        animationSampler.outputData = this.model.getAccessorData(outputAccessor);

        animationSampler.componentTypeCount = outputAccessor.componentTypeCount;
        animationSampler.duration = animationSampler.inputData[animationSampler.inputData.length-1];

        return animationSampler;
    }

    private processChannel(channel: IGLTF_Channel): AnimationChannel {
        const animationChannel = new AnimationChannel();

        animationChannel.sampler = channel.sampler;
        animationChannel.node = this.model.getNode(channel.target.node);
        animationChannel.path = channel.target.path;

        return animationChannel;
    }

    private createAccessor(gltfAccessor: IGLTF_Accessor): Accessor {
        const gltf = this.model.gltf;

        const accessor = new Accessor();
        accessor.bufferView = gltfAccessor.bufferView;
        accessor.byteOffset = gltfAccessor.byteOffset||0;
        accessor.normalized = gltfAccessor.normalized;
        accessor.type = gltfAccessor.type;
        accessor.componentType = gltfAccessor.componentType;
        accessor.count = gltfAccessor.count;
        accessor.min = gltfAccessor.min||[];
        accessor.max = gltfAccessor.max||[];
        accessor.stride = gltf.bufferViews[gltfAccessor.bufferView].byteStride||0;

        return accessor;
    }
}
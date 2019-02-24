import {IGLTF_Animation, IGLTF_AnimationSampler, IGLTF_Channel} from "./model/GLTF_Animation";
import {Animation} from "../scene/animation/animation";
import {IGLTF_Accessor, IGLTF_Model} from "./model";
import {GLTFBuffer} from "./GLTFBuffer";
import {AnimationSampler, Interpolation} from "../scene/animation/animationSampler";
import {Accessor} from "../scene/data/accessor";
import {GLTF_ACCESORTYPE_SIZE} from "./GLTFParser";
import {AnimationChannel} from "../scene/animation/animationChannel";
import {SceneNode} from "../scene";

export class GLTFAnimationProcessor {

    private gltfModel: IGLTF_Model;
    private buffer: GLTFBuffer;
    private nodes:Array<SceneNode>;

    constructor(model:IGLTF_Model, buffer: GLTFBuffer, nodes: Array<SceneNode>) {
        this.gltfModel = model;
        this.buffer = buffer;
        this.nodes = nodes;
    }

    processAnimations(): Array<Animation> {
        const animations:Array<Animation> = [];
        this.gltfModel.animations = this.gltfModel.animations||[];

        for(let i=0, animation:IGLTF_Animation; animation = this.gltfModel.animations[i]; i++) {
            const anim = this.createAnimation(animation);
            anim.name = anim.name||"Animation"+i; //TODO create proper names
            animations.push(anim);
        }

        return animations;
    }

    private createAnimation(anim:IGLTF_Animation): Animation {
        const animation = new Animation();
        animation.name = anim.name;

        for(let i=0, sampler:IGLTF_AnimationSampler; sampler = anim.samplers[i]; i++) {
            animation.addSampler(this.processSampler(sampler));
        }

        for(let i=0, channel:IGLTF_Channel; channel = anim.channels[i]; i++) {
            animation.addChannel(this.processChannel(channel));
        }

        return animation;
    }

    private processSampler(sampler: IGLTF_AnimationSampler): AnimationSampler {
        const animationSampler = new AnimationSampler();
        animationSampler.interpolation = sampler.interpolation||Interpolation.LINEAR;
        this.buffer.mapBufferViewToMap(
            animationSampler.buffer,
            this.gltfModel.accessors[sampler.input]
        );
        this.buffer.mapBufferViewToMap(
            animationSampler.buffer,
            this.gltfModel.accessors[sampler.output]
        );
        animationSampler.input = this.createAccessor(this.gltfModel.accessors[sampler.input]);
        animationSampler.output = this.createAccessor(this.gltfModel.accessors[sampler.output]);
        return animationSampler;
    }

    private processChannel(channel: IGLTF_Channel): AnimationChannel {
        const animationChannel = new AnimationChannel();

        animationChannel.sampler = channel.sampler;
        animationChannel.node = this.nodes[channel.target.node];
        animationChannel.path = channel.target.path;

        return animationChannel;
    }

    private createAccessor(gltfAccessor: IGLTF_Accessor): Accessor {
        const accessor = new Accessor();
        accessor.bufferView = gltfAccessor.bufferView;
        accessor.byteOffset = gltfAccessor.byteOffset||0;
        accessor.normalized = gltfAccessor.normalized;
        accessor.componentTypeCount = GLTF_ACCESORTYPE_SIZE[gltfAccessor.type];
        accessor.type = gltfAccessor.componentType;
        accessor.count = gltfAccessor.count;

        const view = this.gltfModel.bufferViews[accessor.bufferView];
        accessor.stride = view.byteStride||0;

        return accessor;
    }
}
import {LOAD_TYPE, Middleware, Resource} from "curbl-loader";
import {GLTexture, MAG_FILTER, MIN_FILTER, TEXTURE_WRAP} from "curbl-gl-util";
import {CACHE_TYPE} from "../cache";

export type TextureLoaderConfig = {
    id?:number;
    premultiplyAlpha?:boolean;
    internalFormat?:number;
    format?:number;
    type?:number;
    width?:number;
    height?:number;
    sampler?:{
        magFilter?:number;
        minFilter?:number;
        wrapS?:number;
        wrapT?:number;
    },
    flipY?:boolean;
}

export class TextureLoader extends Middleware<GLTexture> {

    private readonly gl: WebGL2RenderingContext;

    constructor(gl: WebGL2RenderingContext) {
        super(CACHE_TYPE.TEXTURE);
        this.gl = gl;
    }

    add(key:string, url:string, config:TextureLoaderConfig = {
        id:0,
        sampler: {
            wrapS: TEXTURE_WRAP.REPEAT,
            wrapT: TEXTURE_WRAP.REPEAT
        }
    }): Middleware<GLTexture> {
        return this.addResourceToQueue({
            key: key,
            resources: [{
                resource: new Resource<HTMLImageElement>({
                    url: url,
                    loadType: LOAD_TYPE.IMAGE
                },config)
            }]
        });
    }

    transform(resource: Resource<HTMLImageElement>): GLTexture {
        const textureConfig = resource.config;
        const image = resource.request;

        const data = GLTexture.fromSource(
            this.gl,
            image,
            textureConfig.premultiplyAlpha,
            textureConfig.id,
            textureConfig.internalFormat,
            textureConfig.format,
            textureConfig.type
        );

        if(textureConfig.flipY) {
            data.flipY(1);
        }
        if(textureConfig.sampler){
            if(textureConfig.sampler.minFilter === MIN_FILTER.LINEAR
                || textureConfig.sampler.minFilter === MIN_FILTER.NEAREST
                || textureConfig.sampler.minFilter === MIN_FILTER.LINEAR_MIPMAP_LINEAR
                || textureConfig.sampler.minFilter === MIN_FILTER.LINEAR_MIPMAP_NEAREST
                || textureConfig.sampler.minFilter === MIN_FILTER.NEAREST_MIPMAP_LINEAR
                || textureConfig.sampler.minFilter === MIN_FILTER.NEAREST_MIPMAP_NEAREST
            ){
                data.setMinFilter(textureConfig.sampler.minFilter);
            }else if(GLTexture.isPowerOf2(data.width) && GLTexture.isPowerOf2(data.height)){
                data.setMinFilter(MIN_FILTER.LINEAR_MIPMAP_LINEAR);
            }else{
                data.setMinFilter(MIN_FILTER.LINEAR);
            }
            if(textureConfig.sampler.magFilter === MAG_FILTER.LINEAR || textureConfig.sampler.magFilter === MAG_FILTER.NEAREST) {
                data.setMagFilter(textureConfig.sampler.magFilter);
            }else{
                data.setMagFilter(MAG_FILTER.LINEAR);
            }
            if(textureConfig.sampler.wrapS === TEXTURE_WRAP.CLAMP_TO_EDGE
                || textureConfig.sampler.wrapS === TEXTURE_WRAP.MIRRORED_REPEAT
                || textureConfig.sampler.wrapS === TEXTURE_WRAP.REPEAT
            ){
                data.setWrapS(textureConfig.sampler.wrapS);
            }else{
                data.setWrapS(TEXTURE_WRAP.REPEAT);
            }
            if(textureConfig.sampler.wrapT === TEXTURE_WRAP.CLAMP_TO_EDGE
                || textureConfig.sampler.wrapT === TEXTURE_WRAP.MIRRORED_REPEAT
                || textureConfig.sampler.wrapT === TEXTURE_WRAP.REPEAT
            ){
                data.setWrapT(textureConfig.sampler.wrapT);
            }else{
                data.setWrapT(TEXTURE_WRAP.REPEAT);
            }
        }
        return data;
    }
}
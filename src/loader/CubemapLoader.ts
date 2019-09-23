import {LOAD_TYPE, Middleware, Resource} from "curbl-loader";
import {GLCubemap} from "curbl-gl-util";
import {MAG_FILTER, MIN_FILTER, TEXTURE_WRAP} from "curbl-gl-util";
import {GLTexture} from "curbl-gl-util";
import {TextureLoaderConfig} from "./TextureLoader";
import {CACHE_TYPE} from "../cache";

export class CubemapLoader extends Middleware<GLCubemap> {

    private readonly gl: WebGL2RenderingContext;

    constructor(gl: WebGL2RenderingContext) {
        super(CACHE_TYPE.TEXTURE);
        this.gl = gl;
    }

    add(key:string,levels:Array<{right:string,left:string,top:string,bottom:string,back:string,front:string}>,config:TextureLoaderConfig={id:0}): Middleware<GLCubemap> {
        const resources = [];
        for(let i=0, faces; faces = levels[i]; i++) {
            const keys = Object.keys(faces);
            for(let k=0, face; face = faces[keys[k]]; k++) {
                resources.push({
                    resource: new Resource<HTMLImageElement>({
                            url: face,
                            loadType: LOAD_TYPE.IMAGE
                        },
                        {
                            ...config,
                            face: k,
                            level: i
                        }),
                });
            }
        }
        return this.addResourceToQueue({
            key: key,
            resources: resources
        });
    }

    transform(...resources: Resource<HTMLImageElement>[]): GLCubemap {
        const images = resources.sort((a,b) => a.config.face - b.config.face + (a.config.level - b.config.level)*6).map((resource) => resource.request);

        const textureConfig = resources[0].config;

        const data = GLCubemap.cubemapFromSource(
            this.gl,
            images,
            textureConfig.flipY,
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
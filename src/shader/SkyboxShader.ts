import {Shader} from "../model/shader";
import {GLTexture} from "../gl";
import {Cache, CACHE_TYPE} from "../cache";
import {CACHED_TEXTURES, UBO_BINDINGS} from "../viewer/constants";

export class SkyboxShader extends Shader {

    private cache: Cache;

    constructor(gl:WebGL2RenderingContext, cache: Cache){
        super(gl);
        this.cache = cache;
    }

    apply():void {
        this.applyCamera();
        const texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.SKYBOX);
        texture.bind(0);
        this.uniforms.u_Skybox = 0;
    }

    applyCamera():void{
        this.uniforms.Matrices = UBO_BINDINGS.CAMERA;
    }
}
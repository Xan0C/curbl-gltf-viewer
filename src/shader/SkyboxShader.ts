import { Shader } from '../scene/shader';
import { GLTexture } from '@curbl/gl-util';
import { Cache, CACHE_TYPE } from '../cache';
import { GLOBAL_TEXTURES, UBO_BINDINGS } from '../viewer/constants';

export class SkyboxShader extends Shader {
    private cache: Cache;

    constructor(gl: WebGL2RenderingContext, cache: Cache) {
        super(gl);
        this.cache = cache;
    }

    apply(): void {
        this.applyCamera();
        const texture = this.cache.get<GLTexture>(CACHE_TYPE.TEXTURE, GLOBAL_TEXTURES.SKYBOX);
        texture.bind(0);
        this.uniforms.u_Skybox = 0;
    }

    applyCamera(): void {
        this.uniforms.Matrices = UBO_BINDINGS.CAMERA;
    }
}

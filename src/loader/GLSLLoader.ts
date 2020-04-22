import { LOAD_TYPE, Middleware, Resource } from '@curbl/loader';
import { CACHE_TYPE } from '../cache';
import { Shader } from '../scene/shader';
import { GLShader } from '@curbl/gl-util';

export class GLSLLoader extends Middleware<GLShader> {
    private readonly gl: WebGL2RenderingContext;

    constructor(gl: WebGL2RenderingContext) {
        super(CACHE_TYPE.SHADER);
        this.gl = gl;
    }

    add<T extends Shader>(key: string, vertexSrc: string, fragSrc: string, shader?: GLShader): Middleware<GLShader> {
        return this.addResourceToQueue({
            key: key,
            resources: [
                {
                    resource: new Resource<XMLHttpRequest>(
                        {
                            url: vertexSrc,
                            loadType: LOAD_TYPE.XHR,
                            responseType: 'text',
                        },
                        { type: 'vertex', shader: shader }
                    ),
                },
                {
                    resource: new Resource<XMLHttpRequest>(
                        {
                            url: fragSrc,
                            loadType: LOAD_TYPE.XHR,
                            responseType: 'text',
                        },
                        { type: 'fragment', shader: shader }
                    ),
                },
            ],
        });
    }

    transform(...resources: Resource<XMLHttpRequest>[]): Shader {
        const vertex = resources.find((r) => r.config.type === 'vertex');
        const fragment = resources.find((r) => r.config.type === 'fragment');

        if (vertex.config.shader) {
            const shader: Shader = vertex.config.shader;
            shader.vertexSrc = vertex.request.response;
            shader.fragmentSrc = fragment.request.response;
            return shader;
        }

        return new Shader(this.gl, vertex.request.response, fragment.request.response);
    }
}

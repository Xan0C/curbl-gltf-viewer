import {LOAD_TYPE, Middleware, Resource} from "curbl-loader";
import {GLTF_Parser} from "../gltf/GLTFParser";
import {Cache, CACHE_TYPE} from "../cache";
import {Scene} from "../scene/scene";

export class GLTFLoader extends Middleware<Scene> {
    private readonly gl: WebGL2RenderingContext;
    private readonly cache: Cache;

    constructor(gl: WebGL2RenderingContext, cache: Cache) {
        super(CACHE_TYPE.SCENE);
        this.gl = gl;
        this.cache = cache;
    }

    add(key:string, gltfJson:string, gltfBin:string): Middleware<Scene> {
        return this.addResourceToQueue({
            key: key,
            resources: [
                {
                    resource: new Resource<XMLHttpRequest>({
                        url: gltfJson,
                        loadType: LOAD_TYPE.XHR,
                        responseType: 'json'
                    },{
                        type:'json'
                    })
                },
                {
                    resource: new Resource<XMLHttpRequest>({
                        url: gltfBin,
                        loadType: LOAD_TYPE.XHR,
                        responseType: 'arraybuffer'
                    },{
                        type:'buffer'
                    })
                }
            ]
        });
    }

    transform(...resources: Resource<XMLHttpRequest>[]): Scene {
        const jsonResource = resources.find((resource)=>resource.config.type === 'json');
        const bufferResource = resources.find((resource)=>resource.config.type === 'buffer');

        const url = jsonResource.options.url;
        const match = url.match(/[\w\.]+/g);

        const parser = new GLTF_Parser(this._loader,this.gl,this.cache);
        parser.path = url.replace(match[match.length-1],'');

        return parser.parse(bufferResource.request.response, jsonResource.request.response);
    }
}
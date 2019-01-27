import {ECS, IEntity, System} from "curbl-ecs";
import {IBLComponent} from "../components/renderer/IBLComponent";
import {SYSTEM_EVENTS} from "curbl-ecs/lib/Events";
import {Cache, CACHE_TYPE} from "../cache";
import {CACHED_TEXTURES} from "../viewer/constants";


@ECS.System(IBLComponent)
export class IBLSystem extends System {

    private cache: Cache;
    private _diffuse:string;
    private _specular:string;
    private _brdfLut:string;

    constructor(config:{cache: Cache}){
        super();
        this.cache = config.cache;
    }

    private onEntityAdded(entity:IEntity):void {
        const ibl = entity.get(IBLComponent);
        this.diffuseEnvironment = ibl.diffuseEnvironment || this._diffuse;
        this.specularEnvironment = ibl.specularEnvironment || this._specular;
        this.brdfLUT = ibl.brdfLUT || this._brdfLut;
    }

    setUp(): void {
        this.events.on(SYSTEM_EVENTS.ENTITY_ADDED,this.onEntityAdded,this);
    }

    tearDown(): void {
        this.events.removeListener(SYSTEM_EVENTS.ENTITY_ADDED,this.onEntityAdded,this);
    }

    set diffuseEnvironment(key:string){
        this._diffuse = key;
        if(this.cache.has(CACHE_TYPE.TEXTURE, key)) {
            this.cache.add(
                CACHE_TYPE.TEXTURE, CACHED_TEXTURES.DIFFUSE_ENVIRONMENT,
                this.cache.get(CACHE_TYPE.TEXTURE, key)
            );
        }
    }

    set specularEnvironment(key:string){
        this._specular = key;
        if(this.cache.has(CACHE_TYPE.TEXTURE, key)) {
            this.cache.add(
                CACHE_TYPE.TEXTURE, CACHED_TEXTURES.SPECULAR_ENVIRONMENT,
                this.cache.get(CACHE_TYPE.TEXTURE, key)
            );
        }
    }

    set brdfLUT(key:string){
        this._brdfLut = key;
        if(this.cache.has(CACHE_TYPE.TEXTURE, key)) {
            this.cache.add(
                CACHE_TYPE.TEXTURE, CACHED_TEXTURES.BRDF_LUT,
                this.cache.get(CACHE_TYPE.TEXTURE, key)
            );
        }
    }
}
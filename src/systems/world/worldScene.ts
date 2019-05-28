import {ECS, IEntity} from "curbl-ecs";
import {ResourceLoader} from "curbl-loader";
import {Cache} from "../../cache";

export interface SceneConfig {
    name: string;
    destroyOnTearDown?: boolean;
}

export abstract class WorldScene {
    /**
     * Each Scene needs a unique name
     */
    private readonly _name:string;

    /**
     * if systems is active and should be updated
     */
    private _active:boolean;

    private _loader:ResourceLoader;
    private _cache:Cache;

    private entities:{[id:string]:IEntity};

    constructor(config:SceneConfig){
        this.entities = {};
        this._name = config.name;
    }

    /**
     * setUp the scene loading necessary elements
     * calls preload and triggers the loader
     * once the loader finished loading the create method is called
     */
    setUp(loader:ResourceLoader, cache: Cache):void {
        this._loader = loader;
        this._cache = cache;
        this._active = true;

        this.preload();
        this._loader.onComplete.once(this.create,this);
        this._loader.load();
    }

    /**
     * tearDown the scene removing all Entities from the scene
     * it will destroy all entities if destroyOnTearDown is true{default: false}
     */
    tearDown():void {
        this.shutdown();
        this._active = false;
        const keys = Object.keys(this.entities);
        for(let i=0, entity:IEntity; entity = this.entities[keys[i]]; i++){
            ECS.removeEntity(entity);
        }
    }

    /**
     * Restore the Scene, adding all Entities previously removed, with their latest values
     */
    restore():void{
        for(let i=0, entity:IEntity; entity = this.entities[i]; i++){
            ECS.addEntity(entity);
        }
    }

    /**
     * add Entity to the Scene
     * @param entity
     */
    add<T extends IEntity = IEntity>(entity:T):T {
        this.entities[entity.id] = ECS.addEntity(entity);
        return entity;
    }

    /**
     * Remove entity from the scene and ecs
     * @param entity
     */
    remove<T extends IEntity = IEntity>(entity:T):T {
        delete this.entities[entity.id];
        return ECS.removeEntity(entity) as T;
    }

    /**
     * called once the scene starts
     */
    abstract preload():void;

    /**
     * called once the scene finished loading
     * use this.add to add Entities to the Scene otherwise it will be globally added to the ECS
     * and not removed on scene shutdown
     */
    abstract create():void;

    /**
     * called before the scene gets removed
     */
    abstract shutdown():void;

    /**
     * called by the worldSystem for each ECS update tick
     * usually its not needed since we just use systems and entities for the game logic
     */
    abstract update():void;

    get name(): string {
        return this._name;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    get loader(): ResourceLoader {
        return this._loader;
    }

    set loader(value: ResourceLoader) {
        this._loader = value;
    }

    get cache(): Cache {
        return this._cache;
    }

    set cache(value: Cache) {
        this._cache = value;
    }
}
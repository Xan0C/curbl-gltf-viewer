import { IBaseCache } from './caches';

/**
 * With Scene, Node and Mesh cache we can access the Model in different stages
 * e.g. Mesh has no animation or Transform,
 * e.g. Node has Animation, Transform etc. for one Mesh
 * e.g. Scene has all Nodes with all Animations and Transforms
 */
export enum CACHE_TYPE {
    TEXTURE,
    MESH,
    SCENE,
    ANIMATION,
    MATERIAL,
    SHADER,
    NOOP,
}

/**
 * Global Cache
 */
export class Cache {
    private caches: Array<IBaseCache<any>>;

    constructor() {
        this.caches = [];
    }

    /**
     * Add a new sub cache
     * @param {CACHE_TYPE} type
     * @param {IBaseCache<T>} cache
     */
    addCache<T>(type: number, cache: IBaseCache<T>): void {
        this.caches[type] = cache;
    }

    /**
     * Remove a sub cache
     * @param {string|number} type
     */
    removeCache(type: number): void {
        this.caches.splice(type, 1);
    }

    /**
     * get sub cache
     * @param {string|number} type
     * @returns {IBaseCache<T>}
     */
    getCache<T>(type: number): IBaseCache<T> {
        return this.caches[type] as IBaseCache<T>;
    }

    /**
     * add a value to a cache
     * @param {string|number} type
     * @param {string} key
     * @param data
     */
    public add(type: number, key: string, data: any) {
        if (this.caches[type]) {
            this.caches[type].add(key, data);
        }
    }

    /**
     * get value from cache
     * @param {string|number} type
     * @param {string} key
     * @returns {T}
     */
    public get<T>(type: number, key: string): T {
        if (this.caches[type]) {
            return this.caches[type].get(key);
        }
    }

    public has(type: number, key: string): boolean {
        if (this.caches[type]) {
            return !!this.caches[type].get(key);
        }
        return false;
    }
}

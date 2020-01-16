import { ECS, System } from '@curbl/ecs';
import { WorldScene } from './worldScene';
import { Cache } from '../../cache';
import { ResourceLoader } from '@curbl/loader';

@ECS.System()
export class WorldSystem extends System {
    /**
     * The World consists of scenes
     */
    private _scenes: { [key: string]: WorldScene };
    private _loader: ResourceLoader;
    private _cache: Cache;

    constructor(config: { loader: ResourceLoader; cache: Cache }) {
        super();
        this._loader = config.loader;
        this._cache = config.cache;
    }

    setUp(): void {
        this._scenes = Object.create(null);
    }

    tearDown(): void {
        const keys = Object.keys(this._scenes);
        for (let i = 0, scene: WorldScene; (scene = this._scenes[keys[i]]); i++) {
            this.removeScene(scene);
        }
    }

    update(): void {
        const keys = Object.keys(this._scenes);
        for (let i = 0, scene: WorldScene; (scene = this._scenes[keys[i]]); i++) {
            if (scene.active) {
                scene.update();
            }
        }
    }

    /**
     * Return the key of the given scene
     * @param scene
     */
    private getKey(scene: WorldScene | string): string {
        let key: string = scene as string;
        if (scene instanceof WorldScene) {
            key = scene.name;
        }
        return key;
    }

    addScene(scene: WorldScene): WorldScene {
        this._scenes[scene.name] = scene;
        return scene;
    }

    removeScene(scene: WorldScene | string): WorldScene {
        const key = this.getKey(scene);
        const sceneObj = this._scenes[key];
        sceneObj.tearDown();
        delete this._scenes[key];
        return sceneObj;
    }

    start(scene: WorldScene | string): WorldScene {
        const key = this.getKey(scene);
        this._scenes[key].setUp(this._loader, this._cache);
        return this._scenes[key];
    }

    stop(scene: WorldScene | string): WorldScene {
        const key = this.getKey(scene);
        this._scenes[key].tearDown();
        return this._scenes[key];
    }

    restore(scene: WorldScene | string): WorldScene {
        const key = this.getKey(scene);
        this._scenes[key].restore();
        return this._scenes[key];
    }
}

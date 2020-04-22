import { Canvas } from '../canvas/Canvas';
import { MiddlewareData, ResourceLoader } from '@curbl/loader';
import { CubemapLoader } from '../loader/CubemapLoader';
import { TextureLoader } from '../loader/TextureLoader';
import { GLTFLoader } from '../loader/GLTFLoader';
import { BaseCache, Cache, CACHE_TYPE } from '../cache';
import { GLTexture } from '@curbl/gl-util';
import { Animation, Mesh } from '../scene';
import { Material, MATERIAL_MAPS, Materialmap } from '../material';
import { ECS } from '@curbl/ecs';
import { GLSLLoader } from '../loader/GLSLLoader';
import { KhronosPbrShader } from '../shader/khronosPbrShader';
import { SkyboxShader } from '../shader/SkyboxShader';
import { Scene } from '../scene/scene';
import { SkyboxPass } from '../systems/rendering/SkyboxPass';
import { ForwardShadingSystem } from '../systems/rendering/ForwardShadingSystem';
import { PrePass } from '../systems/rendering/PrePass';
import { GUISystem } from '../systems/gui/GUISystem';
import { LookAtCameraControlSystem } from '../systems/camera/LookAtCameraControlSystem';
import { CameraSystem } from '../systems/camera/CameraSystem';
import { MetallicRoughness } from '../material/metallicRoughness';
import { vec4 } from 'gl-matrix';
import { AnimationSystem } from '../systems/animation/AnimationSystem';
import { WorldSystem } from '../systems/world/worldSystem';

export class Viewer {
    private _cache: Cache;
    private _canvas: Canvas;
    private _loader: ResourceLoader;
    private _gl: WebGL2RenderingContext;
    private _shader: KhronosPbrShader;
    private _skyboxShader: SkyboxShader;
    private _world: WorldSystem;

    constructor(config: { width: number; height: number } = { width: 1280, height: 720 }) {
        this._canvas = new Canvas({ width: config.width, height: config.height });
        this._loader = new ResourceLoader();
        this._cache = new Cache();
    }

    init(onLoaded: () => void) {
        this._canvas.appendCanvas('root');
        const gl = this._canvas.context;
        this._gl = gl;

        //Create cache
        this._cache.addCache(CACHE_TYPE.MATERIAL, new BaseCache<Material>());
        this._cache.addCache(CACHE_TYPE.MESH, new BaseCache<Mesh>());
        this._cache.addCache(CACHE_TYPE.TEXTURE, new BaseCache<GLTexture>());
        this._cache.addCache(CACHE_TYPE.SCENE, new BaseCache<Scene>());
        this._cache.addCache(CACHE_TYPE.ANIMATION, new BaseCache<Animation>());

        //Set loader Middlewares
        this._loader.addMiddleware(new CubemapLoader(gl), CubemapLoader);
        this._loader.addMiddleware(new TextureLoader(gl), TextureLoader);
        this._loader.addMiddleware(new GLTFLoader(gl, this._cache), GLTFLoader);
        this._loader.addMiddleware(new GLSLLoader(gl), GLSLLoader);

        //Cache them all
        this._loader.onLoadComplete.on((data: MiddlewareData<any>) => {
            this._cache.add(data.type as number, data.key, data.data);
        });

        this.defaultMaterial();
        //Create shader
        this._shader = new KhronosPbrShader(this._gl, this._cache);
        this._skyboxShader = new SkyboxShader(this._gl, this._cache);
        //Load shader
        this._loader
            .get(GLSLLoader)
            .add(
                'shader',
                'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/shader/pbr-vert.glsl',
                'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/shader/pbr-frag.glsl',
                this._shader
            );
        this._loader
            .get(GLSLLoader)
            .add(
                'skyboxShader',
                'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/shader/skybox-vert.glsl',
                'https://raw.githubusercontent.com/Xan0C/curbl-gltf-viewer/master/assets/shader/skybox-frag.glsl',
                this._skyboxShader
            );

        this.load(onLoaded);
    }

    private defaultMaterial() {
        const gl = this._gl;
        const texture = GLTexture.fromData(gl, new Uint8Array([128, 128, 128, 255]) as any, 1, 1, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
        texture.enableNearestScaling();
        texture.enableWrapClamp();

        this._cache.getCache(CACHE_TYPE.TEXTURE).add('__default__', texture);

        const mat = new MetallicRoughness();
        mat.baseColorFactor = vec4.fromValues(0.5, 0.5, 0.5, 1);
        const material = new Material<MetallicRoughness>(name, mat);
        material.maps[MATERIAL_MAPS.ALBEDO] = new Materialmap('__default__');

        this._cache.getCache(CACHE_TYPE.MATERIAL).add('__default__', material);
    }

    private createSystems() {
        //Create Systems
        ECS.systemUpdateMethods = ['update', 'render'];
        this._world = ECS.addSystem(new WorldSystem({ loader: this._loader, cache: this._cache }));
        ECS.addSystem(new CameraSystem({ gl: this._gl }));
        ECS.addSystem(new LookAtCameraControlSystem(this._canvas));
        ECS.addSystem(new GUISystem());
        ECS.addSystem(new AnimationSystem(this._cache));
        ECS.addSystem(new PrePass(this._gl));
        ECS.addSystem(new ForwardShadingSystem({ gl: this._gl, cache: this._cache, shader: this._shader }));
        ECS.addSystem(new SkyboxPass({ gl: this._gl, cache: this._cache, shader: this._skyboxShader }));
    }

    private load(onLoaded: () => void) {
        this._loader.load(() => {
            this._shader.upload();
            this._skyboxShader.upload();
            this.createSystems();
            onLoaded();
            this.update(0);
        });
    }

    private update(t: number) {
        ECS.update(t);
        requestAnimationFrame((t) => {
            this.update(t);
        });
    }

    get cache(): Cache {
        return this._cache;
    }

    set cache(value: Cache) {
        this._cache = value;
    }

    get canvas(): Canvas {
        return this._canvas;
    }

    set canvas(value: Canvas) {
        this._canvas = value;
    }

    get loader(): ResourceLoader {
        return this._loader;
    }

    set loader(value: ResourceLoader) {
        this._loader = value;
    }

    get gl(): WebGL2RenderingContext {
        return this._gl;
    }

    set gl(value: WebGL2RenderingContext) {
        this._gl = value;
    }

    get shader(): KhronosPbrShader {
        return this._shader;
    }

    set shader(value: KhronosPbrShader) {
        this._shader = value;
    }

    get skyboxShader(): SkyboxShader {
        return this._skyboxShader;
    }

    set skyboxShader(value: SkyboxShader) {
        this._skyboxShader = value;
    }

    get world(): WorldSystem {
        return this._world;
    }

    set world(value: WorldSystem) {
        this._world = value;
    }
}

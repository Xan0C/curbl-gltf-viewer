import {Canvas} from "../canvas/Canvas";
import {MiddlewareData, ResourceLoader} from "curbl-loader";
import {CubemapLoader} from "../loader/CubemapLoader";
import {TextureLoader} from "../loader/TextureLoader";
import {GLTFLoader} from "../loader/GLTFLoader";
import {BaseCache, Cache, CACHE_TYPE} from "../cache";
import {GLTexture} from "../gl";
import {Animation, Mesh} from "../scene";
import {Material, MATERIAL_MAPS, Materialmap} from "../material";
import {ECS} from "curbl-ecs";
import {GLSLLoader} from "../loader/GLSLLoader";
import {KhronosPbrShader} from "../shader/khronosPbrShader";
import {SkyboxShader} from "../shader/SkyboxShader";
import {Scene} from "../scene/scene";
import {IBLScene} from "./scenes/IBLScene";
import {SkyboxPass} from "../systems/SkyboxPass";
import {ForwardShadingSystem} from "../systems/ForwardShadingSystem";
import {PrePass} from "../systems/PrePass";
import {GUISystem} from "../systems/GUISystem";
import {LookAtCameraControlSystem} from "../systems/LookAtCameraControlSystem";
import {CameraSystem} from "../systems/CameraSystem";
import {ViewerScene} from "./scenes/ViewerScene";
import {AnimationSystem} from "../systems/AnimationSystem";
import {MetallicRoughness} from "../material/metallicRoughness";
import {vec4} from "gl-matrix";
import {BrainStemScene} from "./scenes/BrainStemScene";


export class Viewer {
    private cache:Cache;
    private canvas:Canvas;
    private loader: ResourceLoader;
    private gl: WebGL2RenderingContext;
    private shader: KhronosPbrShader;
    private skyboxShader: SkyboxShader;
    private scenes: Array<ViewerScene>;

    constructor() {
        this.canvas = new Canvas({width:1280, height: 720});
        this.loader = new ResourceLoader();
        this.cache = new Cache();
        this.scenes = [];
    }

    init() {
        this.canvas.appendCanvas("root");
        const gl = this.canvas.context;
        this.gl = gl;

        //Create cache
        this.cache.addCache(CACHE_TYPE.MATERIAL, new BaseCache<Material>());
        this.cache.addCache(CACHE_TYPE.MESH, new BaseCache<Mesh>());
        this.cache.addCache(CACHE_TYPE.TEXTURE, new BaseCache<GLTexture>());
        this.cache.addCache(CACHE_TYPE.SCENE, new BaseCache<Scene>());
        this.cache.addCache(CACHE_TYPE.ANIMATION, new BaseCache<Animation>());

        //Set loader Middlewares
        this.loader.addMiddleware(new CubemapLoader(gl), CubemapLoader);
        this.loader.addMiddleware(new TextureLoader(gl), TextureLoader);
        this.loader.addMiddleware(new GLTFLoader(gl, this.cache), GLTFLoader);
        this.loader.addMiddleware(new GLSLLoader(gl), GLSLLoader);

        //Cache them all
        this.loader.onLoadComplete.on((data:MiddlewareData<any>) => {
            this.cache.add(data.type as number,data.key,data.data);
        });

        this.defaultMaterial();
        //Create shader
        this.shader = new KhronosPbrShader(this.gl, this.cache);
        this.skyboxShader = new SkyboxShader(this.gl, this.cache);
    }

    private defaultMaterial() {
        const gl = this.gl;
        const texture = GLTexture.fromData(gl,new Uint8Array([128, 128, 128, 255]) as any,1,1,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE);
        texture.enableNearestScaling();
        texture.enableWrapClamp();

        this.cache.getCache(CACHE_TYPE.TEXTURE).add('__default__', texture);

        const mat = new MetallicRoughness();
        mat.baseColorFactor = vec4.fromValues(0.5, 0.5, 0.5, 1);
        const material = new Material<MetallicRoughness>(name, mat);
        material.maps[MATERIAL_MAPS.ALBEDO] = new Materialmap('__default__');

        this.cache.getCache(CACHE_TYPE.MATERIAL).add('__default__', material);
    }

    private createSystems() {
        //Create Systems
        ECS.systemUpdateMethods = ['update', 'render'];
        ECS.addSystem(new CameraSystem({gl: this.gl}));
        ECS.addSystem(new LookAtCameraControlSystem({width: 1280, height: 720}));
        ECS.addSystem(new GUISystem());
        ECS.addSystem(new AnimationSystem(this.cache));
        ECS.addSystem(new PrePass(this.gl));
        ECS.addSystem(new SkyboxPass({gl: this.gl, cache: this.cache, shader: this.skyboxShader}));
        ECS.addSystem(new ForwardShadingSystem({gl: this.gl, cache: this.cache, shader: this.shader}));
    }

    private loadShader() {
        this.loader.get(GLSLLoader).add("shader", "../assets/shader/pbr-vert.glsl", "../assets/shader/pbr-frag.glsl", this.shader);
        this.loader.get(GLSLLoader).add("skyboxShader", "../assets/shader/skybox-vert.glsl", "../assets/shader/skybox-frag.glsl", this.skyboxShader);
    }

    loadScene() {
        this.loadShader();
        const iblScene = new IBLScene(this.loader);
        const modelScene = new BrainStemScene(this.loader, this.cache);

        this.scenes.push(iblScene);
        this.scenes.push(modelScene);

        this.preloadScenes();

        this.loader.load(()=>{
            console.log("loaded shader ", this.cache);
            this.shader.initializeDefines(modelScene.getMesh());
            this.shader.upload();
            this.skyboxShader.upload();
            this.createSystems();
            this.createScenes();
            console.log("starting update cycle");
            this.update(0);
        });
    }

    preloadScenes() {
        for(let i=0, scene:ViewerScene; scene = this.scenes[i]; i++) {
            scene.preload();
        }
    }

    createScenes() {
        for(let i=0, scene:ViewerScene; scene = this.scenes[i]; i++) {
            scene.create();
        }
    }

    update(t:number){
        ECS.update(t);
        requestAnimationFrame((t)=>{this.update(t)});
    }

}
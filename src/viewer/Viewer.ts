import {Canvas} from "../canvas/Canvas";
import {MiddlewareData, ResourceLoader} from "curbl-loader";
import {CubemapLoader} from "../loader/CubemapLoader";
import {TextureLoader} from "../loader/TextureLoader";
import {GLTFLoader} from "../loader/GLTFLoader";
import {BaseCache, Cache, CACHE_TYPE} from "../cache";
import {GL_INTERNALFORMAT, GL_TYPES, GLTexture, MAG_FILTER, MIN_FILTER, TEXTURE_WRAP} from "../gl";
import {Model} from "../model";
import {Material} from "../material";
import {CACHED_TEXTURES, TEXTURE_IDS} from "./constants";
import {ECS} from "curbl-ecs";
import {CameraComponent, LookAtCameraComponent, ModelComponent, TransformComponent} from "../components";
import {IBLComponent} from "../components/renderer/IBLComponent";
import {createBlackCubemap, createBlackTexture, createWhiteCubemap, createWhiteTexture} from "./cacheDefaults";
import {IBLSystem} from "../systems/IBLSystem";
import {CameraSystem} from "../systems/CameraSystem";
import {LookAtCameraControlSystem} from "../systems/LookAtCameraControlSystem";
import {PointLightComponent} from "../components/light/pointLightComponent";
import {Shader} from "../model/shader";
import {GLSLLoader} from "../loader/GLSLLoader";
import {KhronosPbrShader} from "../shader/khronosPbrShader";
import {SkyboxComponent} from "../components/renderer/skyboxComponent";
import {SkyboxShader} from "../shader/SkyboxShader";
import {ForwardShadingSystem} from "../systems/ForwardShadingSystem";

export class Viewer {
    private cache:Cache;
    private canvas:Canvas;
    private loader: ResourceLoader;
    private gl: WebGL2RenderingContext;
    private shader: Shader;
    private skyboxShader: Shader;

    constructor() {
        this.canvas = new Canvas({width:1280, height: 720});
        this.loader = new ResourceLoader();
        this.cache = new Cache();
    }

    init() {
        this.canvas.appendCanvas("root");
        const gl = this.canvas.context;
        this.gl = gl;

        //Create cache
        this.cache.addCache(CACHE_TYPE.MATERIAL, new BaseCache<Material>());
        this.cache.addCache(CACHE_TYPE.MODEL, new BaseCache<Model>());
        this.cache.addCache(CACHE_TYPE.TEXTURE, new BaseCache<GLTexture>());

        //Set loader Middlewares
        this.loader.addMiddleware(new CubemapLoader(gl), CubemapLoader);
        this.loader.addMiddleware(new TextureLoader(gl), TextureLoader);
        this.loader.addMiddleware(new GLTFLoader(gl, this.cache), GLTFLoader);
        this.loader.addMiddleware(new GLSLLoader(gl), GLSLLoader);

        //Cache them all
        this.loader.onLoadComplete.on((data:MiddlewareData<any>) => {
            this.cache.add(data.type as number,data.key,data.data);
        });
    }

    private loadIBL() {
        this.loader.get(CubemapLoader).add("skybox",
            [{
                right:'./assets/ibl/environment/environment_right_0.jpg',
                left:'./assets/ibl/environment/environment_left_0.jpg',
                top:'./assets/ibl/environment/environment_top_0.jpg',
                bottom:'./assets/ibl/environment/environment_bottom_0.jpg',
                front:'./assets/ibl/environment/environment_front_0.jpg',
                back:'./assets/ibl/environment/environment_back_0.jpg'
            }]
        );

        this.loader.get(CubemapLoader).add("diffuse_map",
            [{
                right:'./assets/ibl/diffuse/diffuse_right_0.jpg',
                left:'./assets/ibl/diffuse/diffuse_left_0.jpg',
                top:'./assets/ibl/diffuse/diffuse_top_0.jpg',
                bottom:'./assets/ibl/diffuse/diffuse_bottom_0.jpg',
                front:'./assets/ibl/diffuse/diffuse_front_0.jpg',
                back:'./assets/ibl/diffuse/diffuse_back_0.jpg'
            }],
            {
                id:TEXTURE_IDS.DIFFUSE_ENVIRONMENT,
                premultiplyAlpha: false,
                internalFormat: GL_INTERNALFORMAT.SRGB8_ALPHA8,
                format: GL_INTERNALFORMAT.RGBA,
                type:GL_TYPES.UNSIGNED_BYTE
            }
        );

        let specular_map = [];
        for(let i=0; i < 10; i++){
            specular_map.push({
                right:'./assets/ibl/specular/specular_right_'+i+'.jpg',
                left:'./assets/ibl/specular/specular_left_'+i+'.jpg',
                top:'./assets/ibl/specular/specular_top_'+i+'.jpg',
                bottom:'./assets/ibl/specular/specular_bottom_'+i+'.jpg',
                front:'./assets/ibl/specular/specular_front_'+i+'.jpg',
                back:'./assets/ibl/specular/specular_back_'+i+'.jpg'
            });
        }

        this.loader.get(CubemapLoader).add("specular_map", specular_map, {
            id:TEXTURE_IDS.SPECULAR_ENVIRONMENT,
            premultiplyAlpha: false,
            internalFormat: GL_INTERNALFORMAT.SRGB8_ALPHA8,
            format: GL_INTERNALFORMAT.RGBA,
            type:GL_TYPES.UNSIGNED_BYTE
        });

        this.loader.get(TextureLoader).add("brdfLUT", "./assets/ibl/brdfLUT.png", {
            id:TEXTURE_IDS.BRDF_LUT,
            premultiplyAlpha: false,
            internalFormat: GL_INTERNALFORMAT.SRGB8_ALPHA8,
            format: GL_INTERNALFORMAT.RGBA,
            type:GL_TYPES.UNSIGNED_BYTE,
            sampler: {
                magFilter:MAG_FILTER.LINEAR,
                minFilter:MIN_FILTER.LINEAR,
                wrapS:TEXTURE_WRAP.CLAMP_TO_EDGE,
                wrapT:TEXTURE_WRAP.CLAMP_TO_EDGE
            }
        });
    }

    private loadModel() {
        this.loader.get(GLTFLoader).add("bottle", "../assets/bottle/WaterBottle.gltf", "../assets/bottle/WaterBottle.bin");
    }

    private loadShader() {
        this.shader = new KhronosPbrShader(this.gl, this.cache);
        this.skyboxShader = new SkyboxShader(this.gl, this.cache);
        this.loader.get(GLSLLoader).add("shader", "../assets/shader/pbr-vert.glsl", "../assets/shader/pbr-frag.glsl", this.shader);
        this.loader.get(GLSLLoader).add("skyboxShader", "../assets/shader/skybox-vert.glsl", "../assets/shader/skybox-frag.glsl", this.skyboxShader);
    }

    loadScene() {
        this.loadIBL();
        this.loadModel();
        this.loadShader();

        this.loader.load(()=>{
            console.log("finished loading ",this.cache);
            this.onLoadFinished();
        });
    }

    private createModellEntity() {
        const entity = ECS.createEntity();
        entity.add(new ModelComponent({key: "bottle"}));
        entity.add(new TransformComponent({
            position: {x:0, y:0, z:0},
            rotation: {x:0, y:0, z:0, w:1},
            scale: {x:5, y:5, z:5}
        }));
        ECS.addEntity(entity);
    }

    private createEnvironmentEntity() {
        const entity = ECS.createEntity();
        entity.add(new IBLComponent({
            diffuseEnvironment: "diffuse_map",
            specularEnvironment: "specular_map",
            brdfLUT: "brdfLUT"
        }));
        entity.add(new SkyboxComponent({texture: "skybox"}));
        ECS.addEntity(entity);
    }

    private createCameraEntity() {
        const entity = ECS.createEntity();
        entity.add(new CameraComponent());
        entity.add(new TransformComponent({
            position: {x:0,y:0,z:-1.00},
            rotation: {x:0,y:0,z:0,w:1},
            scale: {x:1,y:1,z:1}
        }));
        entity.add(new LookAtCameraComponent({
            aspect: (1920/1080),
            fov: 45,
            near: 0.01,
            far: 100.0
        }));
        ECS.addEntity(entity);
    }

    private createLightEntity() {
        const entity = ECS.createEntity();
        entity.add(new PointLightComponent({
            color:{r:1,g:1,b:1}
        }));
        entity.add(new TransformComponent({
            position:{x:0, y: 3, z: 15},
            rotation:{x:0, y:2, z: 1, w:1},
            scale:{x:1, y:1, z: 1}
        }));
        ECS.addEntity(entity);
    }

    private createCacheEntries() {
        this.cache.add(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.BLACK, createBlackTexture(this.gl));
        this.cache.add(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.WHITE, createWhiteTexture(this.gl));
        this.cache.add(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.BLACK_CUBE, createBlackCubemap(this.gl));
        this.cache.add(CACHE_TYPE.TEXTURE, CACHED_TEXTURES.WHITE_CUBE, createWhiteCubemap(this.gl));
    }

    private createSystems() {
        //Create Systems
        ECS.systemUpdateMethods = ['update', 'render'];
        ECS.addSystem(new CameraSystem({gl: this.gl}));
        ECS.addSystem(new LookAtCameraControlSystem({width: 1280, height: 720}));
        ECS.addSystem(new IBLSystem({cache: this.cache}));
        //ECS.addSystem(new SkyboxPass({gl: this.gl, cache: this.cache, shader: this.skyboxShader}));
        ECS.addSystem(new ForwardShadingSystem({gl: this.gl, cache: this.cache, shader: this.shader}));
    }

    private onLoadFinished() {
        this.createCacheEntries();
        this.createCameraEntity();
        this.createEnvironmentEntity();
        this.createLightEntity();
        this.createModellEntity();
        this.createSystems();

        console.log("ECS ",ECS["instance"]);
        this.update();
    }

    update(){
        ECS.update();
        requestAnimationFrame(()=>{this.update()});
    }

}
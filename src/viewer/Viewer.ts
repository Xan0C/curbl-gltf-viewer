import {Canvas} from "../canvas/Canvas";
import {MiddlewareData, ResourceLoader} from "curbl-loader";
import {CubemapLoader} from "../loader/CubemapLoader";
import {TextureLoader} from "../loader/TextureLoader";
import {GLTFLoader} from "../loader/GLTFLoader";
import {BaseCache, Cache, CACHE_TYPE} from "../cache";
import {GL_INTERNALFORMAT, GL_TYPES, GLTexture, MAG_FILTER, MIN_FILTER, TEXTURE_WRAP} from "../gl";
import {Model} from "../model";
import {Material} from "../material";
import {GLOBAL_TEXTURES} from "./constants";
import {ECS} from "curbl-ecs";
import {
    CameraComponent,
    LightComponent,
    LookAtCameraComponent,
    ModelComponent,
    TransformComponent
} from "../components";
import {CameraSystem} from "../systems/CameraSystem";
import {GLSLLoader} from "../loader/GLSLLoader";
import {KhronosPbrShader} from "../shader/khronosPbrShader";
import {SkyboxShader} from "../shader/SkyboxShader";
import {ForwardShadingSystem} from "../systems/ForwardShadingSystem";
import {GUIComponent} from "../components/gui/GUIComponent";
import {GUISystem} from "../systems/GUISystem";
import {SkyboxPass} from "../systems/SkyboxPass";
import {PrePass} from "../systems/PrePass";
import {LookAtCameraControlSystem} from "../systems/LookAtCameraControlSystem";

export class Viewer {
    private cache:Cache;
    private canvas:Canvas;
    private loader: ResourceLoader;
    private gl: WebGL2RenderingContext;
    private shader: KhronosPbrShader;
    private skyboxShader: SkyboxShader;

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
        this.loader.get(CubemapLoader).add(GLOBAL_TEXTURES.SKYBOX,
            [{
                right:'./assets/ibl/environment/environment_right_0.jpg',
                left:'./assets/ibl/environment/environment_left_0.jpg',
                top:'./assets/ibl/environment/environment_top_0.jpg',
                bottom:'./assets/ibl/environment/environment_bottom_0.jpg',
                front:'./assets/ibl/environment/environment_front_0.jpg',
                back:'./assets/ibl/environment/environment_back_0.jpg'
            }]
        );

        this.loader.get(CubemapLoader).add(GLOBAL_TEXTURES.DIFFUSE_ENVIRONMENT,
            [{
                right:'./assets/ibl/diffuse/diffuse_right_0.jpg',
                left:'./assets/ibl/diffuse/diffuse_left_0.jpg',
                top:'./assets/ibl/diffuse/diffuse_top_0.jpg',
                bottom:'./assets/ibl/diffuse/diffuse_bottom_0.jpg',
                front:'./assets/ibl/diffuse/diffuse_front_0.jpg',
                back:'./assets/ibl/diffuse/diffuse_back_0.jpg'
            }],
            {
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

        this.loader.get(CubemapLoader).add(GLOBAL_TEXTURES.SPECULAR_ENVIRONMENT, specular_map, {
            premultiplyAlpha: false,
            internalFormat: GL_INTERNALFORMAT.SRGB8_ALPHA8,
            format: GL_INTERNALFORMAT.RGBA,
            type:GL_TYPES.UNSIGNED_BYTE
        });

        this.loader.get(TextureLoader).add(GLOBAL_TEXTURES.BRDF_LUT, "./assets/ibl/brdfLUT.png", {
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
        this.loader.get(GLTFLoader).add(
            "bottle",
            "../assets/bottle/WaterBottle.gltf",
            "../assets/bottle/WaterBottle.bin"
        );
    }

    private loadShader() {
        this.shader = new KhronosPbrShader(this.gl, this.cache);
        this.skyboxShader = new SkyboxShader(this.gl, this.cache);

        this.shader.initializeDefines(this.cache.get<Model>(CACHE_TYPE.MODEL, "bottle"));

        this.loader.get(GLSLLoader).add("shader", "../assets/shader/pbr-vert.glsl", "../assets/shader/pbr-frag.glsl", this.shader);
        this.loader.get(GLSLLoader).add("skyboxShader", "../assets/shader/skybox-vert.glsl", "../assets/shader/skybox-frag.glsl", this.skyboxShader);
    }

    loadScene() {
        this.loadIBL();
        this.loadModel();

        this.loader.load(()=>{
            console.log("finished loading model and ibl",this.cache);
            this.loadShader();
            this.loader.load(()=>{
                console.log("finished loading shader");
                this.onLoadFinished();
            })
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

    private createCameraEntity() {
        const entity = ECS.createEntity();
        entity.add(new CameraComponent());
        entity.add(new TransformComponent({
            position: {x:0,y:0,z:-12.00},
            rotation: {x:0,y:0,z:0,w:1},
            scale: {x:1,y:1,z:1}
        }));
        entity.add(new LookAtCameraComponent({
            aspect: (1920/1080),
            fov: 45.0 * Math.PI / 180.0,
            near: 0.01,
            far: 100.0
        }));
        ECS.addEntity(entity);
    }

    private createLightEntity() {
        const entity = ECS.createEntity();
        const lightComponent = new LightComponent({
            lightColor: [255, 255, 255],
            lightScale: 1.0,
            lightRotation: 75,
            lightPitch: 40
        });
        entity.add(lightComponent);
        entity.add(new GUIComponent({
            folder: "Directional Light",
            properties: [
                {
                    prop: lightComponent,
                    propName: "lightColor",
                    isColor: true,
                    onChange: ()=>lightComponent.updateLight()
                },
                {
                    prop: lightComponent,
                    propName: "lightScale",
                    min: 0,
                    max: 10,
                    onChange: ()=>lightComponent.updateLight()
                },
                {
                    prop: lightComponent,
                    propName: "lightRotation",
                    min: 0,
                    max: 360,
                    onChange: ()=>lightComponent.updateLight()
                },
                {
                    prop: lightComponent,
                    propName: "lightPitch",
                    min: -90,
                    max: 90,
                    onChange: ()=>lightComponent.updateLight()
                }
            ]
        }));
        ECS.addEntity(entity);
    }

    private createSystems() {
        //Create Systems
        ECS.systemUpdateMethods = ['update', 'render'];
        ECS.addSystem(new CameraSystem({gl: this.gl}));
        ECS.addSystem(new LookAtCameraControlSystem({width: 1280, height: 720}));
        ECS.addSystem(new GUISystem());
        ECS.addSystem(new PrePass(this.gl));
        ECS.addSystem(new SkyboxPass({gl: this.gl, cache: this.cache, shader: this.skyboxShader}));
        ECS.addSystem(new ForwardShadingSystem({gl: this.gl, cache: this.cache, shader: this.shader}));
    }

    private onLoadFinished() {
        this.createCameraEntity();
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
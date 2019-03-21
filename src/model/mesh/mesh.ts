import {Attributes, GL_PRIMITIVES} from "../../gl";
import {Material, MATERIAL_MAPS} from "../../material";
import {Cache, CACHE_TYPE} from "../../cache";
import {Shader} from "../../shader/shader";
import {Transform} from "../transform";
import {Skin} from "../skin";
import {Primitive} from "./primitive";
import GLAttribute = Attributes.GLAttribute;

type RenderList = {
    material: Material;
    primitives: Array<Primitive>;
}

export class Mesh {
    private _primitives: Array<Primitive>;
    private _name:string;
    private _transform: Transform;
    private _skin?: Skin;

    private _renderList: Array<RenderList>;

    constructor(){
        this._primitives = [];
        this._renderList = [];
    }

    init(cache: Cache) {
        const materials = new Set(this._primitives.map(p => p.material));

        for(let materialName of materials) {
            this._renderList.push({
                material: cache.get(CACHE_TYPE.MATERIAL, materialName),
                primitives: this._primitives.filter(p => p.material === materialName)
            });
        }

        this._renderList.sort((a,b) => {
            return a.material.transparent ? 1 : -1;
        });
    }

    draw(shader: Shader):void {
        shader.applyMesh(this);
        for(let i=0, render: RenderList; render = this._renderList[i]; i++) {
            shader.applyMaterial(render.material);
            for(let k=0, primitive: Primitive; primitive = render.primitives[k]; k++) {
                primitive.draw();
            }
        }
    }

    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key:GL_PRIMITIVES, glAttribute:GLAttribute):void {
        for(let i=0, primitive: Primitive; primitive = this._primitives[i]; i++) {
            primitive.addAttribute(key, glAttribute);
        }
    }

    /**
     * check if any primitive in this mesh has the attribute
     * @param key - key of the attribute e.g. TANGENT,NORMAL, etc.
     */
    hasAttribute(key:GL_PRIMITIVES|string):boolean {
        for(let i=0, primitive: Primitive; primitive = this._primitives[i]; i++) {
            if(primitive.hasAttribute(key)) {
                return true;
            }
        }
        return false;
    }

    /**
     * check if any material used by a primitve has the map with the specified key
     * @param cache - cache to get the material from
     * @param key - key of the map e.g ALBEDO, METALIC_ROUGHNESS etc.
     */
    hasMap(cache:Cache,key:MATERIAL_MAPS): boolean {
        for(let i=0, primitive: Primitive; primitive = this._primitives[i]; i++) {
            const material = cache.get<Material>(CACHE_TYPE.MATERIAL, primitive.material);
            if(material && material.hasMap(key)) {
                return true;
            }
        }
        return false;
    }

    get primitives(): Array<Primitive> {
        return this._primitives;
    }

    set primitives(value: Array<Primitive>) {
        this._primitives = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get transform(): Transform {
        return this._transform;
    }

    set transform(value: Transform) {
        this._transform = value;
    }

    get skin(): Skin {
        return this._skin;
    }

    set skin(value: Skin) {
        this._skin = value;
    }
}
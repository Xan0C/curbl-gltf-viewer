import {GLTFModel} from "./GLTFModel";
import {IGLTF_Node} from "./model";
import {Mesh, Skin, Transform} from "../model";
import {mat4, quat, vec3} from "gl-matrix";

export class GLTFNode {
    children: Array<GLTFNode> = [];
    transform: Transform = new Transform();
    mesh?:Mesh;
    skin?:Skin;
    name:string;
}

export class GLTFNodeProcessor {
    private model: GLTFModel;
    private nodes:Array<GLTFNode>;

    constructor(model: GLTFModel) {
        this.model = model;
        this.nodes = [];
    }

    processNode(idx:number): GLTFNode {
        if(this.nodes[idx]) {
            return this.nodes[idx];
        }

        return this.parseNode(idx, this.nodes);
    }
    /**
     * Parse a single node and all its children
     * a node can have multiple properties e.g. mesh,transform,weights,camera,skin etc.
     * @param {number} nodeIdx
     * @param nodes
     * @param parent
     */
    private parseNode(nodeIdx:number, nodes:Array<GLTFNode>, parent?: GLTFNode): GLTFNode {
        const gltf = this.model.gltf;
        const node = gltf.nodes[nodeIdx];

        if(nodes[nodeIdx]) {
            return nodes[nodeIdx];
        }

        const sceneNode = new GLTFNode();
        sceneNode.name = node.name||"node"+nodeIdx;
        nodes[nodeIdx] = sceneNode;

        sceneNode.transform = this.parseTransform(node, parent);

        if(node.mesh !== null && node.mesh !== undefined) {
            sceneNode.mesh = this.model.getMesh(node.mesh);
            sceneNode.mesh.transform = sceneNode.transform;
        }

        if(node.skin !== null && node.skin !== undefined) {
            sceneNode.skin = this.model.getSkin(node.skin);
            if(sceneNode.mesh) {
                sceneNode.mesh.skin = sceneNode.skin;
            }else {
                console.warn("expected skin and mesh to be on the same node");
            }
        }

        node.children = node.children||[];
        for(let i=0,child:number; child = node.children[i];i++){
            const childNode = this.parseNode(child, nodes, sceneNode);
            sceneNode.children.push(childNode);
        }

        return sceneNode;
    }

    /**
     * Parse the Transformation of a node and add it as a child to the list of transform nodes
     * @param {IGLTF_Node} node
     * @param {Transform} parent - parent of the new node
     * @returns {Transform} newly create Transform node
     */
    private parseTransform(node:IGLTF_Node, parent?:GLTFNode): Transform {
        const transform:Transform = new Transform();
        if(node.matrix !== undefined && node.matrix !== null) {
            transform.localMatrix = mat4.clone(node.matrix as any);
            mat4.getTranslation(transform.translation, transform.localMatrix);
            mat4.getRotation(transform.rotation, transform.localMatrix);
            mat4.getScaling(transform.scale, transform.localMatrix);
        }
        if(node.translation !== undefined && node.translation !== null){
            transform.translation = vec3.clone(node.translation);
        }
        if(node.rotation !== undefined && node.rotation !== null){
            transform.rotation = quat.clone(node.rotation as any);
        }
        if(node.scale !== undefined && node.scale !== null){
            transform.scale = vec3.clone(node.scale);
        }
        if(parent){
            parent.transform.addChild(transform);
        }
        return transform;
    }

    get transforms(): Array<Transform> {
        const transforms = [];
        for(let i=0, node: GLTFNode; node = this.nodes[i]; i++) {
            transforms.push(node.transform);
        }
        return transforms;
    }
}
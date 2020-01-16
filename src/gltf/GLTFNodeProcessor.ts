import { GLTFModel } from './GLTFModel';
import { IGLTF_Node } from './model';
import { SceneNode, Transform } from '../scene';
import { mat4, quat, vec3 } from 'gl-matrix';

export class GLTFNodeProcessor {
    private model: GLTFModel;
    private nodes: Array<SceneNode>;

    constructor(model: GLTFModel) {
        this.model = model;
        this.nodes = [];
    }

    processNode(idx: number): SceneNode {
        if (this.nodes[idx]) {
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
    private parseNode(nodeIdx: number, nodes: Array<SceneNode>, parent?: SceneNode): SceneNode {
        const gltf = this.model.gltf;
        const node = gltf.nodes[nodeIdx];

        if (nodes[nodeIdx]) {
            return nodes[nodeIdx];
        }

        const sceneNode = new SceneNode();
        sceneNode.name = node.name || 'node' + nodeIdx;
        nodes[nodeIdx] = sceneNode;

        sceneNode.transform = this.parseTransform(node, parent);

        if (node.mesh !== null && node.mesh !== undefined) {
            sceneNode.mesh = this.model.getMesh(node.mesh);
        }

        if (node.skin !== null && node.skin !== undefined) {
            sceneNode.skin = this.model.getSkin(node.skin);
        }

        node.children = node.children || [];
        for (let i = 0, child: number; (child = node.children[i]); i++) {
            const childNode = this.parseNode(child, nodes, sceneNode);
            sceneNode.addChild(childNode);
        }

        return sceneNode;
    }

    /**
     * Parse the Transformation of a node and add it as a child to the list of transform nodes
     * @param {IGLTF_Node} node
     * @param {Transform} parent - parent of the new node
     * @returns {Transform} newly create Transform node
     */
    private parseTransform(node: IGLTF_Node, parent?: SceneNode): Transform {
        const transform: Transform = new Transform();
        if (node.matrix !== undefined && node.matrix !== null) {
            transform.localMatrix = mat4.clone(node.matrix as any);
            mat4.getTranslation(transform.translation, transform.localMatrix);
            mat4.getRotation(transform.rotation, transform.localMatrix);
            mat4.getScaling(transform.scale, transform.localMatrix);
        }
        if (node.translation !== undefined && node.translation !== null) {
            transform.translation = vec3.clone(node.translation);
        }
        if (node.rotation !== undefined && node.rotation !== null) {
            transform.rotation = quat.clone(node.rotation as any);
        }
        if (node.scale !== undefined && node.scale !== null) {
            transform.scale = vec3.clone(node.scale);
        }
        if (parent) {
            parent.transform.addChild(transform);
        }
        return transform;
    }
}

import {SceneNode} from "../sceneNode";

export class AnimationChannel {
    sampler: number;
    node: SceneNode;
    path:"translation"|"rotation"|"scale"|"weights";
}
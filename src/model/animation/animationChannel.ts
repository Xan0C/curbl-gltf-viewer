import {Transform} from "../transform";

export class AnimationChannel {
    sampler: number;
    transform: Transform;
    path:"translation"|"rotation"|"scale"|"weights";
}
import {mat4, vec3} from "gl-matrix";

export interface BoundingVolume<T = {max:vec3, min:vec3}> {
    transform: mat4;
    center: vec3;

    update(volume:T): void;
}
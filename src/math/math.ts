import {mat4, vec3, vec4} from "gl-matrix";

export module Math3d {

    export function getWorldCornersFromMatrix(mat: mat4): Array<vec3> {
        const inverse = mat4.invert(mat4.create(), mat);
        const corners = [];

        for(let x=0; x < 2; x++) {
            for(let y=0; y < 2; y++) {
                for(let z=0; z < 2; z++) {
                    const clipSpacePos = vec4.fromValues(
                        x*2.0-1.0,
                        y*2.0-1.0,
                        z*2.0-1.0,
                        1.0
                    );
                    vec4.transformMat4(clipSpacePos, clipSpacePos, inverse);
                    corners.push(vec3.fromValues(
                        clipSpacePos[0] / clipSpacePos[3],
                        clipSpacePos[1] / clipSpacePos[3],
                        clipSpacePos[2] / clipSpacePos[3]
                    ));
                }
            }
        }

        return corners;
    }

    /**
     * Return a vector point on a position of a sphere
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {Vector}
     */
    export function getVSpherePos(x:number,y:number,width:number,height:number):vec3 {
        const out:vec3 = vec3.fromValues(1.0*x/width*2.0-1.0, -(1.0*y/height*2.0-1.0) , 0);
        vec3.squaredLength(out);
        let sqrLen = vec3.squaredLength(out);
        if(sqrLen <= 1.0){
            vec3.add(out, out, [0,0,  Math.sqrt(1-sqrLen)]);
        }else{
            vec3.normalize(out, out);
        }
        return out;
    }

    /**
     * Rotate vector v around axis n with angle a
     * @param {Vector} v - vector to rotate
     * @param {Vector} n - axis to rotate around
     * @param {number} a - rotation angle
     * @returns {Vector}
     */
    export function rotateAxisAngle(v:vec3,n:vec3,a:number):vec3{
        let co = Math.cos(a);
        let si = Math.sin(a);

        let o:vec3 = vec3.create();
        let mx = vec3.fromValues(n[0]*n[0]*(1.0-co)+co, n[0]*n[1]*(1.0-co)-n[2]*si, n[0]*n[2]*(1.0-co)+n[1]*si);
        let my = vec3.fromValues(n[0]*n[1]*(1.0-co)+n[2]*si, n[1]*n[1]*(1.0-co)+co, n[1]*n[2]*(1.0-co)-n[0]*si);
        let mz = vec3.fromValues(n[0]*n[2]*(1.0-co)-n[1]*si, n[2]*n[1]*(1.0-co)+n[0]*si, n[2]*n[2]*(1.0-co)+co);
        o[0] = vec3.dot(mx, v);
        o[1] = vec3.dot(my, v);
        o[2] = vec3.dot(mz, v);
        return o;
    }

    /**
     * transform degree to radians
     * @param {number} deg
     * @returns {number}
     */
    export function radians(deg:number):number{
        return deg * Math.PI / 180;
    }

    /**
     * ModelTransform radians to degrees
     * @param {number} rad
     * @returns {number}
     */
    export function degrees(rad:number):number{
        return rad * 180 / Math.PI;
    }
}

export module Math2d {
    export function lerp(a:number,b:number,f:number):number{
        return a+f*(b-a);
    }
}